import { useRef, useEffect, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useAppStore } from '../store/appStore'
import { ALL_REACTIONS } from '../data/reactions'
import ParticleEffect, { BondBreakEffect } from '../engine/ParticleEffects'
import { checkWebGPUSupport } from '../engine/WebGPUDetector'

// 原子颜色和半径
const ATOM_COLORS: Record<string, string> = {
  C: '#555555', H: '#f0f0f0', O: '#e83030', N: '#3050F8',
  Cl: '#1FF01F', Br: '#8B1A1A', S: '#FFFF30', Fe: '#E06633',
}

const ATOM_RADII: Record<string, number> = {
  C: 0.30, H: 0.15, O: 0.28, N: 0.27, Cl: 0.35, Br: 0.38, S: 0.32, Fe: 0.35,
}

// 缓存几何体和材质
const geometryCache = new Map<string, THREE.SphereGeometry>()
const materialCache = new Map<string, THREE.MeshStandardMaterial>()

function getCachedSphereGeometry(radius: number): THREE.SphereGeometry {
  const key = radius.toFixed(2)
  if (!geometryCache.has(key)) {
    geometryCache.set(key, new THREE.SphereGeometry(radius, 32, 16))
  }
  return geometryCache.get(key)!
}

function getCachedMaterial(color: string, opacity: number = 1): THREE.MeshStandardMaterial {
  const key = `${color}_${opacity}`
  if (!materialCache.has(key)) {
    materialCache.set(key, new THREE.MeshStandardMaterial({
      color,
      roughness: 0.28,
      metalness: 0.05,
      transparent: opacity < 1,
      opacity,
    }))
  }
  return materialCache.get(key)!
}

// 原子组件（带动画）
function Atom({ position, element, opacity = 1, scale = 1 }: { 
  position: [number, number, number], 
  element: string,
  opacity?: number,
  scale?: number
}) {
  const radius = ATOM_RADII[element] || 0.3
  const color = ATOM_COLORS[element] || '#888888'
  const geometry = useMemo(() => getCachedSphereGeometry(radius), [radius])
  const material = useMemo(() => getCachedMaterial(color, opacity), [color, opacity])
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.lerp(new THREE.Vector3(...position), 0.1)
      if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
        meshRef.current.material.opacity += (opacity - meshRef.current.material.opacity) * 0.1
      }
    }
  })

  return (
    <mesh 
      ref={meshRef}
      position={position} 
      geometry={geometry} 
      material={material} 
      castShadow
      scale={scale}
    />
  )
}

// 化学键组件（带动画）
function Bond({ start, end, type = 'single', opacity = 1 }: {
  start: [number, number, number]
  end: [number, number, number]
  type?: 'single' | 'double' | 'triple'
  opacity?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const { targetPosition, targetQuaternion, targetLength } = useMemo(() => {
    const startVec = new THREE.Vector3(...start)
    const endVec = new THREE.Vector3(...end)
    const direction = new THREE.Vector3().subVectors(endVec, startVec)
    const len = direction.length()
    const center = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5)
    const quat = new THREE.Quaternion()
    quat.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize())
    return { targetPosition: center, targetQuaternion: quat, targetLength: len }
  }, [start, end])

  const radius = type === 'double' ? 0.06 : type === 'triple' ? 0.05 : 0.08

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.lerp(targetPosition, 0.1)
      meshRef.current.quaternion.slerp(targetQuaternion, 0.1)
      if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
        meshRef.current.material.opacity += (opacity - meshRef.current.material.opacity) * 0.1
      }
    }
  })

  return (
    <mesh ref={meshRef} position={start} quaternion={targetQuaternion} castShadow>
      <cylinderGeometry args={[radius, radius, targetLength, 8]} />
      <meshStandardMaterial 
        color="#888888" 
        roughness={0.3} 
        metalness={0.1}
        transparent
        opacity={opacity}
      />
    </mesh>
  )
}

// 星星背景
function Stars() {
  const meshRef = useRef<THREE.InstancedMesh>(null!)

  useEffect(() => {
    const count = 500
    const dummy = new THREE.Object3D()
    for (let i = 0; i < count; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * 40,
        Math.random() * 20 + 2,
        (Math.random() - 0.5) * 30
      )
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [])

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, 500]}>
      <sphereGeometry args={[0.035, 4, 4]} />
      <meshBasicMaterial color="#6688bb" transparent opacity={0.7} />
    </instancedMesh>
  )
}

