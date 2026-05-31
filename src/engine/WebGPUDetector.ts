import * as THREE from 'three'

// WebGPU 兼容性检查
export async function checkWebGPUSupport(): Promise<boolean> {
  if (!navigator.gpu) {
    console.warn('WebGPU not supported: navigator.gpu is not available')
    return false
  }

  try {
    const adapter = await navigator.gpu.requestAdapter()
    if (!adapter) {
      console.warn('WebGPU not supported: no adapter found')
      return false
    }
    return true
  } catch (error) {
    console.warn('WebGPU not supported:', error)
    return false
  }
}

// 渲染器配置
export function configureRenderer(renderer: THREE.WebGLRenderer) {
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.3
  renderer.info.autoReset = true
}
