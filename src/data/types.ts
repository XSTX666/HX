// 标准化学键长 (Å)
export const BOND_LENGTHS = {
  'C-C': 1.54,
  'C-O': 1.43,
  'C=O': 1.23,
  'C-H': 1.09,
  'O-H': 0.96,
  'C-C-benzene': 1.40,
  'C-N': 1.47,
  'C-Cl': 1.78,
  'C-Br': 1.94,
  'Cl-Cl': 1.99,
  'H-H': 0.74,
} as const

// 标准键角 (度)
export const BOND_ANGLES = {
  sp3: 109.5,
  sp2: 120,
  sp: 180,
  benzene: 120,
} as const

// 原子数据
export interface AtomData {
  id: string
  element: string
  position: [number, number, number]
  targetPosition?: [number, number, number]  // 动画目标位置
}

// 化学键数据
export interface BondData {
  id: string
  atom1Id: string
  atom2Id: string
  type: 'single' | 'double' | 'triple'
  targetOpacity?: number  // 动画目标透明度
}

// 动画关键帧
export interface Keyframe {
  progress: number  // 0-100
  atomPositions: Record<string, [number, number, number]>
  bondOpacities?: Record<string, number>
  effects?: EffectData[]
}

// 特效数据
export interface EffectData {
  type: 'flash' | 'trail' | 'glow' | 'vibrate'
  position?: [number, number, number]
  color?: string
  intensity?: number
  duration?: number
}

// 反应步骤
export interface ReactionStep {
  id: string
  name: string
  description: string
  concepts: string[]
  progress: number  // 0-100
}

// 完整反应数据
export interface ReactionData {
  id: string
  name: string
  formula: string
  category: string
  description: string
  
  // 分子数据
  atoms: AtomData[]
  bonds: BondData[]
  
  // 动画数据
  keyframes: Keyframe[]
  
  // 反应步骤
  steps: ReactionStep[]
  
  // 能量数据
  energyProfile: number[]  // 每个关键帧的能量值
}

// 辅助函数：计算原子位置
export function calculatePosition(
  base: [number, number, number],
  angle: number,
  distance: number,
  plane: 'xy' | 'xz' | 'yz' = 'xy'
): [number, number, number] {
  const rad = (angle * Math.PI) / 180
  switch (plane) {
    case 'xy':
      return [base[0] + distance * Math.cos(rad), base[1] + distance * Math.sin(rad), base[2]]
    case 'xz':
      return [base[0] + distance * Math.cos(rad), base[1], base[2] + distance * Math.sin(rad)]
    case 'yz':
      return [base[0], base[1] + distance * Math.cos(rad), base[2] + distance * Math.sin(rad)]
  }
}

// 辅助函数：计算四面体位置
export function tetrahedralPositions(
  center: [number, number, number],
  distance: number
): [number, number, number][] {
  return [
    calculatePosition(center, 0, distance, 'xy'),
    calculatePosition(center, 120, distance, 'xy'),
    calculatePosition(center, 240, distance, 'xy'),
    [center[0], center[1], center[2] + distance],
  ]
}

// 辅助函数：计算苯环位置
export function benzenePositions(
  center: [number, number, number],
  radius: number
): [number, number, number][] {
  const positions: [number, number, number][] = []
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3
    positions.push([
      center[0] + radius * Math.cos(angle),
      center[1] + radius * Math.sin(angle),
      center[2],
    ])
  }
  return positions
}
