import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useAppStore } from '../store/appStore'

// 原子组件
function Atom({ position, element, opacity = 1, emissive = '#000000', emissiveIntensity = 0 }: { 
  position: [number, number, number], 
  element: string,
  opacity?: number,
  emissive?: string,
  emissiveIntensity?: number
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
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
      />
    </mesh>
  )
}

// 化学键组件
function Bond({ start, end, type = 'single', opacity = 1, color = '#888888' }: {
  start: [number, number, number]
  end: [number, number, number]
  type?: 'single' | 'double' | 'triple'
  opacity?: number
  color?: string
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
        color={color} 
        roughness={0.3} 
        metalness={0.1}
        transparent
        opacity={opacity}
      />
    </mesh>
  )
}

// 粒子轨迹
function Trail({ positions, color = '#1FF01F' }: { positions: [number, number, number][], color?: string }) {
  if (positions.length < 2) return null

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={new Float32Array(positions.flat())}
          count={positions.length}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.6} />
    </line>
  )
}

// 光照效果
function LightFlash({ position, intensity, color }: { 
  position: [number, number, number], 
  intensity: number, 
  color: string 
}) {
  return (
    <pointLight position={position} intensity={intensity} color={color} distance={10} />
  )
}

// 烷烃卤代反应动画（完整版）
function AlkaneHalogenationScene() {
  const { progress, isPlaying, speed } = useAppStore()
  const [animProgress, setAnimProgress] = useState(0)
  const [trailPositions, setTrailPositions] = useState<[number, number, number][]>([])
  
  useFrame((_, delta) => {
    if (isPlaying && animProgress < 100) {
      setAnimProgress(prev => Math.min(100, prev + delta * speed * 15))
    }
  })

  // 动画阶段划分
  const phase = animProgress / 100
  
  // 阶段1: Cl₂接近并光解 (0-25%)
  const cl2Approach = Math.min(1, phase * 4)
  
  // 阶段2: Cl-Cl键断裂 (25-40%)
  const clClBreak = Math.max(0, Math.min(1, (phase - 0.25) * 6.67))
  
  // 阶段3: Cl·攻击C-H键 (40-60%)
  const clAttack = Math.max(0, Math.min(1, (phase - 0.4) * 5))
  
  // 阶段4: C-H键断裂，HCl形成 (60-80%)
  const chBreak = Math.max(0, Math.min(1, (phase - 0.6) * 5))
  
  // 阶段5: CH₃· + Cl₂ → CH₃Cl + Cl· (80-100%)
  const ch3ClForm = Math.max(0, Math.min(1, (phase - 0.8) * 5))

  // Cl₂位置
  const cl1Pos: [number, number, number] = [
    3 - cl2Approach * 2,
    0.5,
    0
  ]
  const cl2Pos: [number, number, number] = [
    4.99 - cl2Approach * 2,
    0.5,
    0
  ]

  // Cl·自由基位置（光解后）
  const clRadicalPos: [number, number, number] = [
    cl2Pos[0] + clClBreak * 1.5,
    cl2Pos[1] + clClBreak * 0.5,
    cl2Pos[2]
  ]

  // H原子位置（被夺取）
  const h1Pos: [number, number, number] = [
    0.63 + clAttack * 1.5,
    0.63 + clAttack * 1.0,
    0.63
  ]

  // HCl位置
  const hclPos: [number, number, number] = [
    2 + chBreak * 1,
    2 + chBreak * 0.5,
    0
  ]

  // ·CH₃自由基位置
  const ch3Pos: [number, number, number] = [
    0,
    0,
    0
  ]

  // CH₃Cl位置
  const ch3ClPos: [number, number, number] = [
    0 + ch3ClForm * 0.5,
    0,
    0
  ]

  // 更新轨迹
  useEffect(() => {
    if (clRadicalPos[0] !== 0 || clRadicalPos[1] !== 0) {
      setTrailPositions(prev => [...prev.slice(-20), clRadicalPos])
    }
  }, [clRadicalPos[0], clRadicalPos[1]])

  // 光照强度
  const lightIntensity = clClBreak > 0 && clClBreak < 1 ? 3 : 0

  return (
    <group>
      {/* 光照效果 */}
      {lightIntensity > 0 && (
        <LightFlash 
          position={[1, 1, 2]} 
          intensity={lightIntensity} 
          color="#ffffff" 
        />
      )}

      {/* 甲烷分子 */}
      <Atom position={[0, 0, 0]} element="C" />
      <Atom position={h1Pos} element="H" opacity={1 - chBreak * 0.5} />
      <Atom position={[-0.63, -0.63, 0.63]} element="H" />
      <Atom position={[-0.63, 0.63, -0.63]} element="H" />
      <Atom position={[0.63, -0.63, -0.63]} element="H" />
      
      {/* C-H 键（被攻击的那个） */}
      <Bond 
        start={[0, 0, 0]} 
        end={h1Pos} 
        opacity={1 - chBreak * 0.8}
        color={chBreak > 0 ? '#ff4444' : '#888888'}
      />
      {/* 其他 C-H 键 */}
      <Bond start={[0, 0, 0]} end={[-0.63, -0.63, 0.63]} />
      <Bond start={[0, 0, 0]} end={[-0.63, 0.63, -0.63]} />
      <Bond start={[0, 0, 0]} end={[0.63, -0.63, -0.63]} />
      
      {/* Cl₂ 分子 */}
      <Atom position={cl1Pos} element="Cl" opacity={1 - clClBreak} />
      <Atom position={cl2Pos} element="Cl" opacity={1 - clClBreak} />
      <Bond 
        start={cl1Pos} 
        end={cl2Pos} 
        opacity={1 - clClBreak}
        color={clClBreak > 0 ? '#ff4444' : '#1FF01F'}
      />
      
      {/* Cl· 自由基 */}
      {clClBreak > 0 && (
        <Atom 
          position={clRadicalPos} 
          element="Cl" 
          opacity={clClBreak}
          emissive="#1FF01F"
          emissiveIntensity={0.5}
        />
      )}

      {/* 轨迹 */}
      {trailPositions.length > 1 && (
        <Trail positions={trailPositions} color="#1FF01F" />
      )}

      {/* HCl 产物 */}
      {chBreak > 0 && (
        <>
          <Atom position={hclPos} element="H" opacity={chBreak} />
          <Atom position={[hclPos[0] + 0.99, hclPos[1], hclPos[2]]} element="Cl" opacity={chBreak} />
          <Bond 
            start={hclPos} 
            end={[hclPos[0] + 0.99, hclPos[1], hclPos[2]]} 
            opacity={chBreak}
          />
        </>
      )}

      {/* ·CH₃ 自由基 */}
      {chBreak > 0 && ch3ClForm < 0.5 && (
        <Atom 
          position={ch3Pos} 
          element="C" 
          opacity={chBreak}
          emissive="#ffaa00"
          emissiveIntensity={0.3}
        />
      )}

      {/* CH₃Cl 产物 */}
      {ch3ClForm > 0 && (
        <>
          <Atom position={ch3ClPos} element="C" opacity={ch3ClForm} />
          <Atom position={[ch3ClPos[0] + 0.99, ch3ClPos[1], ch3ClPos[2]]} element="Cl" opacity={ch3ClForm} />
          <Bond 
            start={ch3ClPos} 
            end={[ch3ClPos[0] + 0.99, ch3ClPos[1], ch3ClPos[2]]} 
            opacity={ch3ClForm}
          />
          {/* CH₃ 的 H 原子 */}
          <Atom position={[ch3ClPos[0] - 0.63, ch3ClPos[1] + 0.63, ch3ClPos[2] - 0.63]} element="H" opacity={ch3ClForm} />
          <Atom position={[ch3ClPos[0] - 0.63, ch3ClPos[1] - 0.63, ch3ClPos[2] + 0.63]} element="H" opacity={ch3ClForm} />
          <Atom position={[ch3ClPos[0] - 0.63, ch3ClPos[1] + 0.63, ch3ClPos[2] + 0.63]} element="H" opacity={ch3ClForm} />
          <Bond start={ch3ClPos} end={[ch3ClPos[0] - 0.63, ch3ClPos[1] + 0.63, ch3ClPos[2] - 0.63]} opacity={ch3ClForm} />
          <Bond start={ch3ClPos} end={[ch3ClPos[0] - 0.63, ch3ClPos[1] - 0.63, ch3ClPos[2] + 0.63]} opacity={ch3ClForm} />
          <Bond start={ch3ClPos} end={[ch3ClPos[0] - 0.63, ch3ClPos[1] + 0.63, ch3ClPos[2] + 0.63]} opacity={ch3ClForm} />
        </>
      )}

      {/* Cl· 再生（链式反应） */}
      {ch3ClForm > 0.5 && (
        <Atom 
          position={[clRadicalPos[0] + 2, clRadicalPos[1], clRadicalPos[2]]} 
          element="Cl" 
          opacity={ch3ClForm}
          emissive="#1FF01F"
          emissiveIntensity={0.3}
        />
      )}
    </group>
  )
}

