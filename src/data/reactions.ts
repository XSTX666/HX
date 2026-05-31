import type { ReactionData } from './types'
import { benzenePositions } from './types'

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

// 苯的溴代反应数据
export const BENZENE_BROMINATION: ReactionData = {
  id: 'benzene-bromination',
  name: '苯的溴代反应',
  formula: 'C₆H₆ + Br₂ → C₆H₅Br + HBr',
  category: 'substitution',
  description: '苯与溴在FeBr₃催化下发生亲电取代反应',

  atoms: [
    // 苯环
    ...benzenePositions([0, 0, 0], 1.40).map((pos, i) => ({
      id: `rc${i}`, element: 'C', position: pos as [number, number, number]
    })),
    // Br₂
    { id: 'br1', element: 'Br', position: [3.5, 0.5, 0] },
    { id: 'br2', element: 'Br', position: [5.78, 0.5, 0] },
  ],

  bonds: [
    ...Array.from({ length: 6 }, (_, i) => ({
      id: `rc${i}-rc${(i + 1) % 6}`,
      atom1Id: `rc${i}`,
      atom2Id: `rc${(i + 1) % 6}`,
      type: 'single' as const,
    })),
    { id: 'br1-br2', atom1Id: 'br1', atom2Id: 'br2', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { br1: [3.5, 0.5, 0], br2: [5.78, 0.5, 0] } },
    { progress: 40, atomPositions: { br1: [2.0, 0.5, 0], br2: [4.28, 0.5, 0] } },
    { progress: 70, atomPositions: { br1: [1.5, 1.0, 0], br2: [3.0, -0.5, 0] }, bondOpacities: { 'br1-br2': 0 } },
    { progress: 100, atomPositions: { br1: [1.5, 1.40, 0], br2: [4.0, 2.0, 0] }, bondOpacities: { 'br1-br2': 0 } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '苯和Br₂', concepts: ['苯环', 'sp²杂化'], progress: 0 },
    { id: 'step2', name: 'Br₂接近', description: 'Br₂向苯环移动', concepts: ['亲电试剂'], progress: 40 },
    { id: 'step3', name: 'Br-Br断裂', description: 'Br-Br键断裂', concepts: ['键断裂'], progress: 70 },
    { id: 'step4', name: '产物生成', description: '生成溴苯和HBr', concepts: ['亲电取代'], progress: 100 },
  ],

  energyProfile: [0, 30, 50, -20],
}

// 酯化反应数据
export const ESTERIFICATION: ReactionData = {
  id: 'esterification',
  name: '酯化反应',
  formula: 'CH₃COOH + C₂H₅OH → CH₃COOC₂H₅ + H₂O',
  category: 'substitution',
  description: '乙酸与乙醇在浓硫酸催化下发生酯化反应',

  atoms: [
    // 乙酸
    { id: 'c1', element: 'C', position: [-3, 0, 0] },
    { id: 'c2', element: 'C', position: [-1.5, 0, 0] },
    { id: 'o1', element: 'O', position: [-1.5, 1.23, 0] },
    { id: 'o2', element: 'O', position: [-1.5, -1.43, 0] },
    { id: 'h1', element: 'H', position: [-1.5, -2.39, 0] },
    // 乙醇
    { id: 'c3', element: 'C', position: [2, 0, 0] },
    { id: 'c4', element: 'C', position: [3.5, 0, 0] },
    { id: 'o3', element: 'O', position: [3.5, 1.43, 0] },
    { id: 'h2', element: 'H', position: [3.5, 2.39, 0] },
  ],

  bonds: [
    { id: 'c1-c2', atom1Id: 'c1', atom2Id: 'c2', type: 'single' },
    { id: 'c2-o1', atom1Id: 'c2', atom2Id: 'o1', type: 'double' },
    { id: 'c2-o2', atom1Id: 'c2', atom2Id: 'o2', type: 'single' },
    { id: 'o2-h1', atom1Id: 'o2', atom2Id: 'h1', type: 'single' },
    { id: 'c3-c4', atom1Id: 'c3', atom2Id: 'c4', type: 'single' },
    { id: 'c4-o3', atom1Id: 'c4', atom2Id: 'o3', type: 'single' },
    { id: 'o3-h2', atom1Id: 'o3', atom2Id: 'h2', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: {} },
    { progress: 50, atomPositions: {
      c3: [0.5, 0, 0], c4: [2, 0, 0], o3: [2, 1.43, 0], h2: [2, 2.39, 0]
    }},
    { progress: 100, atomPositions: {
      c3: [0, 0, 0], c4: [1.5, 0, 0], o3: [1.5, 1.43, 0], h2: [4, 2, 0]
    }},
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '乙酸和乙醇', concepts: ['羧基', '羟基'], progress: 0 },
    { id: 'step2', name: '分子靠近', description: '分子相互接近', concepts: ['氢键'], progress: 50 },
    { id: 'step3', name: '酯化脱水', description: '形成酯键，脱去水', concepts: ['酯化反应'], progress: 100 },
  ],

  energyProfile: [0, 15, -10],
}

// 醇消去反应数据
export const ETHANOL_ELIMINATION: ReactionData = {
  id: 'ethanol-elimination',
  name: '醇消去反应',
  formula: 'CH₃CH₂OH → CH₂=CH₂ + H₂O',
  category: 'elimination',
  description: '乙醇在浓硫酸催化下发生消去反应生成乙烯',

  atoms: [
    { id: 'c1', element: 'C', position: [-1.5, 0, 0] },
    { id: 'c2', element: 'C', position: [0, 0, 0] },
    { id: 'o1', element: 'O', position: [0, 1.43, 0] },
    { id: 'h1', element: 'H', position: [0, 2.39, 0] },
    { id: 'h2', element: 'H', position: [-2.04, 0.935, 0] },
    { id: 'h3', element: 'H', position: [-2.04, -0.935, 0] },
    { id: 'h4', element: 'H', position: [0.38, 0.935, 0] },
    { id: 'h5', element: 'H', position: [0.38, -0.935, 0] },
  ],

  bonds: [
    { id: 'c1-c2', atom1Id: 'c1', atom2Id: 'c2', type: 'single' },
    { id: 'c2-o1', atom1Id: 'c2', atom2Id: 'o1', type: 'single' },
    { id: 'o1-h1', atom1Id: 'o1', atom2Id: 'h1', type: 'single' },
    { id: 'c1-h2', atom1Id: 'c1', atom2Id: 'h2', type: 'single' },
    { id: 'c1-h3', atom1Id: 'c1', atom2Id: 'h3', type: 'single' },
    { id: 'c2-h4', atom1Id: 'c2', atom2Id: 'h4', type: 'single' },
    { id: 'c2-h5', atom1Id: 'c2', atom2Id: 'h5', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: {} },
    { progress: 40, atomPositions: {
      o1: [0.5, 2, 0], h1: [0.5, 3, 0]
    }},
    { progress: 70, atomPositions: {
      o1: [1, 3, 0], h1: [1, 4, 0]
    }, bondOpacities: { 'c2-o1': 0, 'o1-h1': 0 }},
    { progress: 100, atomPositions: {
      o1: [2, 4, 0], h1: [2, 5, 0]
    }},
  ],

  steps: [
    { id: 'step1', name: '乙醇就位', description: '乙醇分子', concepts: ['sp³杂化'], progress: 0 },
    { id: 'step2', name: 'O-H断裂', description: 'O-H键断裂', concepts: ['质子化'], progress: 40 },
    { id: 'step3', name: 'C-O断裂', description: 'C-O键断裂', concepts: ['消去'], progress: 70 },
    { id: 'step4', name: '产物生成', description: '生成乙烯和水', concepts: ['消去反应'], progress: 100 },
  ],

  energyProfile: [0, 30, 40, -10],
}

// 苯的硝化反应数据
export const BENZENE_NITRATION: ReactionData = {
  id: 'benzene-nitration',
  name: '苯的硝化反应',
  formula: 'C₆H₆ + HNO₃ → C₆H₅NO₂ + H₂O',
  category: 'substitution',
  description: '苯与浓硝酸在浓硫酸催化下发生硝化反应',

  atoms: [
    ...benzenePositions([0, 0, 0], 1.40).map((pos, i) => ({
      id: `rc${i}`, element: 'C', position: pos as [number, number, number]
    })),
    { id: 'n1', element: 'N', position: [3.5, 0, 0] },
    { id: 'o1', element: 'O', position: [4.5, 0.8, 0] },
    { id: 'o2', element: 'O', position: [4.5, -0.8, 0] },
  ],

  bonds: [
    ...Array.from({ length: 6 }, (_, i) => ({
      id: `rc${i}-rc${(i + 1) % 6}`,
      atom1Id: `rc${i}`,
      atom2Id: `rc${(i + 1) % 6}`,
      type: 'single' as const,
    })),
    { id: 'n1-o1', atom1Id: 'n1', atom2Id: 'o1', type: 'double' },
    { id: 'n1-o2', atom1Id: 'n1', atom2Id: 'o2', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { n1: [3.5, 0, 0], o1: [4.5, 0.8, 0], o2: [4.5, -0.8, 0] } },
    { progress: 50, atomPositions: { n1: [1.8, 1.0, 0], o1: [2.8, 1.8, 0], o2: [2.8, 0.2, 0] } },
    { progress: 100, atomPositions: { n1: [1.5, 1.40, 0], o1: [2.5, 2.2, 0], o2: [2.5, 0.6, 0] } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '苯和HNO₃', concepts: ['苯环', '硝酸'], progress: 0 },
    { id: 'step2', name: 'NO₂⁺生成', description: 'HNO₃质子化', concepts: ['亲电试剂'], progress: 50 },
    { id: 'step3', name: '产物生成', description: '生成硝基苯', concepts: ['亲电取代'], progress: 100 },
  ],

  energyProfile: [0, 40, -15],
}