// 反应场景
function ReactionScene() {
  const { currentReaction, progress } = useAppStore()
  const reaction = currentReaction ? ALL_REACTIONS[currentReaction] : null

  const currentAtoms = useMemo(() => {
    if (!reaction) return []

    const keyframes = reaction.keyframes
    let currentKf = keyframes[0]
    let nextKf = keyframes[0]
    let localProgress = 0

    for (let i = 0; i < keyframes.length - 1; i++) {
      if (progress >= keyframes[i].progress && progress < keyframes[i + 1].progress) {
        currentKf = keyframes[i]
        nextKf = keyframes[i + 1]
        localProgress = (progress - currentKf.progress) / (nextKf.progress - currentKf.progress)
        break
      }
    }

    return reaction.atoms.map(atom => {
      const currentPos = currentKf.atomPositions[atom.id] || atom.position
      const nextPos = nextKf.atomPositions[atom.id] || currentPos

      return {
        ...atom,
        position: [
          currentPos[0] + (nextPos[0] - currentPos[0]) * localProgress,
          currentPos[1] + (nextPos[1] - currentPos[1]) * localProgress,
          currentPos[2] + (nextPos[2] - currentPos[2]) * localProgress,
        ] as [number, number, number],
      }
    })
  }, [reaction, progress])

  const currentBonds = useMemo(() => {
    if (!reaction) return []

    const keyframes = reaction.keyframes
    let currentKf = keyframes[0]
    let nextKf = keyframes[0]
    let localProgress = 0

    for (let i = 0; i < keyframes.length - 1; i++) {
      if (progress >= keyframes[i].progress && progress < keyframes[i + 1].progress) {
        currentKf = keyframes[i]
        nextKf = keyframes[i + 1]
        localProgress = (progress - currentKf.progress) / (nextKf.progress - currentKf.progress)
        break
      }
    }

    return reaction.bonds.map(bond => {
      let opacity = 1
      if (currentKf.bondOpacities && currentKf.bondOpacities[bond.id] !== undefined) {
        const currentOpacity = currentKf.bondOpacities[bond.id]
        const nextOpacity = nextKf.bondOpacities?.[bond.id] ?? currentOpacity
        opacity = currentOpacity + (nextOpacity - currentOpacity) * localProgress
      }
      return { ...bond, opacity }
    })
  }, [reaction, progress])

  const atomPositions = useMemo(() => {
    const map = new Map<string, [number, number, number]>()
    currentAtoms.forEach(atom => map.set(atom.id, atom.position))
    return map
  }, [currentAtoms])

  if (!reaction) {
    return (
      <group>
        <Atom position={[0, 0, 0]} element="O" />
        <Atom position={[-0.76, 0.59, 0]} element="H" />
        <Atom position={[0.76, 0.59, 0]} element="H" />
        <Bond start={[0, 0, 0]} end={[-0.76, 0.59, 0]} />
        <Bond start={[0, 0, 0]} end={[0.76, 0.59, 0]} />
      </group>
    )
  }

  const brokenBonds = currentBonds.filter(bond => bond.opacity < 0.5)

  return (
    <group>
      {currentAtoms.map(atom => (
        <Atom key={atom.id} position={atom.position} element={atom.element} />
      ))}
      {currentBonds.map(bond => {
        const pos1 = atomPositions.get(bond.atom1Id)
        const pos2 = atomPositions.get(bond.atom2Id)
        if (!pos1 || !pos2) return null
        return (
          <Bond key={bond.id} start={pos1} end={pos2} type={bond.type} opacity={bond.opacity} />
        )
      })}
      {brokenBonds.map(bond => {
        const pos1 = atomPositions.get(bond.atom1Id)
        const pos2 = atomPositions.get(bond.atom2Id)
        if (!pos1 || !pos2) return null
        const midPos: [number, number, number] = [
          (pos1[0] + pos2[0]) / 2,
          (pos1[1] + pos2[1]) / 2,
          (pos1[2] + pos2[2]) / 2,
        ]
        return (
          <BondBreakEffect key={`effect-${bond.id}`} position={midPos} color="#ff6b4a" active={bond.opacity < 0.3} />
        )
      })}
    </group>
  )
}

// WebGPU 状态指示器
function WebGPUIndicator({ isWebGPU }: { isWebGPU: boolean }) {
  return (
    <div style={{
      position: 'absolute',
      top: 10,
      left: 10,
      padding: '4px 8px',
      borderRadius: '6px',
      background: isWebGPU ? 'rgba(0, 242, 195, 0.2)' : 'rgba(255, 170, 51, 0.2)',
      border: `1px solid ${isWebGPU ? 'rgba(0, 242, 195, 0.4)' : 'rgba(255, 170, 51, 0.4)'}`,
      color: isWebGPU ? '#00f2c3' : '#ffaa33',
      fontSize: '11px',
      fontWeight: 600,
    }}>
      {isWebGPU ? '⚡ WebGPU' : '🔌 WebGL'}
    </div>
  )
}

// 场景内容
function SceneContent() {
  return (
    <>
      <ambientLight intensity={2.5} color="#334466" />
      <directionalLight position={[6, 10, 6]} intensity={5} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-4, 2, -3]} intensity={2.5} color="#8899cc" />
      <directionalLight position={[-3, 4, -6]} intensity={3} color="#ffcc88" />

      <OrbitControls enableDamping dampingFactor={0.08} minDistance={3} maxDistance={20} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#0d0f1a" roughness={0.2} metalness={0.8} />
      </mesh>

      <ReactionScene />
      <Stars />
    </>
  )
}

export default function Scene3D() {
  const [isWebGPU, setIsWebGPU] = useState(false)

  useEffect(() => {
    checkWebGPUSupport().then(setIsWebGPU)
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [8, 5, 10], fov: 60 }}
        shadows
        gl={{ 
          antialias: true, 
          toneMapping: THREE.ACESFilmicToneMapping, 
          toneMappingExposure: 1.3,
          powerPreference: 'high-performance',
        }}
        style={{ background: '#1a1a2e' }}
      >
        <SceneContent />
      </Canvas>
      <WebGPUIndicator isWebGPU={isWebGPU} />
    </div>
  )
}
