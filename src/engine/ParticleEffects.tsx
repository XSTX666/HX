import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// 稳定的随机数生成
function stableRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453
  return x - Math.floor(x)
}

// 背景粒子场
interface ParticleFieldProps {
  count?: number
  size?: number
  color?: string
  area?: number
}

export function ParticleField({ 
  count = 200, 
  size = 0.02, 
  color = '#4facfe', 
  area = 20 
}: ParticleFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: (stableRandom(i * 3) - 0.5) * area,
      y: (stableRandom(i * 3 + 1) - 0.5) * area,
      z: (stableRandom(i * 3 + 2) - 0.5) * area,
      phase: stableRandom(i * 3 + 3) * Math.PI * 2,
    }))
  }, [count, area])

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

// 原子移动轨迹
interface AtomTrailProps {
  positions: [number, number, number][]
  color?: string
  width?: number
}

export function AtomTrail({ 
  positions, 
  color = '#4facfe', 
  width = 0.02
}: AtomTrailProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const count = positions.length

  useFrame(() => {
    if (!meshRef.current || count === 0) return

    for (let i = 0; i < count; i++) {
      const pos = positions[i]
      
      dummy.position.set(pos[0], pos[1], pos[2])
      dummy.scale.setScalar(width * (1 - i / count * 0.5))
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

// 发光效果
interface GlowEffectProps {
  position: [number, number, number]
  color?: string
  size?: number
  intensity?: number
  active?: boolean
}

export function GlowEffect({ 
  position, 
  color = '#4facfe', 
  size = 0.5, 
  intensity = 0.5,
  active = true 
}: GlowEffectProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame(() => {
    if (!meshRef.current || !active) return
    
    const time = Date.now() * 0.001
    const scale = size * (0.8 + Math.sin(time * 2) * 0.2)
    meshRef.current.scale.setScalar(scale)
    
    if (meshRef.current.material instanceof THREE.MeshBasicMaterial) {
      meshRef.current.material.opacity = intensity * (0.5 + Math.sin(time * 3) * 0.5)
    }
  })

  if (!active) return null

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={intensity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}
