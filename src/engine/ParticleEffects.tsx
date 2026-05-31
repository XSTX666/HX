import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleFieldProps {
  count?: number
  size?: number
  color?: string
  speed?: number
  area?: number
}

// 稳定的随机数生成
function stableRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453
  return x - Math.floor(x)
}

// 背景粒子场
export function ParticleField({ 
  count = 200, 
  size = 0.02, 
  color = '#4facfe', 
  speed = 0.5,
  area = 20 
}: ParticleFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  // 生成粒子位置和速度
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: (stableRandom(i * 3) - 0.5) * area,
      y: (stableRandom(i * 3 + 1) - 0.5) * area,
      z: (stableRandom(i * 3 + 2) - 0.5) * area,
      vx: (stableRandom(i * 3 + 3) - 0.5) * speed * 0.01,
      vy: (stableRandom(i * 3 + 4) - 0.5) * speed * 0.01,
      vz: (stableRandom(i * 3 + 5) - 0.5) * speed * 0.01,
      phase: stableRandom(i * 3 + 6) * Math.PI * 2,
    }))
  }, [count, area, speed])

  useFrame(() => {
    if (!meshRef.current) return

    const time = Date.now() * 0.001
    for (let i = 0; i < count; i++) {
      const p = particles[i]
      dummy.position.set(
        p.x + Math.sin(time * 0.3 + p.phase) * 0.5,
        p.y + Math.cos(time * 0.2 + p.phase) * 0.5,
        p.z + Math.sin(time * 0.4 + p.phase) * 0.5
      )
      dummy.scale.setScalar(size * (0.8 + Math.sin(time + p.phase) * 0.2))
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  )
}

// 反应轨迹粒子
interface TrailParticlesProps {
  positions: THREE.Vector3[]
  color?: string
  size?: number
}

export function TrailParticles({ positions, color = '#4facfe', size = 0.03 }: TrailParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  const count = positions.length

  useFrame(() => {
    if (!meshRef.current || count === 0) return

    for (let i = 0; i < count; i++) {
      const pos = positions[i]
      dummy.position.copy(pos)
      dummy.scale.setScalar(size * (1 - i / count))
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  if (count === 0) return null

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  )
}

// 键断裂效果（改进版）
interface BondBreakEffectProps {
  position: [number, number, number]
  color?: string
  active?: boolean
  intensity?: number
}

export function BondBreakEffect({ 
  position, 
  color = '#ff6b4a', 
  active = false,
  intensity = 1 
}: BondBreakEffectProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const count = 16

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      vx: (stableRandom(i * 3) - 0.5) * 0.15,
      vy: (stableRandom(i * 3 + 1) - 0.5) * 0.15,
      vz: (stableRandom(i * 3 + 2) - 0.5) * 0.15,
      phase: stableRandom(i * 3 + 3) * Math.PI * 2,
      speed: 0.5 + stableRandom(i * 3 + 4) * 0.5,
    }))
  }, [count])

  useFrame(() => {
    if (!meshRef.current || !active) return

    const time = Date.now() * 0.001
    for (let i = 0; i < count; i++) {
      const p = particles[i]
      const t = (time * p.speed + p.phase) % (Math.PI * 2)
      const radius = 0.3 + Math.sin(t * 2) * 0.2
      
      dummy.position.set(
        position[0] + p.vx * Math.sin(t) * radius * intensity,
        position[1] + p.vy * Math.cos(t) * radius * intensity,
        position[2] + p.vz * Math.sin(t * 0.7) * radius * intensity
      )
      
      const scale = 0.02 * (0.5 + Math.sin(t * 3) * 0.5) * intensity
      dummy.scale.setScalar(scale)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  if (!active) return null

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  )
}