// 燃烧反应数据
export const COMBUSTION: ReactionData = {
  id: 'combustion',
  name: '燃烧反应',
  formula: 'CH₄ + 2O₂ → CO₂ + 2H₂O',
  category: 'oxidation',
  description: '甲烷在氧气中完全燃烧',

  atoms: [
    { id: 'c1', element: 'C', position: [0, 0, 0] },
    { id: 'h1', element: 'H', position: [0.63, 0.63, 0.63] },
    { id: 'h2', element: 'H', position: [-0.63, -0.63, 0.63] },
    { id: 'h3', element: 'H', position: [-0.63, 0.63, -0.63] },
    { id: 'h4', element: 'H', position: [0.63, -0.63, -0.63] },
    { id: 'o1', element: 'O', position: [3, 0, 0] },
    { id: 'o2', element: 'O', position: [4.5, 0, 0] },
  ],

  bonds: [
    { id: 'c1-h1', atom1Id: 'c1', atom2Id: 'h1', type: 'single' },
    { id: 'c1-h2', atom1Id: 'c1', atom2Id: 'h2', type: 'single' },
    { id: 'c1-h3', atom1Id: 'c1', atom2Id: 'h3', type: 'single' },
    { id: 'c1-h4', atom1Id: 'c1', atom2Id: 'h4', type: 'single' },
    { id: 'o1-o2', atom1Id: 'o1', atom2Id: 'o2', type: 'double' },
  ],

  keyframes: [
    { progress: 0, atomPositions: {} },
    { progress: 30, atomPositions: { o1: [1.5, 0, 0], o2: [3.0, 0, 0] } },
    { progress: 60, atomPositions: { o1: [0.5, 0.5, 0], o2: [1.5, -0.5, 0] }, bondOpacities: { 'c1-h1': 0, 'c1-h2': 0, 'c1-h3': 0, 'c1-h4': 0, 'o1-o2': 0 } },
    { progress: 100, atomPositions: { o1: [0.5, 0.5, 0], o2: [1.5, -0.5, 0] } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '甲烷和氧气', concepts: ['sp³杂化'], progress: 0 },
    { id: 'step2', name: 'O₂接近', description: '氧气向甲烷移动', concepts: ['氧化剂'], progress: 30 },
    { id: 'step3', name: '键断裂', description: 'C-H和O=O断裂', concepts: ['键断裂'], progress: 60 },
    { id: 'step4', name: '产物生成', description: '生成CO₂和H₂O', concepts: ['燃烧'], progress: 100 },
  ],

  energyProfile: [0, 80, 50, -800],
}

// 烯烃加卤素反应数据
export const ALKENE_HALOGENATION: ReactionData = {
  id: 'alkene-halogenation',
  name: '烯烃加卤素',
  formula: 'CH₂=CH₂ + Br₂ → CH₂BrCH₂Br',
  category: 'addition',
  description: '乙烯与溴发生加成反应',

  atoms: [
    { id: 'c1', element: 'C', position: [-1.5, 0, 0] },
    { id: 'c2', element: 'C', position: [-0.16, 0, 0] },
    { id: 'h1', element: 'H', position: [-2.04, 0.935, 0] },
    { id: 'h2', element: 'H', position: [-2.04, -0.935, 0] },
    { id: 'h3', element: 'H', position: [0.38, 0.935, 0] },
    { id: 'h4', element: 'H', position: [0.38, -0.935, 0] },
    { id: 'br1', element: 'Br', position: [3, 0.5, 0] },
    { id: 'br2', element: 'Br', position: [5.28, 0.5, 0] },
  ],

  bonds: [
    { id: 'c1-c2', atom1Id: 'c1', atom2Id: 'c2', type: 'double' },
    { id: 'c1-h1', atom1Id: 'c1', atom2Id: 'h1', type: 'single' },
    { id: 'c1-h2', atom1Id: 'c1', atom2Id: 'h2', type: 'single' },
    { id: 'c2-h3', atom1Id: 'c2', atom2Id: 'h3', type: 'single' },
    { id: 'c2-h4', atom1Id: 'c2', atom2Id: 'h4', type: 'single' },
    { id: 'br1-br2', atom1Id: 'br1', atom2Id: 'br2', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { br1: [3, 0.5, 0], br2: [5.28, 0.5, 0] } },
    { progress: 40, atomPositions: { br1: [1.5, 0.5, 0], br2: [3.78, 0.5, 0] } },
    { progress: 70, atomPositions: { br1: [0.5, 0.5, 0], br2: [2.0, 0.5, 0] }, bondOpacities: { 'br1-br2': 0 } },
    { progress: 100, atomPositions: { br1: [-0.5, 0.5, 0], br2: [1.0, 0.5, 0] }, bondOpacities: { 'br1-br2': 0, 'c1-c2': 0.5 } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '乙烯和Br₂', concepts: ['C=C双键'], progress: 0 },
    { id: 'step2', name: 'Br₂接近', description: 'Br₂向乙烯移动', concepts: ['π电子'], progress: 40 },
    { id: 'step3', name: 'Br-Br断裂', description: 'Br-Br键断裂', concepts: ['键断裂'], progress: 70 },
    { id: 'step4', name: '产物生成', description: '生成1,2-二溴乙烷', concepts: ['加成反应'], progress: 100 },
  ],

  energyProfile: [0, 20, 40, -120],
}

// 苯的磺化反应数据
export const BENZENE_SULFONATION: ReactionData = {
  id: 'benzene-sulfonation',
  name: '苯的磺化反应',
  formula: 'C₆H₆ + H₂SO₄ → C₆H₅SO₃H + H₂O',
  category: 'substitution',
  description: '苯与浓硫酸发生磺化反应',

  atoms: [
    ...benzenePositions([0, 0, 0], 1.40).map((pos, i) => ({
      id: `rc${i}`, element: 'C', position: pos as [number, number, number]
    })),
    { id: 's1', element: 'S', position: [3.5, 0, 0] },
    { id: 'o1', element: 'O', position: [4.5, 0.8, 0] },
    { id: 'o2', element: 'O', position: [4.5, -0.8, 0] },
    { id: 'o3', element: 'O', position: [3.5, 1.5, 0] },
  ],

  bonds: [
    ...Array.from({ length: 6 }, (_, i) => ({
      id: `rc${i}-rc${(i + 1) % 6}`,
      atom1Id: `rc${i}`,
      atom2Id: `rc${(i + 1) % 6}`,
      type: 'single' as const,
    })),
    { id: 's1-o1', atom1Id: 's1', atom2Id: 'o1', type: 'double' },
    { id: 's1-o2', atom1Id: 's1', atom2Id: 'o2', type: 'double' },
    { id: 's1-o3', atom1Id: 's1', atom2Id: 'o3', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { s1: [3.5, 0, 0], o1: [4.5, 0.8, 0], o2: [4.5, -0.8, 0], o3: [3.5, 1.5, 0] } },
    { progress: 50, atomPositions: { s1: [1.8, 1.0, 0], o1: [2.8, 1.8, 0], o2: [2.8, 0.2, 0], o3: [1.8, 2.0, 0] } },
    { progress: 100, atomPositions: { s1: [1.5, 1.40, 0], o1: [2.5, 2.2, 0], o2: [2.5, 0.6, 0], o3: [1.5, 2.4, 0] } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '苯和H₂SO₄', concepts: ['苯环', '硫酸'], progress: 0 },
    { id: 'step2', name: 'SO₃生成', description: 'H₂SO₄分解', concepts: ['亲电试剂'], progress: 50 },
    { id: 'step3', name: '产物生成', description: '生成苯磺酸', concepts: ['亲电取代'], progress: 100 },
  ],

  energyProfile: [0, 35, -15],
}

// 银镜反应数据
export const SILVER_MIRROR: ReactionData = {
  id: 'silver-mirror',
  name: '银镜反应',
  formula: 'CH₃CHO + 2Ag(NH₃)₂OH → CH₃COONH₄ + 2Ag↓ + 3NH₃ + H₂O',
  category: 'oxidation',
  description: '乙醛与银氨溶液反应生成银镜',

  atoms: [
    { id: 'c1', element: 'C', position: [-2, 0, 0] },
    { id: 'c2', element: 'C', position: [-0.5, 0, 0] },
    { id: 'o1', element: 'O', position: [-0.5, 1.23, 0] },
    { id: 'h1', element: 'H', position: [-0.5, -1.0, 0] },
    { id: 'ag1', element: 'Ag', position: [3, 0, 0] },
    { id: 'ag2', element: 'Ag', position: [4.5, 0, 0] },
  ],

  bonds: [
    { id: 'c1-c2', atom1Id: 'c1', atom2Id: 'c2', type: 'single' },
    { id: 'c2-o1', atom1Id: 'c2', atom2Id: 'o1', type: 'double' },
    { id: 'c2-h1', atom1Id: 'c2', atom2Id: 'h1', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { ag1: [3, 0, 0], ag2: [4.5, 0, 0] } },
    { progress: 50, atomPositions: { ag1: [1.5, 0.5, 0], ag2: [3.0, 0.5, 0] } },
    { progress: 100, atomPositions: { ag1: [0.5, 0.5, 0], ag2: [1.5, 0.5, 0] } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '乙醛和银氨溶液', concepts: ['醛基', 'Ag⁺'], progress: 0 },
    { id: 'step2', name: 'Ag⁺接近', description: 'Ag⁺向醛基移动', concepts: ['氧化剂'], progress: 50 },
    { id: 'step3', name: '银镜生成', description: '生成银镜', concepts: ['银镜反应'], progress: 100 },
  ],

  energyProfile: [0, 25, -80],
}

