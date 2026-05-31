// 化学数据定义
export const CHEMISTRY_DATA = {
  // 标准键长 (Å)
  bondLengths: {
    'C-C': 1.54,
    'C-O': 1.43,
    'C=O': 1.23,
    'C-H': 1.09,
    'O-H': 0.96,
    'C-C-benzene': 1.40,
    'C-N': 1.47,
    'C-Cl': 1.78,
    'C-Br': 1.94,
  } as Record<string, number>,

  // 标准键角 (度)
  bondAngles: {
    sp3: 109.5,
    sp2: 120,
    sp: 180,
    benzene: 120,
  } as Record<string, number>,

  // 原子半径 (Å)
  atomRadii: {
    C: 0.30,
    H: 0.15,
    O: 0.28,
    N: 0.27,
    Cl: 0.35,
    Br: 0.38,
    S: 0.32,
    Fe: 0.35,
    Na: 0.40,
  } as Record<string, number>,

  // CPK颜色
  atomColors: {
    C: '#555555',
    H: '#f0f0f0',
    O: '#e83030',
    N: '#3050F8',
    Cl: '#1FF01F',
    Br: '#8B1A1A',
    S: '#FFFF30',
    Fe: '#E06633',
    Na: '#AB5CF2',
  } as Record<string, string>,
}

// 原子类型
export interface AtomData {
  id: string
  element: string
  position: [number, number, number]
}

// 化学键类型
export interface BondData {
  id: string
  atom1: string
  atom2: string
  type: 'single' | 'double' | 'triple'
}

// 分子类型
export interface MoleculeData {
  id: string
  name: string
  atoms: AtomData[]
  bonds: BondData[]
}

// 反应步骤类型
export interface ReactionStep {
  id: string
  name: string
  description: string
  concepts: string[]
  progress: number
}

// 反应类型
export interface ReactionData {
  id: string
  name: string
  formula: string
  category: string
  steps: ReactionStep[]
  molecules: {
    reactants: MoleculeData[]
    products: MoleculeData[]
  }
}
