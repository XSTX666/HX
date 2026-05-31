import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useAppStore } from '../store/appStore'

// 原子组件
function Atom({ position, element, opacity = 1 }: { 
  position: [number, number, number], 
  element: string,
  opacity?: number 
}) {
  const colors: Record<string, string> = {
    C: '#555555', H: '#f0f0f0', O: '#e83030', N: '#3050F8',
    Cl: '#1FF01F', Br: '#8B1A1A'
  }
  const radii: Record<string, number> = {
    C: 0.30, H: 0.15, O: 0.28, N: 0.27, Cl: 0.35, Br: 0.38
  }

  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[radii[element] || 0.3, 32, 16]} />
      <meshStandardMaterial
        color={colors[element] || '#888888'}
        roughness={0.28}
        metalness={0.05}
        transparent
        opacity={opacity}
      />
    </mesh>
  )
}

// 化学键组件
function Bond({ start, end, type = 'single', opacity = 1 }: {
  start: [number, number, number]
  end: [number, number, number]
  type?: 'single' | 'double' | 'triple'
  opacity?: number
}) {
  const startVec = new THREE.Vector3(...start)
  const endVec = new THREE.Vector3(...end)
  const direction = new THREE.Vector3().subVectors(endVec, startVec)
  const length = direction.length()
  const center = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5)

  const radius = type === 'double' ? 0.06 : 0.08

  return (
    <mesh position={center} castShadow>
      <cylinderGeometry args={[radius, radius, length, 12]} />
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

// 烷烃卤代反应动画
function AlkaneHalogenationScene() {
  const { progress, isPlaying, speed } = useAppStore()
  const [animProgress, setAnimProgress] = useState(0)
  
  useFrame((_, delta) => {
    if (isPlaying && animProgress < 100) {
      setAnimProgress(prev => Math.min(100, prev + delta * speed * 20))
    }
  })

  // 动画阶段
  const phase = animProgress / 100
  
  // Cl2 位置动画
  const cl1Pos: [number, number, number] = [
    3 + phase * (-2.5),
    0.5,
    0
  ]
  const cl2Pos: [number, number, number] = [
    4.99 + phase * (-4),
    0.5,
    0
  ]

  // H 原子动画（被夺取）
  const h1Pos: [number, number, number] = [
    0.63 + phase * 2,
    0.63 + phase * 1.5,
    0.63
  ]

  // HCl 形成
  const hclOpacity = phase > 0.5 ? (phase - 0.5) * 2 : 0

  return (
    <group>
      {/* 甲烷 */}
      <Atom position={[0, 0, 0]} element="C" />
      <Atom position={h1Pos} element="H" opacity={1 - phase * 0.5} />
      <Atom position={[-0.63, -0.63, 0.63]} element="H" />
      <Atom position={[-0.63, 0.63, -0.63]} element="H" />
      <Atom position={[0.63, -0.63, -0.63]} element="H" />
      
      {/* 键 */}
      <Bond start={[0, 0, 0]} end={[-0.63, -0.63, 0.63]} />
      <Bond start={[0, 0, 0]} end={[-0.63, 0.63, -0.63]} />
      <Bond start={[0, 0, 0]} end={[0.63, -0.63, -0.63]} />
      
      {/* Cl2 分子 */}
      <Atom position={cl1Pos} element="Cl" />
      <Atom position={cl2Pos} element="Cl" />
      <Bond start={cl1Pos} end={cl2Pos} opacity={1 - phase} />
      
      {/* HCl 产物 */}
      {phase > 0.5 && (
        <>
          <Atom position={[2, 2, 0]} element="H" opacity={hclOpacity} />
          <Atom position={[2.99, 2, 0]} element="Cl" opacity={hclOpacity} />
          <Bond start={[2, 2, 0]} end={[2.99, 2, 0]} opacity={hclOpacity} />
        </>
      )}
      
      {/* CH3Cl 产物 */}
      {phase > 0.7 && (
        <>
          <Atom position={[0, 0, 0]} element="C" opacity={(phase - 0.7) * 3} />
          <Atom position={[0.99, 0, 0]} element="Cl" opacity={(phase - 0.7) * 3} />
          <Bond start={[0, 0, 0]} end={[0.99, 0, 0]} opacity={(phase - 0.7) * 3} />
        </>
      )}
    </group>
  )
}

// 烯烃加氢反应
function HydrogenationScene() {
  const { progress, isPlaying, speed } = useAppStore()
  const [animProgress, setAnimProgress] = useState(0)
  
  useFrame((_, delta) => {
    if (isPlaying && animProgress < 100) {
      setAnimProgress(prev => Math.min(100, prev + delta * speed * 20))
    }
  })

  const phase = animProgress / 100

  // H2 位置动画
  const h2Pos1: [number, number, number] = [3 - phase * 2.5, 0.5, 0]
  const h2Pos2: [number, number, number] = [4.09 - phase * 2.5, 0.5, 0]

  return (
    <group>
      {/* 乙烯 */}
      <Atom position={[-1.5, 0, 0]} element="C" />
      <Atom position={[-0.16, 0, 0]} element="C" />
      <Atom position={[-2.04, 0.935, 0]} element="H" />
      <Atom position={[-2.04, -0.935, 0]} element="H" />
      <Atom position={[0.38, 0.935, 0]} element="H" />
      <Atom position={[0.38, -0.935, 0]} element="H" />
      
      {/* 双键 */}
      <Bond start={[-1.5, 0, 0]} end={[-0.16, 0, 0]} type="double" />
      <Bond start={[-1.5, 0, 0]} end={[-2.04, 0.935, 0]} />
      <Bond start={[-1.5, 0, 0]} end={[-2.04, -0.935, 0]} />
      <Bond start={[-0.16, 0, 0]} end={[0.38, 0.935, 0]} />
      <Bond start={[-0.16, 0, 0]} end={[0.38, -0.935, 0]} />
      
      {/* H2 */}
      <Atom position={h2Pos1} element="H" />
      <Atom position={h2Pos2} element="H" />
      <Bond start={h2Pos1} end={h2Pos2} opacity={1 - phase} />
    </group>
  )
}

// 缩聚反应
function CondensationPolyScene() {
  const R = 1.40
  const benzeneAtoms: [number, number, number][] = []
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3
    benzeneAtoms.push([R * Math.cos(angle), R * Math.sin(angle), 0])
  }

  return (
    <group>
      {/* 苯环 */}
      {benzeneAtoms.map((pos, i) => (
        <Atom key={`c${i}`} position={pos} element="C" />
      ))}
      {benzeneAtoms.map((_, i) => (
        <Bond key={`b${i}`} start={benzeneAtoms[i]} end={benzeneAtoms[(i + 1) % 6]} />
      ))}

      {/* 羧基 */}
      <Atom position={[0, 2.94, 0]} element="C" />
      <Atom position={[-1.23, 3.54, 0]} element="O" />
      <Atom position={[1.23, 3.54, 0]} element="O" />
      <Bond start={[0, 1.4, 0]} end={[0, 2.94, 0]} />
      <Bond start={[0, 2.94, 0]} end={[-1.23, 3.54, 0]} type="double" />
      <Bond start={[0, 2.94, 0]} end={[1.23, 3.54, 0]} />
    </group>
  )
}

// 默认分子（水）
function DefaultMolecule() {
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

// 场景内容
function SceneContent() {
  const { currentReaction } = useAppStore()

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

      {/* 分子场景 */}
      {currentReaction === 'alkane-halogenation' && <AlkaneHalogenationScene />}
      {currentReaction === 'hydrogenation' && <HydrogenationScene />}
      {currentReaction === 'condensation-poly' && <CondensationPolyScene />}
      {!currentReaction && <DefaultMolecule />}

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