// 醛酮加氢反应数据
export const ALDEHYDE_HYDROGENATION: ReactionData = {
  id: 'aldehyde-hydrogenation',
  name: '醛酮加氢',
  formula: 'CH₃CHO + H₂ → CH₃CH₂OH',
  category: 'reduction',
  description: '乙醛与氢气发生加氢还原反应',

  atoms: [
    { id: 'c1', element: 'C', position: [-2, 0, 0] },
    { id: 'c2', element: 'C', position: [-0.5, 0, 0] },
    { id: 'o1', element: 'O', position: [-0.5, 1.23, 0] },
    { id: 'h1', element: 'H', position: [-0.5, -1.0, 0] },
    { id: 'h2', element: 'H', position: [3, 0.5, 0] },
    { id: 'h3', element: 'H', position: [4.09, 0.5, 0] },
  ],

  bonds: [
    { id: 'c1-c2', atom1Id: 'c1', atom2Id: 'c2', type: 'single' },
    { id: 'c2-o1', atom1Id: 'c2', atom2Id: 'o1', type: 'double' },
    { id: 'c2-h1', atom1Id: 'c2', atom2Id: 'h1', type: 'single' },
    { id: 'h2-h3', atom1Id: 'h2', atom2Id: 'h3', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { h2: [3, 0.5, 0], h3: [4.09, 0.5, 0] } },
    { progress: 50, atomPositions: { h2: [1.5, 0.5, 0], h3: [2.5, 0.5, 0] } },
    { progress: 100, atomPositions: { h2: [0, 0.5, 0], h3: [1.0, 0.5, 0] }, bondOpacities: { 'h2-h3': 0, 'c2-o1': 0.5 } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '乙醛和H₂', concepts: ['醛基', 'C=O'], progress: 0 },
    { id: 'step2', name: 'H₂接近', description: 'H₂向醛基移动', concepts: ['还原剂'], progress: 50 },
    { id: 'step3', name: '产物生成', description: '生成乙醇', concepts: ['加氢还原'], progress: 100 },
  ],

  energyProfile: [0, 30, -70],
}

// 炔烃加氢反应数据
export const ALKYNE_HYDROGENATION: ReactionData = {
  id: 'alkyne-hydrogenation',
  name: '炔烃加氢',
  formula: 'HC≡CH + 2H₂ → CH₃CH₃',
  category: 'addition',
  description: '乙炔与氢气发生加成反应',

  atoms: [
    { id: 'c1', element: 'C', position: [-1.5, 0, 0] },
    { id: 'c2', element: 'C', position: [1.5, 0, 0] },
    { id: 'h1', element: 'H', position: [-2.5, 0, 0] },
    { id: 'h2', element: 'H', position: [2.5, 0, 0] },
    { id: 'h3', element: 'H', position: [-3.5, 0.5, 0] },
    { id: 'h4', element: 'H', position: [-3.5, -0.5, 0] },
    { id: 'h5', element: 'H', position: [3.5, 0.5, 0] },
    { id: 'h6', element: 'H', position: [3.5, -0.5, 0] },
  ],

  bonds: [
    { id: 'c1-c2', atom1Id: 'c1', atom2Id: 'c2', type: 'triple' },
    { id: 'c1-h1', atom1Id: 'c1', atom2Id: 'h1', type: 'single' },
    { id: 'c2-h2', atom1Id: 'c2', atom2Id: 'h2', type: 'single' },
    { id: 'h3-h4', atom1Id: 'h3', atom2Id: 'h4', type: 'single' },
    { id: 'h5-h6', atom1Id: 'h5', atom2Id: 'h6', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { h3: [-3.5, 0.5, 0], h4: [-3.5, -0.5, 0], h5: [3.5, 0.5, 0], h6: [3.5, -0.5, 0] } },
    { progress: 30, atomPositions: { h3: [-2.5, 0.5, 0], h4: [-2.5, -0.5, 0], h5: [2.5, 0.5, 0], h6: [2.5, -0.5, 0] } },
    { progress: 60, atomPositions: { h3: [-1.8, 0.3, 0], h4: [-1.8, -0.3, 0], h5: [1.8, 0.3, 0], h6: [1.8, -0.3, 0] }, bondOpacities: { 'h3-h4': 0, 'h5-h6': 0 } },
    { progress: 100, atomPositions: { h3: [-1.5, 0.5, 0], h4: [-1.5, -0.5, 0], h5: [1.5, 0.5, 0], h6: [1.5, -0.5, 0] }, bondOpacities: { 'c1-c2': 0.5 } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '乙炔和H₂', concepts: ['C≡C三键'], progress: 0 },
    { id: 'step2', name: 'H₂接近', description: 'H₂向三键移动', concepts: ['催化剂'], progress: 30 },
    { id: 'step3', name: '第一次加成', description: '三键变双键', concepts: ['加成'], progress: 60 },
    { id: 'step4', name: '第二次加成', description: '双键变单键', concepts: ['加成'], progress: 100 },
  ],

  energyProfile: [0, 20, 30, -200],
}

// 醇→醛催化氧化数据
export const ALCOHOL_OXIDATION: ReactionData = {
  id: 'alcohol-oxidation',
  name: '醇→醛催化氧化',
  formula: '2C₂H₅OH + O₂ → 2CH₃CHO + 2H₂O',
  category: 'oxidation',
  description: '乙醇在铜催化下氧化为乙醛',

  atoms: [
    { id: 'c1', element: 'C', position: [-2, 0, 0] },
    { id: 'c2', element: 'C', position: [-0.5, 0, 0] },
    { id: 'o1', element: 'O', position: [-0.5, 1.43, 0] },
    { id: 'h1', element: 'H', position: [-0.5, 2.39, 0] },
    { id: 'o2', element: 'O', position: [3, 0, 0] },
    { id: 'o3', element: 'O', position: [4.5, 0, 0] },
    { id: 'cu', element: 'Fe', position: [1.5, -1.5, 0] },
  ],

  bonds: [
    { id: 'c1-c2', atom1Id: 'c1', atom2Id: 'c2', type: 'single' },
    { id: 'c2-o1', atom1Id: 'c2', atom2Id: 'o1', type: 'single' },
    { id: 'o1-h1', atom1Id: 'o1', atom2Id: 'h1', type: 'single' },
    { id: 'o2-o3', atom1Id: 'o2', atom2Id: 'o3', type: 'double' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { o2: [3, 0, 0], o3: [4.5, 0, 0] } },
    { progress: 40, atomPositions: { o2: [1.5, 0.5, 0], o3: [3.0, 0.5, 0] } },
    { progress: 70, atomPositions: { o2: [0.5, 0.5, 0], o3: [2.0, 0.5, 0] }, bondOpacities: { 'o2-o3': 0, 'c2-o1': 0, 'o1-h1': 0 } },
    { progress: 100, atomPositions: { o2: [0.5, 0.5, 0], o3: [2.0, 0.5, 0] } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '乙醇和O₂', concepts: ['醇羟基'], progress: 0 },
    { id: 'step2', name: 'O₂接近', description: 'O₂向醇移动', concepts: ['催化剂'], progress: 40 },
    { id: 'step3', name: '氧化反应', description: '醇氧化为醛', concepts: ['催化氧化'], progress: 70 },
    { id: 'step4', name: '产物生成', description: '生成乙醛', concepts: ['氧化反应'], progress: 100 },
  ],

  energyProfile: [0, 30, 50, -150],
}

// 加聚反应数据
export const ADDITION_POLY: ReactionData = {
  id: 'addition-poly',
  name: '加聚反应',
  formula: 'n CH₂=CH₂ → [-CH₂-CH₂-]n',
  category: 'polymerization',
  description: '乙烯发生加聚反应生成聚乙烯',

  atoms: [
    { id: 'c1', element: 'C', position: [-1.5, 0, 0] },
    { id: 'c2', element: 'C', position: [0, 0, 0] },
    { id: 'h1', element: 'H', position: [-2.04, 0.935, 0] },
    { id: 'h2', element: 'H', position: [-2.04, -0.935, 0] },
    { id: 'h3', element: 'H', position: [0.38, 0.935, 0] },
    { id: 'h4', element: 'H', position: [0.38, -0.935, 0] },
    { id: 'c3', element: 'C', position: [3, 0, 0] },
    { id: 'c4', element: 'C', position: [4.5, 0, 0] },
  ],

  bonds: [
    { id: 'c1-c2', atom1Id: 'c1', atom2Id: 'c2', type: 'double' },
    { id: 'c1-h1', atom1Id: 'c1', atom2Id: 'h1', type: 'single' },
    { id: 'c1-h2', atom1Id: 'c1', atom2Id: 'h2', type: 'single' },
    { id: 'c2-h3', atom1Id: 'c2', atom2Id: 'h3', type: 'single' },
    { id: 'c2-h4', atom1Id: 'c2', atom2Id: 'h4', type: 'single' },
    { id: 'c3-c4', atom1Id: 'c3', atom2Id: 'c4', type: 'double' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { c3: [3, 0, 0], c4: [4.5, 0, 0] } },
    { progress: 50, atomPositions: { c3: [1.5, 0, 0], c4: [3.0, 0, 0] } },
    { progress: 100, atomPositions: { c3: [0.5, 0, 0], c4: [2.0, 0, 0] }, bondOpacities: { 'c1-c2': 0.5, 'c3-c4': 0.5 } },
  ],

  steps: [
    { id: 'step1', name: '单体就位', description: '乙烯分子', concepts: ['C=C双键'], progress: 0 },
    { id: 'step2', name: '双键打开', description: 'π键断裂', concepts: ['引发'], progress: 50 },
    { id: 'step3', name: '链增长', description: '形成高分子', concepts: ['加聚'], progress: 100 },
  ],

  energyProfile: [0, 30, -100],
}

