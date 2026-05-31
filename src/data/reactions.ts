import { ReactionData, benzenePositions } from './types'

// 烷烃卤代反应数据
export const ALKANE_HALOGENATION: ReactionData = {
  id: 'alkane-halogenation',
  name: '烷烃卤代反应',
  formula: 'CH₄ + Cl₂ → CH₃Cl + HCl',
  category: 'substitution',
  description: '甲烷与氯气在光照条件下发生自由基取代反应',

  // 初始原子位置
  atoms: [
    // 甲烷
    { id: 'c1', element: 'C', position: [0, 0, 0] },
    { id: 'h1', element: 'H', position: [0.63, 0.63, 0.63] },
    { id: 'h2', element: 'H', position: [-0.63, -0.63, 0.63] },
    { id: 'h3', element: 'H', position: [-0.63, 0.63, -0.63] },
    { id: 'h4', element: 'H', position: [0.63, -0.63, -0.63] },
    // 氯气
    { id: 'cl1', element: 'Cl', position: [3, 0.5, 0] },
    { id: 'cl2', element: 'Cl', position: [4.99, 0.5, 0] },
  ],

  // 初始化学键
  bonds: [
    { id: 'c1-h1', atom1Id: 'c1', atom2Id: 'h1', type: 'single' },
    { id: 'c1-h2', atom1Id: 'c1', atom2Id: 'h2', type: 'single' },
    { id: 'c1-h3', atom1Id: 'c1', atom2Id: 'h3', type: 'single' },
    { id: 'c1-h4', atom1Id: 'c1', atom2Id: 'h4', type: 'single' },
    { id: 'cl1-cl2', atom1Id: 'cl1', atom2Id: 'cl2', type: 'single' },
  ],

  // 动画关键帧
  keyframes: [
    // 阶段1: 初始状态 (0%)
    {
      progress: 0,
      atomPositions: {
        c1: [0, 0, 0],
        h1: [0.63, 0.63, 0.63],
        h2: [-0.63, -0.63, 0.63],
        h3: [-0.63, 0.63, -0.63],
        h4: [0.63, -0.63, -0.63],
        cl1: [3, 0.5, 0],
        cl2: [4.99, 0.5, 0],
      },
    },
    // 阶段2: Cl₂接近 (20%)
    {
      progress: 20,
      atomPositions: {
        c1: [0, 0, 0],
        h1: [0.63, 0.63, 0.63],
        h2: [-0.63, -0.63, 0.63],
        h3: [-0.63, 0.63, -0.63],
        h4: [0.63, -0.63, -0.63],
        cl1: [1.5, 0.5, 0],
        cl2: [3.49, 0.5, 0],
      },
    },
    // 阶段3: Cl-Cl键断裂 (40%)
    {
      progress: 40,
      atomPositions: {
        c1: [0, 0, 0],
        h1: [0.63, 0.63, 0.63],
        h2: [-0.63, -0.63, 0.63],
        h3: [-0.63, 0.63, -0.63],
        h4: [0.63, -0.63, -0.63],
        cl1: [1.0, 1.0, 0],
        cl2: [2.5, -0.5, 0],
      },
      bondOpacities: { 'cl1-cl2': 0 },
    },
    // 阶段4: Cl·攻击C-H (60%)
    {
      progress: 60,
      atomPositions: {
        c1: [0, 0, 0],
        h1: [1.0, 1.0, 0.63],
        h2: [-0.63, -0.63, 0.63],
        h3: [-0.63, 0.63, -0.63],
        h4: [0.63, -0.63, -0.63],
        cl1: [0.8, 0.8, 0],
        cl2: [2.5, -0.5, 0],
      },
      bondOpacities: { 'c1-h1': 0.5 },
    },
    // 阶段5: HCl形成 (80%)
    {
      progress: 80,
      atomPositions: {
        c1: [0, 0, 0],
        h1: [2.0, 2.0, 0],
        h2: [-0.63, -0.63, 0.63],
        h3: [-0.63, 0.63, -0.63],
        h4: [0.63, -0.63, -0.63],
        cl1: [2.99, 2.0, 0],
        cl2: [2.5, -0.5, 0],
      },
      bondOpacities: { 'c1-h1': 0, 'cl1-cl2': 0 },
    },
    // 阶段6: CH₃Cl形成 (100%)
    {
      progress: 100,
      atomPositions: {
        c1: [0, 0, 0],
        h1: [2.0, 2.0, 0],
        h2: [-0.63, -0.63, 0.63],
        h3: [-0.63, 0.63, -0.63],
        h4: [0.63, -0.63, -0.63],
        cl1: [2.99, 2.0, 0],
        cl2: [0.99, 0, 0],
      },
      bondOpacities: { 'c1-h1': 0, 'cl1-cl2': 0 },
    },
  ],

  // 反应步骤
  steps: [
    { id: 'step1', name: '反应物就位', description: '甲烷和氯气分子', concepts: ['sp³杂化', '正四面体'], progress: 0 },
    { id: 'step2', name: 'Cl₂光解', description: '紫外光使Cl-Cl键断裂', concepts: ['自由基', '均裂'], progress: 40 },
    { id: 'step3', name: 'Cl·攻击', description: 'Cl·攻击C-H键', concepts: ['自由基攻击', '链增长'], progress: 60 },
    { id: 'step4', name: 'HCl形成', description: '生成HCl和·CH₃', concepts: ['H转移', '自由基'], progress: 80 },
    { id: 'step5', name: '产物生成', description: '生成CH₃Cl', concepts: ['取代反应', '链终止'], progress: 100 },
  ],

  // 能量曲线
  energyProfile: [0, 10, 50, 30, 20, -10],
}

