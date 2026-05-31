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

// 获取最佳渲染器
export async function getBestRenderer(canvas: HTMLCanvasElement): Promise<{
  renderer: THREE.WebGLRenderer | THREE.WebGPURenderer
  isWebGPU: boolean
}> {
  const THREE = await import('three')
  
  // 检查 WebGPU 支持
  const hasWebGPU = await checkWebGPUSupport()
  
  if (hasWebGPU) {
    try {
      // 尝试创建 WebGPU 渲染器
      const { WebGPURenderer } = await import('three/addons/renderers/WebGPURenderer.js')
      const renderer = new WebGPURenderer({ 
        canvas,
        antialias: true,
        powerPreference: 'high-performance'
      })
      await renderer.init()
      console.log('Using WebGPU renderer')
      return { renderer, isWebGPU: true }
    } catch (error) {
      console.warn('WebGPU initialization failed, falling back to WebGL:', error)
    }
  }
  
  // 降级到 WebGL
  const renderer = new THREE.WebGLRenderer({ 
    canvas,
    antialias: true,
    powerPreference: 'high-performance'
  })
  console.log('Using WebGL renderer')
  return { renderer, isWebGPU: false }
}

// 渲染器配置
export function configureRenderer(renderer: THREE.WebGLRenderer | THREE.WebGPURenderer, isWebGPU: boolean) {
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.3
  
  if (!isWebGPU) {
    // WebGL 特定配置
    (renderer as THREE.WebGLRenderer).info.autoReset = true
  }
}