// 卤代烃水解反应数据
export const HALOALKANE_HYDROLYSIS: ReactionData = {
  id: 'haloalkane-hydrolysis',
  name: '卤代烃水解',
  formula: 'C₂H₅Br + NaOH → C₂H₅OH + NaBr',
  category: 'substitution',
  description: '溴乙烷与氢氧化钠发生水解反应',

  atoms: [
    { id: 'c1', element: 'C', position: [-2, 0, 0] },
    { id: 'c2', element: 'C', position: [-0.5, 0, 0] },
    { id: 'br', element: 'Br', position: [-0.5, 1.94, 0] },
    { id: 'na', element: 'Na', position: [3, 0, 0] },
    { id: 'o', element: 'O', position: [4.5, 0, 0] },
    { id: 'h', element: 'H', position: [5.5, 0, 0] },
  ],

  bonds: [
    { id: 'c1-c2', atom1Id: 'c1', atom2Id: 'c2', type: 'single' },
    { id: 'c2-br', atom1Id: 'c2', atom2Id: 'br', type: 'single' },
    { id: 'o-h', atom1Id: 'o', atom2Id: 'h', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { na: [3, 0, 0], o: [4.5, 0, 0], h: [5.5, 0, 0] } },
    { progress: 50, atomPositions: { na: [1.5, 0.5, 0], o: [2.5, 0.5, 0], h: [3.5, 0.5, 0] } },
    { progress: 100, atomPositions: { na: [0.5, 1.5, 0], o: [0, 1.0, 0], h: [4.0, 2.0, 0] }, bondOpacities: { 'c2-br': 0 } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '溴乙烷和NaOH', concepts: ['卤代烃'], progress: 0 },
    { id: 'step2', name: 'OH⁻接近', description: 'OH⁻向碳原子移动', concepts: ['亲核试剂'], progress: 50 },
    { id: 'step3', name: '取代反应', description: 'Br被OH取代', concepts: ['SN2'], progress: 100 },
  ],

  energyProfile: [0, 25, -30],
}

// 苯酚与FeCl₃显色反应数据
export const PHENOL_FECL3: ReactionData = {
  id: 'phenol-fecl3',
  name: '苯酚+FeCl₃',
  formula: 'C₆H₅OH + FeCl₃ → 紫色络合物',
  category: 'special',
  description: '苯酚与三氯化铁发生显色反应',

  atoms: [
    ...benzenePositions([0, 0, 0], 1.40).map((pos, i) => ({
      id: `rc${i}`, element: 'C', position: pos as [number, number, number]
    })),
    { id: 'o', element: 'O', position: [0, 2.5, 0] },
    { id: 'h', element: 'H', position: [0, 3.5, 0] },
    { id: 'fe', element: 'Fe', position: [4, 0, 0] },
  ],

  bonds: [
    ...Array.from({ length: 6 }, (_, i) => ({
      id: `rc${i}-rc${(i + 1) % 6}`,
      atom1Id: `rc${i}`,
      atom2Id: `rc${(i + 1) % 6}`,
      type: 'single' as const,
    })),
    { id: 'rc0-o', atom1Id: 'rc0', atom2Id: 'o', type: 'single' },
    { id: 'o-h', atom1Id: 'o', atom2Id: 'h', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { fe: [4, 0, 0] } },
    { progress: 50, atomPositions: { fe: [2, 0, 0] } },
    { progress: 100, atomPositions: { fe: [1.5, 0.5, 0] } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '苯酚和FeCl₃', concepts: ['苯酚', 'Fe³⁺'], progress: 0 },
    { id: 'step2', name: 'Fe³⁺接近', description: 'Fe³⁺向苯酚移动', concepts: ['络合'], progress: 50 },
    { id: 'step3', name: '显色反应', description: '生成紫色络合物', concepts: ['显色'], progress: 100 },
  ],

  energyProfile: [0, 10, -5],
}

// 苯环加氢反应数据
export const BENZENE_HYDROGENATION: ReactionData = {
  id: 'benzene-hydrogenation',
  name: '苯环加氢',
  formula: 'C₆H₆ + 3H₂ → C₆H₁₂',
  category: 'addition',
  description: '苯与氢气发生加成反应生成环己烷',

  atoms: [
    ...benzenePositions([0, 0, 0], 1.40).map((pos, i) => ({
      id: `rc${i}`, element: 'C', position: pos as [number, number, number]
    })),
    { id: 'h1', element: 'H', position: [3, 0.5, 0] },
    { id: 'h2', element: 'H', position: [4.09, 0.5, 0] },
    { id: 'h3', element: 'H', position: [3, -0.5, 0] },
    { id: 'h4', element: 'H', position: [4.09, -0.5, 0] },
    { id: 'h5', element: 'H', position: [3, 0, 0.5] },
    { id: 'h6', element: 'H', position: [4.09, 0, 0.5] },
  ],

  bonds: [
    ...Array.from({ length: 6 }, (_, i) => ({
      id: `rc${i}-rc${(i + 1) % 6}`,
      atom1Id: `rc${i}`,
      atom2Id: `rc${(i + 1) % 6}`,
      type: 'single' as const,
    })),
    { id: 'h1-h2', atom1Id: 'h1', atom2Id: 'h2', type: 'single' },
    { id: 'h3-h4', atom1Id: 'h3', atom2Id: 'h4', type: 'single' },
    { id: 'h5-h6', atom1Id: 'h5', atom2Id: 'h6', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { h1: [3, 0.5, 0], h2: [4.09, 0.5, 0], h3: [3, -0.5, 0], h4: [4.09, -0.5, 0], h5: [3, 0, 0.5], h6: [4.09, 0, 0.5] } },
    { progress: 50, atomPositions: { h1: [1.5, 0.5, 0], h2: [2.5, 0.5, 0], h3: [1.5, -0.5, 0], h4: [2.5, -0.5, 0], h5: [1.5, 0, 0.5], h6: [2.5, 0, 0.5] } },
    { progress: 100, atomPositions: { h1: [0.5, 0.5, 0], h2: [1.0, 0.5, 0], h3: [0.5, -0.5, 0], h4: [1.0, -0.5, 0], h5: [0.5, 0, 0.5], h6: [1.0, 0, 0.5] } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '苯和H₂', concepts: ['苯环', '芳香性'], progress: 0 },
    { id: 'step2', name: 'H₂接近', description: 'H₂向苯环移动', concepts: ['催化剂'], progress: 50 },
    { id: 'step3', name: '产物生成', description: '生成环己烷', concepts: ['加成反应'], progress: 100 },
  ],

  energyProfile: [0, 50, -200],
}

// 醛→酸催化氧化数据
export const ALDEHYDE_OXIDATION: ReactionData = {
  id: 'aldehyde-oxidation',
  name: '醛→酸催化氧化',
  formula: '2CH₃CHO + O₂ → 2CH₃COOH',
  category: 'oxidation',
  description: '乙醛氧化为乙酸',

  atoms: [
    { id: 'c1', element: 'C', position: [-2, 0, 0] },
    { id: 'c2', element: 'C', position: [-0.5, 0, 0] },
    { id: 'o1', element: 'O', position: [-0.5, 1.23, 0] },
    { id: 'h1', element: 'H', position: [-0.5, -1.0, 0] },
    { id: 'o2', element: 'O', position: [3, 0, 0] },
    { id: 'o3', element: 'O', position: [4.5, 0, 0] },
  ],

  bonds: [
    { id: 'c1-c2', atom1Id: 'c1', atom2Id: 'c2', type: 'single' },
    { id: 'c2-o1', atom1Id: 'c2', atom2Id: 'o1', type: 'double' },
    { id: 'c2-h1', atom1Id: 'c2', atom2Id: 'h1', type: 'single' },
    { id: 'o2-o3', atom1Id: 'o2', atom2Id: 'o3', type: 'double' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { o2: [3, 0, 0], o3: [4.5, 0, 0] } },
    { progress: 50, atomPositions: { o2: [1.5, 0.5, 0], o3: [2.5, 0.5, 0] } },
    { progress: 100, atomPositions: { o2: [0.5, 0.5, 0], o3: [1.5, 0.5, 0] } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '乙醛和O₂', concepts: ['醛基'], progress: 0 },
    { id: 'step2', name: 'O₂接近', description: 'O₂向醛基移动', concepts: ['氧化剂'], progress: 50 },
    { id: 'step3', name: '产物生成', description: '生成乙酸', concepts: ['氧化反应'], progress: 100 },
  ],

  energyProfile: [0, 30, -300],
}

// 苯酚与溴水反应数据
export const PHENOL_BROMINE: ReactionData = {
  id: 'phenol-bromine',
  name: '苯酚+溴水',
  formula: 'C₆H₅OH + 3Br₂ → C₆H₂Br₃OH↓ + 3HBr',
  category: 'substitution',
  description: '苯酚与溴水反应生成三溴苯酚沉淀',

  atoms: [
    ...benzenePositions([0, 0, 0], 1.40).map((pos, i) => ({
      id: `rc${i}`, element: 'C', position: pos as [number, number, number]
    })),
    { id: 'o', element: 'O', position: [0, 2.5, 0] },
    { id: 'h', element: 'H', position: [0, 3.5, 0] },
    { id: 'br1', element: 'Br', position: [3.5, 0, 0] },
    { id: 'br2', element: 'Br', position: [3.5, 1.5, 0] },
    { id: 'br3', element: 'Br', position: [3.5, -1.5, 0] },
  ],

  bonds: [
    ...Array.from({ length: 6 }, (_, i) => ({
      id: `rc${i}-rc${(i + 1) % 6}`,
      atom1Id: `rc${i}`,
      atom2Id: `rc${(i + 1) % 6}`,
      type: 'single' as const,
    })),
    { id: 'rc0-o', atom1Id: 'rc0', atom2Id: 'o', type: 'single' },
    { id: 'o-h', atom1Id: 'o', atom2Id: 'h', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { br1: [3.5, 0, 0], br2: [3.5, 1.5, 0], br3: [3.5, -1.5, 0] } },
    { progress: 50, atomPositions: { br1: [1.5, 0, 0], br2: [1.5, 1.0, 0], br3: [1.5, -1.0, 0] } },
    { progress: 100, atomPositions: { br1: [1.2, 0, 0], br2: [1.2, 1.0, 0], br3: [1.2, -1.0, 0] } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '苯酚和溴水', concepts: ['苯酚', 'Br₂'], progress: 0 },
    { id: 'step2', name: 'Br₂接近', description: 'Br₂向苯酚移动', concepts: ['亲电取代'], progress: 50 },
    { id: 'step3', name: '产物生成', description: '生成三溴苯酚', concepts: ['取代反应'], progress: 100 },
  ],

  energyProfile: [0, 20, -40],
}

