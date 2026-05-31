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
}

export const useAppStore = create<AppState>((set) => ({
  // 当前反应
  currentReaction: null,
  setCurrentReaction: (id) => set({ currentReaction: id, progress: 0, isPlaying: false }),

  // 动画状态
  isPlaying: false,
  setIsPlaying: (playing) => set({ isPlaying: playing }),

  progress: 0,
  setProgress: (progress) => set({ progress }),

  speed: 1,
  setSpeed: (speed) => set({ speed }),

  // 显示选项
  showLabels: true,
  toggleLabels: () => set((state) => ({ showLabels: !state.showLabels })),

  isSpinning: false,
  toggleSpin: () => set((state) => ({ isSpinning: !state.isSpinning })),

  // 当前阶段
  currentStage: 0,
  setCurrentStage: (stage) => set({ currentStage: stage }),
}))