// 烯烃加氢反应数据
export const HYDROGENATION: ReactionData = {
  id: 'hydrogenation',
  name: '烯烃加氢反应',
  formula: 'CH₂=CH₂ + H₂ → CH₃CH₃',
  category: 'addition',
  description: '乙烯与氢气在催化剂作用下发生加成反应',

  atoms: [
    { id: 'c1', element: 'C', position: [-1.5, 0, 0] },
    { id: 'c2', element: 'C', position: [-0.16, 0, 0] },
    { id: 'h1', element: 'H', position: [-2.04, 0.935, 0] },
    { id: 'h2', element: 'H', position: [-2.04, -0.935, 0] },
    { id: 'h3', element: 'H', position: [0.38, 0.935, 0] },
    { id: 'h4', element: 'H', position: [0.38, -0.935, 0] },
    { id: 'h5', element: 'H', position: [3, 0.5, 0] },
    { id: 'h6', element: 'H', position: [4.09, 0.5, 0] },
  ],

  bonds: [
    { id: 'c1-c2', atom1Id: 'c1', atom2Id: 'c2', type: 'double' },
    { id: 'c1-h1', atom1Id: 'c1', atom2Id: 'h1', type: 'single' },
    { id: 'c1-h2', atom1Id: 'c1', atom2Id: 'h2', type: 'single' },
    { id: 'c2-h3', atom1Id: 'c2', atom2Id: 'h3', type: 'single' },
    { id: 'c2-h4', atom1Id: 'c2', atom2Id: 'h4', type: 'single' },
    { id: 'h5-h6', atom1Id: 'h5', atom2Id: 'h6', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { c1: [-1.5, 0, 0], c2: [-0.16, 0, 0], h5: [3, 0.5, 0], h6: [4.09, 0.5, 0] } },
    { progress: 40, atomPositions: { c1: [-1.5, 0, 0], c2: [-0.16, 0, 0], h5: [1.5, 0.5, 0], h6: [2.59, 0.5, 0] } },
    { progress: 70, atomPositions: { c1: [-1.5, 0, 0], c2: [-0.16, 0, 0], h5: [0.5, 0.5, 0], h6: [1.5, 0.5, 0] } },
    { progress: 100, atomPositions: { c1: [-1.5, 0, 0], c2: [-0.16, 0, 0], h5: [-0.5, 0.5, 0], h6: [0.5, 0.5, 0] } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '乙烯和氢气', concepts: ['C=C双键', 'π键'], progress: 0 },
    { id: 'step2', name: 'H₂接近', description: 'H₂向乙烯移动', concepts: ['催化剂吸附'], progress: 40 },
    { id: 'step3', name: 'H-H断裂', description: 'H-H键断裂', concepts: ['键断裂'], progress: 70 },
    { id: 'step4', name: '产物生成', description: '生成乙烷', concepts: ['加成反应'], progress: 100 },
  ],

  energyProfile: [0, 20, 40, -20],
}