// 乙酸与NaOH反应数据
export const ACETIC_NAOH: ReactionData = {
  id: 'acetic-naoh',
  name: '乙酸+NaOH',
  formula: 'CH₃COOH + NaOH → CH₃COONa + H₂O',
  category: 'special',
  description: '乙酸与氢氧化钠发生中和反应',

  atoms: [
    { id: 'c1', element: 'C', position: [-2, 0, 0] },
    { id: 'c2', element: 'C', position: [-0.5, 0, 0] },
    { id: 'o1', element: 'O', position: [-0.5, 1.23, 0] },
    { id: 'o2', element: 'O', position: [-0.5, -1.43, 0] },
    { id: 'h1', element: 'H', position: [-0.5, -2.39, 0] },
    { id: 'na', element: 'Na', position: [3, 0, 0] },
    { id: 'o3', element: 'O', position: [4.5, 0, 0] },
    { id: 'h2', element: 'H', position: [5.5, 0, 0] },
  ],

  bonds: [
    { id: 'c1-c2', atom1Id: 'c1', atom2Id: 'c2', type: 'single' },
    { id: 'c2-o1', atom1Id: 'c2', atom2Id: 'o1', type: 'double' },
    { id: 'c2-o2', atom1Id: 'c2', atom2Id: 'o2', type: 'single' },
    { id: 'o2-h1', atom1Id: 'o2', atom2Id: 'h1', type: 'single' },
    { id: 'o3-h2', atom1Id: 'o3', atom2Id: 'h2', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { na: [3, 0, 0], o3: [4.5, 0, 0], h2: [5.5, 0, 0] } },
    { progress: 50, atomPositions: { na: [1.5, 0, 0], o3: [2.5, 0, 0], h2: [3.5, 0, 0] } },
    { progress: 100, atomPositions: { na: [0.5, -1.5, 0], o3: [1.5, -1.5, 0], h2: [2.5, -1.5, 0] } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '乙酸和NaOH', concepts: ['羧酸', '碱'], progress: 0 },
    { id: 'step2', name: 'OH⁻接近', description: 'OH⁻向羧基移动', concepts: ['中和'], progress: 50 },
    { id: 'step3', name: '产物生成', description: '生成乙酸钠', concepts: ['中和反应'], progress: 100 },
  ],

  energyProfile: [0, 10, -55],
}

// 苯酚+NaOH反应数据
export const PHENOL_NAOH: ReactionData = {
  id: 'phenol-naoh',
  name: '苯酚+NaOH',
  formula: 'C₆H₅OH + NaOH → C₆H₅ONa + H₂O',
  category: 'special',
  description: '苯酚与氢氧化钠反应',

  atoms: [
    ...benzenePositions([0, 0, 0], 1.40).map((pos, i) => ({
      id: `rc${i}`, element: 'C', position: pos as [number, number, number]
    })),
    { id: 'o', element: 'O', position: [0, 2.5, 0] },
    { id: 'h', element: 'H', position: [0, 3.5, 0] },
    { id: 'na', element: 'Na', position: [3.5, 0, 0] },
    { id: 'o2', element: 'O', position: [5.0, 0, 0] },
    { id: 'h2', element: 'H', position: [6.0, 0, 0] },
  ],

  bonds: [
    ...Array.from({ length: 6 }, (_, i) => ({
      id: `rc${i}-rc${(i + 1) % 6}`,
      atom1Id: `rc${i}`,
      atom2Id: `rc${(i + 1) % 6}`,
      type: 'single' as const,
    })),
    { id: 'rc0-o', atom1Id: 'rc0', atom2Id: 'o', type: 'single' },
    { id: 'o-h', atom1Id: 'o', atom2Id: 'h', type: 'single' },
    { id: 'o2-h2', atom1Id: 'o2', atom2Id: 'h2', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { na: [3.5, 0, 0], o2: [5.0, 0, 0], h2: [6.0, 0, 0] } },
    { progress: 50, atomPositions: { na: [1.5, 0, 0], o2: [2.5, 0, 0], h2: [3.5, 0, 0] } },
    { progress: 100, atomPositions: { na: [0.8, 2.0, 0], o2: [2.0, 2.0, 0], h2: [3.0, 2.0, 0] } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '苯酚和NaOH', concepts: ['苯酚', '碱'], progress: 0 },
    { id: 'step2', name: 'OH⁻接近', description: 'OH⁻向苯酚移动', concepts: ['中和'], progress: 50 },
    { id: 'step3', name: '产物生成', description: '生成苯酚钠', concepts: ['中和反应'], progress: 100 },
  ],

  energyProfile: [0, 10, -30],
}

// 苯酚+Na₂CO₃反应数据
export const PHENOL_NA2CO3: ReactionData = {
  id: 'phenol-na2co3',
  name: '苯酚+Na₂CO₃',
  formula: 'C₆H₅OH + Na₂CO₃ → C₆H₅ONa + NaHCO₃',
  category: 'special',
  description: '苯酚与碳酸钠反应',

  atoms: [
    ...benzenePositions([0, 0, 0], 1.40).map((pos, i) => ({
      id: `rc${i}`, element: 'C', position: pos as [number, number, number]
    })),
    { id: 'o', element: 'O', position: [0, 2.5, 0] },
    { id: 'h', element: 'H', position: [0, 3.5, 0] },
    { id: 'na1', element: 'Na', position: [3.5, 0, 0] },
    { id: 'c', element: 'C', position: [5.0, 0, 0] },
    { id: 'o1', element: 'O', position: [5.0, 1.23, 0] },
    { id: 'o2', element: 'O', position: [5.0, -1.23, 0] },
    { id: 'o3', element: 'O', position: [6.5, 0, 0] },
    { id: 'na2', element: 'Na', position: [8.0, 0, 0] },
  ],

  bonds: [
    ...Array.from({ length: 6 }, (_, i) => ({
      id: `rc${i}-rc${(i + 1) % 6}`,
      atom1Id: `rc${i}`,
      atom2Id: `rc${(i + 1) % 6}`,
      type: 'single' as const,
    })),
    { id: 'rc0-o', atom1Id: 'rc0', atom2Id: 'o', type: 'single' },
    { id: 'o-h', atom1Id: 'o', atom2Id: 'h', type: 'single' },
    { id: 'c-o1', atom1Id: 'c', atom2Id: 'o1', type: 'double' },
    { id: 'c-o2', atom1Id: 'c', atom2Id: 'o2', type: 'single' },
    { id: 'c-o3', atom1Id: 'c', atom2Id: 'o3', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { na1: [3.5, 0, 0], c: [5.0, 0, 0], o1: [5.0, 1.23, 0], o2: [5.0, -1.23, 0], o3: [6.5, 0, 0], na2: [8.0, 0, 0] } },
    { progress: 50, atomPositions: { na1: [1.5, 0, 0], c: [3.0, 0, 0], o1: [3.0, 1.23, 0], o2: [3.0, -1.23, 0], o3: [4.5, 0, 0], na2: [6.0, 0, 0] } },
    { progress: 100, atomPositions: { na1: [0.8, 2.0, 0], c: [2.0, 2.0, 0], o1: [2.0, 3.23, 0], o2: [2.0, 0.77, 0], o3: [3.5, 2.0, 0], na2: [5.0, 2.0, 0] } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '苯酚和Na₂CO₃', concepts: ['苯酚', '碳酸钠'], progress: 0 },
    { id: 'step2', name: 'CO₃²⁻接近', description: 'CO₃²⁻向苯酚移动', concepts: ['弱酸'], progress: 50 },
    { id: 'step3', name: '产物生成', description: '生成苯酚钠和NaHCO₃', concepts: ['酸性比较'], progress: 100 },
  ],

  energyProfile: [0, 10, -10],
}