// 其他反应场景保持不变...
function HydrogenationScene() {
  const { progress, isPlaying, speed } = useAppStore()
  const [animProgress, setAnimProgress] = useState(0)
  
  useFrame((_, delta) => {
    if (isPlaying && animProgress < 100) {
      setAnimProgress(prev => Math.min(100, prev + delta * speed * 20))
    }
  })

  const phase = animProgress / 100
  const h2Pos1: [number, number, number] = [3 - phase * 2.5, 0.5, 0]
  const h2Pos2: [number, number, number] = [4.09 - phase * 2.5, 0.5, 0]

  return (
    <group>
      <Atom position={[-1.5, 0, 0]} element="C" />
      <Atom position={[-0.16, 0, 0]} element="C" />
      <Atom position={[-2.04, 0.935, 0]} element="H" />
      <Atom position={[-2.04, -0.935, 0]} element="H" />
      <Atom position={[0.38, 0.935, 0]} element="H" />
      <Atom position={[0.38, -0.935, 0]} element="H" />
      <Bond start={[-1.5, 0, 0]} end={[-0.16, 0, 0]} type="double" />
      <Bond start={[-1.5, 0, 0]} end={[-2.04, 0.935, 0]} />
      <Bond start={[-1.5, 0, 0]} end={[-2.04, -0.935, 0]} />
      <Bond start={[-0.16, 0, 0]} end={[0.38, 0.935, 0]} />
      <Bond start={[-0.16, 0, 0]} end={[0.38, -0.935, 0]} />
      <Atom position={h2Pos1} element="H" />
      <Atom position={h2Pos2} element="H" />
      <Bond start={h2Pos1} end={h2Pos2} opacity={1 - phase} />
    </group>
  )
}

