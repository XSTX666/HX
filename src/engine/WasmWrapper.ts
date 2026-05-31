// WASM模块包装器
interface WasmModule {
  calculate_distance: (pos1: number[], pos2: number[]) => number
  calculate_angle: (pos1: number[], pos2: number[], pos3: number[]) => number
  calculate_molecular_weight: (elements: string) => number
  lerp: (start: number, end: number, t: number) => number
  ease_in_out_cubic: (t: number) => number
}

let wasmModule: WasmModule | null = null  // eslint-disable-line prefer-const

// 初始化WASM模块
export async function initWasm(): Promise<boolean> {
  try {
    // 动态导入WASM模块（如果存在）
    // const module = await import('../../../public/wasm/chemistry_wasm')
    // await module.default()
    // wasmModule = module
    console.log('WASM module not compiled yet, using JavaScript fallback')
    return false
  } catch (error) {
    console.warn('WASM module not available, using JavaScript fallback:', error)
    return false
  }
}

// 检查WASM是否可用
export function isWasmAvailable(): boolean {
  return wasmModule !== null
}

// 计算距离
export function calculateDistance(pos1: number[], pos2: number[]): number {
  if (wasmModule) {
    return wasmModule.calculate_distance(pos1, pos2)
  }
  // JavaScript fallback
  const dx = pos1[0] - pos2[0]
  const dy = pos1[1] - pos2[1]
  const dz = pos1[2] - pos2[2]
  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}

// 计算键角
export function calculateAngle(pos1: number[], pos2: number[], pos3: number[]): number {
  if (wasmModule) {
    return wasmModule.calculate_angle(pos1, pos2, pos3)
  }
  // JavaScript fallback
  const v1 = [pos1[0] - pos2[0], pos1[1] - pos2[1], pos1[2] - pos2[2]]
  const v2 = [pos3[0] - pos2[0], pos3[1] - pos2[1], pos3[2] - pos2[2]]
  
  const dot = v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]
  const mag1 = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1] + v1[2] * v1[2])
  const mag2 = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1] + v2[2] * v2[2])
  
  if (mag1 === 0 || mag2 === 0) return 0
  
  const cosAngle = dot / (mag1 * mag2)
  return Math.acos(cosAngle) * 180 / Math.PI
}

// 计算分子量
export function calculateMolecularWeight(elements: string): number {
  if (wasmModule) {
    return wasmModule.calculate_molecular_weight(elements)
  }
  // JavaScript fallback
  const weights: Record<string, number> = {
    H: 1.008, C: 12.011, N: 14.007, O: 15.999,
    F: 18.998, Cl: 35.453, Br: 79.904, I: 126.904,
    S: 32.065, P: 30.974
  }
  
  return elements.split(',').reduce((sum, el) => {
    return sum + (weights[el.trim()] || 0)
  }, 0)
}

// 平滑插值
export function lerp(start: number, end: number, t: number): number {
  if (wasmModule) {
    return wasmModule.lerp(start, end, t)
  }
  return start + (end - start) * t
}

// 缓动函数
export function easeInOutCubic(t: number): number {
  if (wasmModule) {
    return wasmModule.ease_in_out_cubic(t)
  }
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}