// 蛋白质+浓硝酸反应数据
export const PROTEIN_HNO3: ReactionData = {
  id: 'protein-hno3',
  name: '蛋白质+浓硝酸',
  formula: '蛋白质 + 浓HNO₃ → 黄色',
  category: 'special',
  description: '蛋白质与浓硝酸发生显色反应',

  atoms: [
    { id: 'n', element: 'N', position: [0, 0, 0] },
    { id: 'h1', element: 'H', position: [0.5, 0.866, 0] },
    { id: 'h2', element: 'H', position: [-0.5, 0.866, 0] },
    { id: 'h3', element: 'H', position: [0, -1, 0] },
    { id: 'c', element: 'C', position: [2, 0, 0] },
    { id: 'o', element: 'O', position: [3.23, 0, 0] },
    { id: 'n2', element: 'N', position: [5, 0, 0] },
    { id: 'o1', element: 'O', position: [6.0, 0.8, 0] },
    { id: 'o2', element: 'O', position: [6.0, -0.8, 0] },
  ],

  bonds: [
    { id: 'n-h1', atom1Id: 'n', atom2Id: 'h1', type: 'single' },
    { id: 'n-h2', atom1Id: 'n', atom2Id: 'h2', type: 'single' },
    { id: 'n-h3', atom1Id: 'n', atom2Id: 'h3', type: 'single' },
    { id: 'n-c', atom1Id: 'n', atom2Id: 'c', type: 'single' },
    { id: 'c-o', atom1Id: 'c', atom2Id: 'o', type: 'double' },
    { id: 'n2-o1', atom1Id: 'n2', atom2Id: 'o1', type: 'double' },
    { id: 'n2-o2', atom1Id: 'n2', atom2Id: 'o2', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { n2: [5, 0, 0], o1: [6.0, 0.8, 0], o2: [6.0, -0.8, 0] } },
    { progress: 50, atomPositions: { n2: [2.5, 0.5, 0], o1: [3.5, 1.3, 0], o2: [3.5, -0.3, 0] } },
    { progress: 100, atomPositions: { n2: [1.5, 0.5, 0], o1: [2.5, 1.3, 0], o2: [2.5, -0.3, 0] } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '蛋白质和浓HNO₃', concepts: ['蛋白质', '硝酸'], progress: 0 },
    { id: 'step2', name: 'HNO₃接近', description: 'HNO₃向蛋白质移动', concepts: ['硝化'], progress: 50 },
    { id: 'step3', name: '显色反应', description: '生成黄色物质', concepts: ['黄蛋白反应'], progress: 100 },
  ],

  energyProfile: [0, 10, -5],
}

// 烯烃加卤化氢反应数据
export const ALKENE_HX: ReactionData = {
  id: 'alkene-hx',
  name: '烯烃加卤化氢',
  formula: 'CH₂=CH₂ + HBr → CH₃CH₂Br',
  category: 'addition',
  description: '乙烯与溴化氢发生加成反应',

  atoms: [
    { id: 'c1', element: 'C', position: [-1.5, 0, 0] },
    { id: 'c2', element: 'C', position: [-0.16, 0, 0] },
    { id: 'h1', element: 'H', position: [-2.04, 0.935, 0] },
    { id: 'h2', element: 'H', position: [-2.04, -0.935, 0] },
    { id: 'h3', element: 'H', position: [0.38, 0.935, 0] },
    { id: 'h4', element: 'H', position: [0.38, -0.935, 0] },
    { id: 'h5', element: 'H', position: [3, 0.5, 0] },
    { id: 'br', element: 'Br', position: [4.5, 0.5, 0] },
  ],

  bonds: [
    { id: 'c1-c2', atom1Id: 'c1', atom2Id: 'c2', type: 'double' },
    { id: 'c1-h1', atom1Id: 'c1', atom2Id: 'h1', type: 'single' },
    { id: 'c1-h2', atom1Id: 'c1', atom2Id: 'h2', type: 'single' },
    { id: 'c2-h3', atom1Id: 'c2', atom2Id: 'h3', type: 'single' },
    { id: 'c2-h4', atom1Id: 'c2', atom2Id: 'h4', type: 'single' },
    { id: 'h5-br', atom1Id: 'h5', atom2Id: 'br', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { h5: [3, 0.5, 0], br: [4.5, 0.5, 0] } },
    { progress: 50, atomPositions: { h5: [1.5, 0.5, 0], br: [3.0, 0.5, 0] } },
    { progress: 100, atomPositions: { h5: [0.5, 0.5, 0], br: [1.5, 0.5, 0] } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '乙烯和HBr', concepts: ['C=C双键'], progress: 0 },
    { id: 'step2', name: 'HBr接近', description: 'HBr向乙烯移动', concepts: ['亲电加成'], progress: 50 },
    { id: 'step3', name: '产物生成', description: '生成溴乙烷', concepts: ['Markovnikov规则'], progress: 100 },
  ],

  energyProfile: [0, 20, -70],
}

// 炔烃加溴(1:1)反应数据
export const ALKYNE_BR: ReactionData = {
  id: 'alkyne-br',
  name: '炔烃加溴(1:1)',
  formula: 'HC≡CH + Br₂ → CHBr=CHBr',
  category: 'addition',
  description: '乙炔与溴发生1:1加成反应',

  atoms: [
    { id: 'c1', element: 'C', position: [-1.5, 0, 0] },
    { id: 'c2', element: 'C', position: [1.5, 0, 0] },
    { id: 'h1', element: 'H', position: [-2.5, 0, 0] },
    { id: 'h2', element: 'H', position: [2.5, 0, 0] },
    { id: 'br1', element: 'Br', position: [4, 0.5, 0] },
    { id: 'br2', element: 'Br', position: [5.5, 0.5, 0] },
  ],

  bonds: [
    { id: 'c1-c2', atom1Id: 'c1', atom2Id: 'c2', type: 'triple' },
    { id: 'c1-h1', atom1Id: 'c1', atom2Id: 'h1', type: 'single' },
    { id: 'c2-h2', atom1Id: 'c2', atom2Id: 'h2', type: 'single' },
    { id: 'br1-br2', atom1Id: 'br1', atom2Id: 'br2', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { br1: [4, 0.5, 0], br2: [5.5, 0.5, 0] } },
    { progress: 50, atomPositions: { br1: [2, 0.5, 0], br2: [3.5, 0.5, 0] } },
    { progress: 100, atomPositions: { br1: [0.5, 0.5, 0], br2: [2.0, 0.5, 0] }, bondOpacities: { 'br1-br2': 0, 'c1-c2': 0.5 } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '乙炔和Br₂', concepts: ['C≡C三键'], progress: 0 },
    { id: 'step2', name: 'Br₂接近', description: 'Br₂向三键移动', concepts: ['亲电加成'], progress: 50 },
    { id: 'step3', name: '产物生成', description: '生成1,2-二溴乙烯', concepts: ['加成反应'], progress: 100 },
  ],

  energyProfile: [0, 20, -100],
}

// 硝基苯还原反应数据
export const NITROBENZENE_REDUCTION: ReactionData = {
  id: 'nitrobenzene-reduction',
  name: '硝基苯还原',
  formula: 'C₆H₅NO₂ + 3H₂ → C₆H₅NH₂ + 2H₂O',
  category: 'reduction',
  description: '硝基苯还原为苯胺',

  atoms: [
    ...benzenePositions([0, 0, 0], 1.40).map((pos, i) => ({
      id: `rc${i}`, element: 'C', position: pos as [number, number, number]
    })),
    { id: 'n', element: 'N', position: [0, 2.5, 0] },
    { id: 'o1', element: 'O', position: [-1.0, 3.0, 0] },
    { id: 'o2', element: 'O', position: [1.0, 3.0, 0] },
    { id: 'h1', element: 'H', position: [3.5, 0.5, 0] },
    { id: 'h2', element: 'H', position: [4.5, 0.5, 0] },
    { id: 'h3', element: 'H', position: [3.5, -0.5, 0] },
  ],

  bonds: [
    ...Array.from({ length: 6 }, (_, i) => ({
      id: `rc${i}-rc${(i + 1) % 6}`,
      atom1Id: `rc${i}`,
      atom2Id: `rc${(i + 1) % 6}`,
      type: 'single' as const,
    })),
    { id: 'rc0-n', atom1Id: 'rc0', atom2Id: 'n', type: 'single' },
    { id: 'n-o1', atom1Id: 'n', atom2Id: 'o1', type: 'double' },
    { id: 'n-o2', atom1Id: 'n', atom2Id: 'o2', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { h1: [3.5, 0.5, 0], h2: [4.5, 0.5, 0], h3: [3.5, -0.5, 0] } },
    { progress: 50, atomPositions: { h1: [1.5, 0.5, 0], h2: [2.5, 0.5, 0], h3: [1.5, -0.5, 0] } },
    { progress: 100, atomPositions: { h1: [0.5, 2.5, 0], h2: [1.5, 2.5, 0], h3: [0.5, 3.5, 0] }, bondOpacities: { 'n-o1': 0, 'n-o2': 0 } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '硝基苯和H₂', concepts: ['硝基', '还原'], progress: 0 },
    { id: 'step2', name: 'H₂接近', description: 'H₂向硝基移动', concepts: ['还原剂'], progress: 50 },
    { id: 'step3', name: '产物生成', description: '生成苯胺', concepts: ['还原反应'], progress: 100 },
  ],

  energyProfile: [0, 40, -200],
}

// 炔烃加溴(1:2)反应数据
export const ALKYNE_BR2: ReactionData = {
  id: 'alkyne-br2',
  name: '炔烃加溴(1:2)',
  formula: 'HC≡CH + 2Br₂ → CHBr₂-CHBr₂',
  category: 'addition',
  description: '乙炔与过量溴发生两次加成反应',

  atoms: [
    { id: 'c1', element: 'C', position: [-1.5, 0, 0] },
    { id: 'c2', element: 'C', position: [1.5, 0, 0] },
    { id: 'h1', element: 'H', position: [-2.5, 0, 0] },
    { id: 'h2', element: 'H', position: [2.5, 0, 0] },
    { id: 'br1', element: 'Br', position: [4, 0.5, 0] },
    { id: 'br2', element: 'Br', position: [5.5, 0.5, 0] },
    { id: 'br3', element: 'Br', position: [4, -0.5, 0] },
    { id: 'br4', element: 'Br', position: [5.5, -0.5, 0] },
  ],

  bonds: [
    { id: 'c1-c2', atom1Id: 'c1', atom2Id: 'c2', type: 'triple' },
    { id: 'c1-h1', atom1Id: 'c1', atom2Id: 'h1', type: 'single' },
    { id: 'c2-h2', atom1Id: 'c2', atom2Id: 'h2', type: 'single' },
    { id: 'br1-br2', atom1Id: 'br1', atom2Id: 'br2', type: 'single' },
    { id: 'br3-br4', atom1Id: 'br3', atom2Id: 'br4', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { br1: [4, 0.5, 0], br2: [5.5, 0.5, 0], br3: [4, -0.5, 0], br4: [5.5, -0.5, 0] } },
    { progress: 30, atomPositions: { br1: [2.5, 0.5, 0], br2: [4.0, 0.5, 0], br3: [2.5, -0.5, 0], br4: [4.0, -0.5, 0] } },
    { progress: 60, atomPositions: { br1: [1.0, 0.5, 0], br2: [2.5, 0.5, 0], br3: [1.0, -0.5, 0], br4: [2.5, -0.5, 0] }, bondOpacities: { 'br1-br2': 0, 'br3-br4': 0, 'c1-c2': 0.5 } },
    { progress: 100, atomPositions: { br1: [0.5, 0.5, 0], br2: [1.5, 0.5, 0], br3: [0.5, -0.5, 0], br4: [1.5, -0.5, 0] }, bondOpacities: { 'c1-c2': 0 } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '乙炔和2Br₂', concepts: ['C≡C三键'], progress: 0 },
    { id: 'step2', name: '第一次加成', description: '三键变双键', concepts: ['加成'], progress: 30 },
    { id: 'step3', name: '第二次加成', description: '双键变单键', concepts: ['加成'], progress: 60 },
    { id: 'step4', name: '产物生成', description: '生成四溴乙烷', concepts: ['完全加成'], progress: 100 },
  ],

  energyProfile: [0, 20, 30, -190],
}