// 缩聚反应数据
export const CONDENSATION_POLY: ReactionData = {
  id: 'condensation-poly',
  name: '缩聚反应',
  formula: 'n HOCH₂CH₂OH + n HOOC-C₆H₄-COOH → 涤纶 + (2n-1)H₂O',
  category: 'polymerization',
  description: '乙二醇与对苯二甲酸发生缩聚反应生成涤纶',

  atoms: [
    // 苯环
    ...benzenePositions([0, 0, 0], 1.40).map((pos, i) => ({
      id: `rc${i}`, element: 'C', position: pos as [number, number, number]
    })),
    // 羧基
    { id: 'c3', element: 'C', position: [0, 2.94, 0] },
    { id: 'o1', element: 'O', position: [-1.23, 3.54, 0] },
    { id: 'o2', element: 'O', position: [1.23, 3.54, 0] },
    // 乙二醇
    { id: 'c4', element: 'C', position: [4, 0, 0] },
    { id: 'c5', element: 'C', position: [5.5, 0, 0] },
    { id: 'o3', element: 'O', position: [5.5, 1.43, 0] },
    { id: 'h1', element: 'H', position: [5.5, 2.39, 0] },
  ],

  bonds: [
    // 苯环键
    ...Array.from({ length: 6 }, (_, i) => ({
      id: `rc${i}-rc${(i + 1) % 6}`,
      atom1Id: `rc${i}`,
      atom2Id: `rc${(i + 1) % 6}`,
      type: 'single' as const,
    })),
    // 羧基键
    { id: 'rc0-c3', atom1Id: 'rc0', atom2Id: 'c3', type: 'single' },
    { id: 'c3-o1', atom1Id: 'c3', atom2Id: 'o1', type: 'double' },
    { id: 'c3-o2', atom1Id: 'c3', atom2Id: 'o2', type: 'single' },
    // 乙二醇键
    { id: 'c4-c5', atom1Id: 'c4', atom2Id: 'c5', type: 'single' },
    { id: 'c5-o3', atom1Id: 'c5', atom2Id: 'o3', type: 'single' },
    { id: 'o3-h1', atom1Id: 'o3', atom2Id: 'h1', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { c4: [4, 0, 0], c5: [5.5, 0, 0], o3: [5.5, 1.43, 0], h1: [5.5, 2.39, 0] } },
    { progress: 50, atomPositions: { c4: [2, 0, 0], c5: [3.5, 0, 0], o3: [3.5, 1.43, 0], h1: [3.5, 2.39, 0] } },
    { progress: 100, atomPositions: { c4: [1.5, 0, 0], c5: [3.0, 0, 0], o3: [3.0, 1.43, 0], h1: [3.0, 2.39, 0] } },
  ],

  steps: [
    { id: 'step1', name: '单体就位', description: '乙二醇和对苯二甲酸', concepts: ['双官能团'], progress: 0 },
    { id: 'step2', name: '分子靠近', description: '分子向中间移动', concepts: ['分子运动'], progress: 50 },
    { id: 'step3', name: '酯化脱水', description: '形成酯键，脱去水', concepts: ['缩聚'], progress: 100 },
  ],

  energyProfile: [0, 20, -10],
}

// 所有反应数据
export const ALL_REACTIONS: Record<string, ReactionData> = {
  'alkane-halogenation': ALKANE_HALOGENATION,
  'hydrogenation': HYDROGENATION,
  'condensation-poly': CONDENSATION_POLY,
}