function CondensationPolyScene() {
  const R = 1.40
  const benzeneAtoms: [number, number, number][] = []
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3
    benzeneAtoms.push([R * Math.cos(angle), R * Math.sin(angle), 0])
  }

  return (
    <group>
      {benzeneAtoms.map((pos, i) => (
        <Atom key={`c${i}`} position={pos} element="C" />
      ))}
      {benzeneAtoms.map((_, i) => (
        <Bond key={`b${i}`} start={benzeneAtoms[i]} end={benzeneAtoms[(i + 1) % 6]} />
      ))}
      <Atom position={[0, 2.94, 0]} element="C" />
      <Atom position={[-1.23, 3.54, 0]} element="O" />
      <Atom position={[1.23, 3.54, 0]} element="O" />
      <Bond start={[0, 1.4, 0]} end={[0, 2.94, 0]} />
      <Bond start={[0, 2.94, 0]} end={[-1.23, 3.54, 0]} type="double" />
      <Bond start={[0, 2.94, 0]} end={[1.23, 3.54, 0]} />
    </group>
  )
}

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

function SceneContent() {
  const { currentReaction } = useAppStore()

  return (
    <>
      <ambientLight intensity={2.5} color="#334466" />
      <directionalLight
        position={[6, 10, 6]}
        intensity={5}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-4, 2, -3]} intensity={2.5} color="#8899cc" />
      <directionalLight position={[-3, 4, -6]} intensity={3} color="#ffcc88" />

      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        minDistance={3}
        maxDistance={20}
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#0d0f1a" roughness={0.2} metalness={0.8} />
      </mesh>

      {currentReaction === 'alkane-halogenation' && <AlkaneHalogenationScene />}
      {currentReaction === 'hydrogenation' && <HydrogenationScene />}
      {currentReaction === 'condensation-poly' && <CondensationPolyScene />}
      {!currentReaction && <DefaultMolecule />}

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