// 酯的水解反应数据
export const ESTER_HYDROLYSIS: ReactionData = {
  id: 'ester-hydrolysis',
  name: '酯的水解',
  formula: 'CH₃COOC₂H₅ + H₂O → CH₃COOH + C₂H₅OH',
  category: 'substitution',
  description: '乙酸乙酯水解为乙酸和乙醇',

  atoms: [
    { id: 'c1', element: 'C', position: [-2, 0, 0] },
    { id: 'c2', element: 'C', position: [-0.5, 0, 0] },
    { id: 'o1', element: 'O', position: [-0.5, 1.23, 0] },
    { id: 'o2', element: 'O', position: [-0.5, -1.43, 0] },
    { id: 'c3', element: 'C', position: [1.5, 0, 0] },
    { id: 'c4', element: 'C', position: [3.0, 0, 0] },
    { id: 'h1', element: 'H', position: [4.5, 0.5, 0] },
    { id: 'o3', element: 'O', position: [5.5, 0.5, 0] },
    { id: 'h2', element: 'H', position: [6.5, 0.5, 0] },
  ],

  bonds: [
    { id: 'c1-c2', atom1Id: 'c1', atom2Id: 'c2', type: 'single' },
    { id: 'c2-o1', atom1Id: 'c2', atom2Id: 'o1', type: 'double' },
    { id: 'c2-o2', atom1Id: 'c2', atom2Id: 'o2', type: 'single' },
    { id: 'o2-c3', atom1Id: 'o2', atom2Id: 'c3', type: 'single' },
    { id: 'c3-c4', atom1Id: 'c3', atom2Id: 'c4', type: 'single' },
    { id: 'o3-h2', atom1Id: 'o3', atom2Id: 'h2', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { h1: [4.5, 0.5, 0], o3: [5.5, 0.5, 0], h2: [6.5, 0.5, 0] } },
    { progress: 50, atomPositions: { h1: [2.5, 0.5, 0], o3: [3.5, 0.5, 0], h2: [4.5, 0.5, 0] } },
    { progress: 100, atomPositions: { h1: [1.0, 0.5, 0], o3: [2.0, 0.5, 0], h2: [3.0, 0.5, 0] }, bondOpacities: { 'o2-c3': 0 } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '乙酸乙酯和H₂O', concepts: ['酯', '水'], progress: 0 },
    { id: 'step2', name: 'H₂O接近', description: 'H₂O向酯移动', concepts: ['水解'], progress: 50 },
    { id: 'step3', name: '产物生成', description: '生成乙酸和乙醇', concepts: ['水解反应'], progress: 100 },
  ],

  energyProfile: [0, 15, -5],
}

// 使冷稀KMnO₄褪色反应数据
export const KMNO4_DECOLORIZATION: ReactionData = {
  id: 'kmno4-decolorization',
  name: 'KMnO₄褪色',
  formula: '烯烃 + KMnO₄ → 褪色',
  category: 'oxidation',
  description: '烯烃使酸性高锰酸钾溶液褪色',

  atoms: [
    { id: 'c1', element: 'C', position: [-1.5, 0, 0] },
    { id: 'c2', element: 'C', position: [-0.16, 0, 0] },
    { id: 'h1', element: 'H', position: [-2.04, 0.935, 0] },
    { id: 'h2', element: 'H', position: [-2.04, -0.935, 0] },
    { id: 'h3', element: 'H', position: [0.38, 0.935, 0] },
    { id: 'h4', element: 'H', position: [0.38, -0.935, 0] },
    { id: 'mn', element: 'Fe', position: [3.5, 0, 0] },
    { id: 'o1', element: 'O', position: [4.5, 0.8, 0] },
    { id: 'o2', element: 'O', position: [4.5, -0.8, 0] },
    { id: 'o3', element: 'O', position: [3.5, 1.5, 0] },
    { id: 'o4', element: 'O', position: [3.5, -1.5, 0] },
  ],

  bonds: [
    { id: 'c1-c2', atom1Id: 'c1', atom2Id: 'c2', type: 'double' },
    { id: 'c1-h1', atom1Id: 'c1', atom2Id: 'h1', type: 'single' },
    { id: 'c1-h2', atom1Id: 'c1', atom2Id: 'h2', type: 'single' },
    { id: 'c2-h3', atom1Id: 'c2', atom2Id: 'h3', type: 'single' },
    { id: 'c2-h4', atom1Id: 'c2', atom2Id: 'h4', type: 'single' },
    { id: 'mn-o1', atom1Id: 'mn', atom2Id: 'o1', type: 'double' },
    { id: 'mn-o2', atom1Id: 'mn', atom2Id: 'o2', type: 'double' },
    { id: 'mn-o3', atom1Id: 'mn', atom2Id: 'o3', type: 'single' },
    { id: 'mn-o4', atom1Id: 'mn', atom2Id: 'o4', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { mn: [3.5, 0, 0], o1: [4.5, 0.8, 0], o2: [4.5, -0.8, 0], o3: [3.5, 1.5, 0], o4: [3.5, -1.5, 0] } },
    { progress: 50, atomPositions: { mn: [1.5, 0, 0], o1: [2.5, 0.8, 0], o2: [2.5, -0.8, 0], o3: [1.5, 1.5, 0], o4: [1.5, -1.5, 0] } },
    { progress: 100, atomPositions: { mn: [0.5, 0, 0], o1: [1.5, 0.8, 0], o2: [1.5, -0.8, 0], o3: [0.5, 1.5, 0], o4: [0.5, -1.5, 0] } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '烯烃和KMnO₄', concepts: ['C=C双键', 'MnO₄⁻'], progress: 0 },
    { id: 'step2', name: 'KMnO₄接近', description: 'MnO₄⁻向烯烃移动', concepts: ['氧化剂'], progress: 50 },
    { id: 'step3', name: '褪色反应', description: '紫色褪去', concepts: ['氧化反应'], progress: 100 },
  ],

  energyProfile: [0, 20, -50],
}

// 醇+氢卤酸反应数据
export const ALCOHOL_HX: ReactionData = {
  id: 'alcohol-hx',
  name: '醇+氢卤酸',
  formula: 'C₂H₅OH + HBr → C₂H₅Br + H₂O',
  category: 'substitution',
  description: '乙醇与氢溴酸发生取代反应',

  atoms: [
    { id: 'c1', element: 'C', position: [-2, 0, 0] },
    { id: 'c2', element: 'C', position: [-0.5, 0, 0] },
    { id: 'o', element: 'O', position: [-0.5, 1.43, 0] },
    { id: 'h1', element: 'H', position: [-0.5, 2.39, 0] },
    { id: 'h2', element: 'H', position: [3, 0.5, 0] },
    { id: 'br', element: 'Br', position: [4.5, 0.5, 0] },
  ],

  bonds: [
    { id: 'c1-c2', atom1Id: 'c1', atom2Id: 'c2', type: 'single' },
    { id: 'c2-o', atom1Id: 'c2', atom2Id: 'o', type: 'single' },
    { id: 'o-h1', atom1Id: 'o', atom2Id: 'h1', type: 'single' },
    { id: 'h2-br', atom1Id: 'h2', atom2Id: 'br', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { h2: [3, 0.5, 0], br: [4.5, 0.5, 0] } },
    { progress: 50, atomPositions: { h2: [1.5, 0.5, 0], br: [3.0, 0.5, 0] } },
    { progress: 100, atomPositions: { h2: [0.5, 2.0, 0], br: [0, 1.5, 0] }, bondOpacities: { 'o-h1': 0, 'h2-br': 0 } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '乙醇和HBr', concepts: ['醇', '氢卤酸'], progress: 0 },
    { id: 'step2', name: 'HBr接近', description: 'HBr向乙醇移动', concepts: ['取代'], progress: 50 },
    { id: 'step3', name: '产物生成', description: '生成溴乙烷', concepts: ['取代反应'], progress: 100 },
  ],

  energyProfile: [0, 20, -30],
}

