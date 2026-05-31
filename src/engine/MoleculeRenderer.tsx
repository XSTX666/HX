import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { AtomData, BondData } from '../data/types'

// 原子颜色和半径
const ATOM_COLORS: Record<string, string> = {
  C: '#555555', H: '#f0f0f0', O: '#e83030', N: '#3050F8',
  Cl: '#1FF01F', Br: '#8B1A1A', S: '#FFFF30', Fe: '#E06633',
}

const ATOM_RADII: Record<string, number> = {
  C: 0.30, H: 0.15, O: 0.28, N: 0.27, Cl: 0.35, Br: 0.38, S: 0.32, Fe: 0.35,
}

// 单个原子组件
export function Atom({ 
  position, 
  element, 
  opacity = 1,
  emissive = '#000000',
  emissiveIntensity = 0,
}: { 
  position: [number, number, number]
  element: string
  opacity?: number
  emissive?: string
  emissiveIntensity?: number
}) {
  const radius = ATOM_RADII[element] || 0.3
  const color = ATOM_COLORS[element] || '#888888'

  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[radius, 32, 16]} />
      <meshStandardMaterial
        color={color}
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

// 单个化学键组件
export function Bond({ 
  start, 
  end, 
  type = 'single', 
  opacity = 1,
  color = '#888888',
}: {
  start: [number, number, number]
  end: [number, number, number]
  type?: 'single' | 'double' | 'triple'
  opacity?: number
  color?: string
}) {
  const startVec = useMemo(() => new THREE.Vector3(...start), [start])
  const endVec = useMemo(() => new THREE.Vector3(...end), [end])
  const direction = useMemo(() => new THREE.Vector3().subVectors(endVec, startVec), [startVec, endVec])
  const length = useMemo(() => direction.length(), [direction])
  const center = useMemo(() => new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5), [startVec, endVec])

  const radius = type === 'double' ? 0.06 : type === 'triple' ? 0.05 : 0.08

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

// 分子组件（根据原子和键数据渲染）
export function Molecule({ 
  atoms, 
  bonds,
  showLabels = false,
}: {
  atoms: AtomData[]
  bonds: BondData[]
  showLabels?: boolean
}) {
  // 创建原子位置映射
  const atomPositions = useMemo(() => {
    const map = new Map<string, [number, number, number]>()
    atoms.forEach(atom => map.set(atom.id, atom.position))
    return map
  }, [atoms])

  return (
    <group>
      {/* 渲染原子 */}
      {atoms.map(atom => (
        <Atom
          key={atom.id}
          position={atom.position}
          element={atom.element}
        />
      ))}

      {/* 渲染化学键 */}
      {bonds.map(bond => {
        const pos1 = atomPositions.get(bond.atom1Id)
        const pos2 = atomPositions.get(bond.atom2Id)
        if (!pos1 || !pos2) return null
        return (
          <Bond
            key={bond.id}
            start={pos1}
            end={pos2}
            type={bond.type}
          />
        )
      })}
    </group>
  )
}

// 带动画的分子组件
export function AnimatedMolecule({ 
  atoms, 
  bonds,
  targetAtoms,
  progress = 0,
}: {
  atoms: AtomData[]
  bonds: BondData[]
  targetAtoms?: Record<string, [number, number, number]>
  progress?: number
}) {
  // 计算当前位置
  const currentAtoms = useMemo(() => {
    if (!targetAtoms || progress === 0) return atoms
    
    return atoms.map(atom => {
      const target = targetAtoms[atom.id]
      if (!target) return atom
      
      const t = progress / 100
      return {
        ...atom,
        position: [
          atom.position[0] + (target[0] - atom.position[0]) * t,
          atom.position[1] + (target[1] - atom.position[1]) * t,
          atom.position[2] + (target[2] - atom.position[2]) * t,
        ] as [number, number, number],
      }
    })
  }, [atoms, targetAtoms, progress])

  return <Molecule atoms={currentAtoms} bonds={bonds} />
}
