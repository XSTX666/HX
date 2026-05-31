import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleEffectProps {
  position: [number, number, number]
  color?: string
  count?: number
  size?: number
  speed?: number
  active?: boolean
}

// 生成稳定的随机数
function stableRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453
  return x - Math.floor(x)
}

export default function ParticleEffect({
  position,
  color = '#4facfe',
  count = 20,
  size = 0.05,
  speed = 1,
  active = true,
}: ParticleEffectProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  // 使用稳定的随机数生成速度
  const velocities = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: (stableRandom(i * 3) - 0.5) * speed * 0.1,
      y: (stableRandom(i * 3 + 1) - 0.5) * speed * 0.1,
      z: (stableRandom(i * 3 + 2) - 0.5) * speed * 0.1,
    }))
  }, [count, speed])

  useFrame(() => {
    if (!meshRef.current || !active) return

    const time = Date.now() * 0.001
    for (let i = 0; i < count; i++) {
      const vel = velocities[i]
      dummy.position.set(
        position[0] + vel.x * Math.sin(time + i),
        position[1] + vel.y * Math.cos(time + i),
        position[2] + vel.z * Math.sin(time + i * 0.5)
      )
      dummy.scale.setScalar(size * (0.5 + stableRandom(i) * 0.5))
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  )
}

// 反应轨迹效果
interface TrailEffectProps {
  positions: [number, number, number][]
  color?: string
}

export function TrailEffect({ positions, color = '#4facfe' }: TrailEffectProps) {
  if (positions.length < 2) return null

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={new Float32Array(positions.flat())}
          count={positions.length}
          itemSize={3}
          args={[new Float32Array(positions.flat()), 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.6} />
    </line>
  )
}

// 发光效果
interface GlowEffectProps {
  position: [number, number, number]
  color?: string
  size?: number
  intensity?: number
}

export function GlowEffect({ position, color = '#4facfe', size = 0.5, intensity = 0.5 }: GlowEffectProps) {
  return (
    <pointLight
      position={position}
      color={color}
      intensity={intensity}
      distance={size * 10}
      decay={2}
    />
  )
}

// 键断裂效果
interface BondBreakEffectProps {
  position: [number, number, number]
  color?: string
  active?: boolean
}

export function BondBreakEffect({ position, color = '#ff6b4a', active = false }: BondBreakEffectProps) {
  if (!active) return null

  return (
    <group position={position}>
      <ParticleEffect
        position={[0, 0, 0]}
        color={color}
        count={15}
        size={0.03}
        speed={2}
        active={active}
      />
      <GlowEffect
        position={[0, 0, 0]}
        color={color}
        size={0.3}
        intensity={0.8}
      />
    </group>
  )
}