// 分子间脱水(成醚)反应数据
export const DEHYDRATION_ETHER: ReactionData = {
  id: 'dehydration-ether',
  name: '分子间脱水',
  formula: '2C₂H₅OH → C₂H₅OC₂H₅ + H₂O',
  category: 'substitution',
  description: '乙醇分子间脱水生成乙醚',

  atoms: [
    { id: 'c1', element: 'C', position: [-3, 0, 0] },
    { id: 'c2', element: 'C', position: [-1.5, 0, 0] },
    { id: 'o1', element: 'O', position: [-1.5, 1.43, 0] },
    { id: 'h1', element: 'H', position: [-1.5, 2.39, 0] },
    { id: 'c3', element: 'C', position: [1.5, 0, 0] },
    { id: 'c4', element: 'C', position: [3.0, 0, 0] },
    { id: 'o2', element: 'O', position: [3.0, 1.43, 0] },
    { id: 'h2', element: 'H', position: [3.0, 2.39, 0] },
  ],

  bonds: [
    { id: 'c1-c2', atom1Id: 'c1', atom2Id: 'c2', type: 'single' },
    { id: 'c2-o1', atom1Id: 'c2', atom2Id: 'o1', type: 'single' },
    { id: 'o1-h1', atom1Id: 'o1', atom2Id: 'h1', type: 'single' },
    { id: 'c3-c4', atom1Id: 'c3', atom2Id: 'c4', type: 'single' },
    { id: 'c4-o2', atom1Id: 'c4', atom2Id: 'o2', type: 'single' },
    { id: 'o2-h2', atom1Id: 'o2', atom2Id: 'h2', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: {} },
    { progress: 50, atomPositions: { c3: [0.5, 0, 0], c4: [2.0, 0, 0], o2: [2.0, 1.43, 0], h2: [2.0, 2.39, 0] } },
    { progress: 100, atomPositions: { c3: [0, 0, 0], c4: [1.5, 0, 0], o2: [1.5, 1.43, 0], h2: [4.0, 2.0, 0] }, bondOpacities: { 'o2-h2': 0 } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '两个乙醇分子', concepts: ['醇', '脱水'], progress: 0 },
    { id: 'step2', name: '分子靠近', description: '乙醇分子靠近', concepts: ['酸催化'], progress: 50 },
    { id: 'step3', name: '产物生成', description: '生成乙醚', concepts: ['分子间脱水'], progress: 100 },
  ],

  energyProfile: [0, 15, -5],
}

// 苯同系物侧链卤代反应数据
export const SIDECHAIN_HALOGENATION: ReactionData = {
  id: 'sidechain-halogenation',
  name: '苯同系物侧链卤代',
  formula: 'C₆H₅CH₃ + Cl₂ → C₆H₅CH₂Cl + HCl',
  category: 'substitution',
  description: '甲苯在光照下发生侧链卤代反应',

  atoms: [
    ...benzenePositions([0, 0, 0], 1.40).map((pos, i) => ({
      id: `rc${i}`, element: 'C', position: pos as [number, number, number]
    })),
    { id: 'c_methyl', element: 'C', position: [0, -2.5, 0] },
    { id: 'h1', element: 'H', position: [0.5, -3.0, 0.5] },
    { id: 'h2', element: 'H', position: [-0.5, -3.0, 0.5] },
    { id: 'h3', element: 'H', position: [0, -3.0, -0.7] },
    { id: 'cl1', element: 'Cl', position: [3.5, 0, 0] },
    { id: 'cl2', element: 'Cl', position: [5.0, 0, 0] },
  ],

  bonds: [
    ...Array.from({ length: 6 }, (_, i) => ({
      id: `rc${i}-rc${(i + 1) % 6}`,
      atom1Id: `rc${i}`,
      atom2Id: `rc${(i + 1) % 6}`,
      type: 'single' as const,
    })),
    { id: 'rc3-c_methyl', atom1Id: 'rc3', atom2Id: 'c_methyl', type: 'single' },
    { id: 'c_methyl-h1', atom1Id: 'c_methyl', atom2Id: 'h1', type: 'single' },
    { id: 'c_methyl-h2', atom1Id: 'c_methyl', atom2Id: 'h2', type: 'single' },
    { id: 'c_methyl-h3', atom1Id: 'c_methyl', atom2Id: 'h3', type: 'single' },
    { id: 'cl1-cl2', atom1Id: 'cl1', atom2Id: 'cl2', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { cl1: [3.5, 0, 0], cl2: [5.0, 0, 0] } },
    { progress: 30, atomPositions: { cl1: [2.0, -1.0, 0], cl2: [3.5, -1.0, 0] } },
    { progress: 60, atomPositions: { cl1: [1.0, -2.0, 0], cl2: [2.5, -2.0, 0] }, bondOpacities: { 'cl1-cl2': 0 } },
    { progress: 100, atomPositions: { cl1: [0.5, -3.0, 0], cl2: [3.0, -2.0, 0] }, bondOpacities: { 'c_methyl-h1': 0 } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '甲苯和Cl₂', concepts: ['甲苯', '光照'], progress: 0 },
    { id: 'step2', name: 'Cl₂光解', description: 'Cl₂在光照下分解', concepts: ['自由基'], progress: 30 },
    { id: 'step3', name: '侧链取代', description: 'Cl取代侧链H', concepts: ['自由基取代'], progress: 60 },
    { id: 'step4', name: '产物生成', description: '生成苄氯', concepts: ['侧链卤代'], progress: 100 },
  ],

  energyProfile: [0, 30, 20, -90],
}

// 酚的取代反应数据
export const PHENOL_SUBSTITUTION: ReactionData = {
  id: 'phenol-substitution',
  name: '酚的取代',
  formula: 'C₆H₅OH + Br₂ → C₆H₂Br₃OH↓ + 3HBr',
  category: 'substitution',
  description: '苯酚与溴水反应生成三溴苯酚',

  atoms: [
    ...benzenePositions([0, 0, 0], 1.40).map((pos, i) => ({
      id: `rc${i}`, element: 'C', position: pos as [number, number, number]
    })),
    { id: 'o', element: 'O', position: [0, 2.5, 0] },
    { id: 'h', element: 'H', position: [0, 3.5, 0] },
    { id: 'br1', element: 'Br', position: [3.5, 0, 0] },
    { id: 'br2', element: 'Br', position: [3.5, 1.0, 0] },
    { id: 'br3', element: 'Br', position: [3.5, -1.0, 0] },
  ],

  bonds: [
    ...Array.from({ length: 6 }, (_, i) => ({
      id: `rc${i}-rc${(i + 1) % 6}`,
      atom1Id: `rc${i}`,
      atom2Id: `rc${(i + 1) % 6}`,
      type: 'single' as const,
    })),
    { id: 'rc0-o', atom1Id: 'rc0', atom2Id: 'o', type: 'single' },
    { id: 'o-h', atom1Id: 'o', atom2Id: 'h', type: 'single' },
  ],

  keyframes: [
    { progress: 0, atomPositions: { br1: [3.5, 0, 0], br2: [3.5, 1.0, 0], br3: [3.5, -1.0, 0] } },
    { progress: 50, atomPositions: { br1: [1.5, 0, 0], br2: [1.5, 1.0, 0], br3: [1.5, -1.0, 0] } },
    { progress: 100, atomPositions: { br1: [1.2, 0, 0], br2: [1.2, 1.0, 0], br3: [1.2, -1.0, 0] } },
  ],

  steps: [
    { id: 'step1', name: '反应物就位', description: '苯酚和溴水', concepts: ['苯酚', 'Br₂'], progress: 0 },
    { id: 'step2', name: 'Br₂接近', description: '溴分子向苯酚移动', concepts: ['亲电取代'], progress: 50 },
    { id: 'step3', name: '产物生成', description: '生成三溴苯酚沉淀', concepts: ['取代反应'], progress: 100 },
  ],

  energyProfile: [0, 20, -40],
}

// 所有反应数据（扩展到38种）
export const ALL_REACTIONS: Record<string, ReactionData> = {
  // 取代反应
  'alkane-halogenation': ALKANE_HALOGENATION,
  'benzene-bromination': BENZENE_BROMINATION,
  'benzene-nitration': BENZENE_NITRATION,
  'benzene-sulfonation': BENZENE_SULFONATION,
  'esterification': ESTERIFICATION,
  'haloalkane-hydrolysis': HALOALKANE_HYDROLYSIS,
  'phenol-bromine': PHENOL_BROMINE,
  'ester-hydrolysis': ESTER_HYDROLYSIS,
  'alcohol-hx': ALCOHOL_HX,
  'dehydration-ether': DEHYDRATION_ETHER,
  'sidechain-halogenation': SIDECHAIN_HALOGENATION,
  'phenol-substitution': PHENOL_SUBSTITUTION,
  
  // 加成反应
  'hydrogenation': HYDROGENATION,
  'alkene-halogenation': ALKENE_HALOGENATION,
  'alkyne-hydrogenation': ALKYNE_HYDROGENATION,
  'benzene-hydrogenation': BENZENE_HYDROGENATION,
  'aldehyde-hydrogenation': ALDEHYDE_HYDROGENATION,
  'alkene-hx': ALKENE_HX,
  'alkyne-br': ALKYNE_BR,
  'alkyne-br2': ALKYNE_BR2,
  
  // 消去反应
  'ethanol-elimination': ETHANOL_ELIMINATION,
  
  // 氧化反应
  'combustion': COMBUSTION,
  'silver-mirror': SILVER_MIRROR,
  'alcohol-oxidation': ALCOHOL_OXIDATION,
  'aldehyde-oxidation': ALDEHYDE_OXIDATION,
  'kmno4-decolorization': KMNO4_DECOLORIZATION,
  
  // 还原反应
  'nitrobenzene-reduction': NITROBENZENE_REDUCTION,
  
  // 聚合反应
  'addition-poly': ADDITION_POLY,
  'condensation-poly': CONDENSATION_POLY,
  
  // 特殊反应
  'phenol-fecl3': PHENOL_FECL3,
  'acetic-naoh': ACETIC_NAOH,
  'phenol-naoh': PHENOL_NAOH,
  'phenol-na2co3': PHENOL_NA2CO3,
  'protein-hno3': PROTEIN_HNO3,
}
