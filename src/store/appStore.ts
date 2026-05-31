import { create } from 'zustand'

interface AppState {
  // 当前反应
  currentReaction: string | null
  setCurrentReaction: (id: string) => void

  // 动画状态
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void

  progress: number
  setProgress: (progress: number) => void

  speed: number
  setSpeed: (speed: number) => void

  // 显示选项
  showLabels: boolean
  toggleLabels: () => void

  isSpinning: boolean
  toggleSpin: () => void

  // 当前阶段
  currentStage: number
  setCurrentStage: (stage: number) => void

  // 动画控制
  resetAnimation: () => void
  nextStage: () => void
  prevStage: () => void
}

export const useAppStore = create<AppState>((set, get) => ({
  // 当前反应
  currentReaction: null,
  setCurrentReaction: (id) => set({ currentReaction: id, progress: 0, isPlaying: false, currentStage: 0 }),

  // 动画状态
  isPlaying: false,
  setIsPlaying: (playing) => set({ isPlaying: playing }),

  progress: 0,
  setProgress: (progress) => {
    const stage = Math.min(4, Math.floor(progress / 20))
    set({ progress, currentStage: stage })
  },

  speed: 1,
  setSpeed: (speed) => set({ speed }),

  // 显示选项
  showLabels: true,
  toggleLabels: () => set((state) => ({ showLabels: !state.showLabels })),

  isSpinning: false,
  toggleSpin: () => set((state) => ({ isSpinning: !state.isSpinning })),

  // 当前阶段
  currentStage: 0,
  setCurrentStage: (stage) => set({ currentStage: stage, progress: stage * 20 }),

  // 动画控制
  resetAnimation: () => set({ progress: 0, isPlaying: false, currentStage: 0 }),
  
  nextStage: () => {
    const { currentStage } = get()
    if (currentStage < 4) {
      set({ currentStage: currentStage + 1, progress: (currentStage + 1) * 20 })
    }
  },
  
  prevStage: () => {
    const { currentStage } = get()
    if (currentStage > 0) {
      set({ currentStage: currentStage - 1, progress: (currentStage - 1) * 20 })
    }
  },
}))
