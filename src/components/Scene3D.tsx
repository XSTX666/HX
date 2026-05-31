import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useAppStore } from '../store/appStore'
import { ALL_REACTIONS } from '../data/reactions'
import { Atom, Bond } from './MoleculeRenderer'

// 星星背景
function Stars() {
  const starsRef = useRef<THREE.Points>(null!)

  useEffect(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(800 * 3)
    for (let i = 0; i < 800 * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 40
      positions[i + 1] = Math.random() * 20 + 2
      positions[i + 2] = (Math.random() - 0.5) * 30
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    starsRef.current.geometry = geometry
  }, [])

  return (
    <points ref={starsRef}>
      <bufferGeometry />
      <pointsMaterial color="#6688bb" size={0.035} transparent opacity={0.7} />
    </points>
  )
}

// 数据驱动的反应场景
function ReactionScene() {
  const { currentReaction, progress } = useAppStore()
  const reaction = currentReaction ? ALL_REACTIONS[currentReaction] : null

  if (!reaction) {
    // 默认显示水分子
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

  // 找到当前应该显示的关键帧
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

  // 计算当前位置
  const currentAtoms = reaction.atoms.map(atom => {
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

  // 计算键的透明度
  const currentBonds = reaction.bonds.map(bond => {
    let opacity = 1
    
    // 检查关键帧中的透明度设置
    if (currentKf.bondOpacities && currentKf.bondOpacities[bond.id] !== undefined) {
      const currentOpacity = currentKf.bondOpacities[bond.id]
      const nextOpacity = nextKf.bondOpacities?.[bond.id] ?? currentOpacity
      opacity = currentOpacity + (nextOpacity - currentOpacity) * localProgress
    }

    return { ...bond, opacity }
  })

  // 创建原子位置映射
  const atomPositions = useMemo(() => {
    const map = new Map<string, [number, number, number]>()
    currentAtoms.forEach(atom => map.set(atom.id, atom.position))
    return map
  }, [currentAtoms])

  return (
    <group>
      {currentAtoms.map(atom => (
        <Atom
          key={atom.id}
          position={atom.position}
          element={atom.element}
        />
      ))}
      {currentBonds.map(bond => {
        const pos1 = atomPositions.get(bond.atom1Id)
        const pos2 = atomPositions.get(bond.atom2Id)
        if (!pos1 || !pos2) return null
        return (
          <Bond
            key={bond.id}
            start={pos1}
            end={pos2}
            type={bond.type}
            opacity={bond.opacity}
          />
        )
      })}
    </group>
  )
}

// 场景内容
function SceneContent() {
  return (
    <>
      {/* 灯光 */}
      <ambientLight intensity={2.5} color="#334466" />
      <directionalLight
        position={[6, 10, 6]}
        intensity={5}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-4, 2, -3]} intensity={2.5} color="#8899cc" />
      <directionalLight position={[-3, 4, -6]} intensity={3} color="#ffcc88" />

      {/* 控制器 */}
      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        minDistance={3}
        maxDistance={20}
      />

      {/* 地面 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#0d0f1a" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* 反应场景 */}
      <ReactionScene />

      {/* 星星背景 */}
      <Stars />
    </>
  )
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [8, 5, 10], fov: 60 }}
      shadows
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.3 }}
      style={{ background: '#1a1a2e' }}
    >
      <SceneContent />
    </Canvas>
  )
}
