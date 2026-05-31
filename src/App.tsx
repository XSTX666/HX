import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from './store/appStore'
import Scene3D from './components/Scene3D'
import ReactionList from './components/ReactionList'
import ControlPanel from './components/ControlPanel'
import MechPanel from './components/MechPanel'

export default function App() {
  const [loading, setLoading] = useState(true)
  const { 
    currentReaction, 
    isPlaying, 
    progress, 
    setProgress, 
    speed,
    setCurrentStage 
  } = useAppStore()
  
  const animRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  // 动画循环
  useEffect(() => {
    if (!isPlaying || progress >= 100) {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current)
        animRef.current = null
      }
      if (progress >= 100) {
        useAppStore.getState().setIsPlaying(false)
      }
      return
    }

    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time
      const delta = time - lastTimeRef.current
      lastTimeRef.current = time

      const newProgress = Math.min(100, progress + (delta / 1000) * speed * 10)
      setProgress(newProgress)

      if (newProgress < 100) {
        animRef.current = requestAnimationFrame(animate)
      }
    }

    lastTimeRef.current = 0
    animRef.current = requestAnimationFrame(animate)

    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current)
      }
    }
  }, [isPlaying, progress, speed, setProgress])

  return (
    <>
      {/* 加载界面 */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #0a0a1a, #1a1a3a)' }}
          >
            <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
            <p className="mt-5 text-gray-400 text-sm">加载 3D 场景...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 主应用 */}
      <div className="h-screen grid" style={{
        gridTemplateColumns: '280px 1fr 300px',
        gridTemplateRows: 'auto 1fr auto',
      }}>
        {/* 顶部栏 */}
        <header className="col-span-3 px-5 py-3 flex items-center justify-between"
          style={{ 
            background: 'rgba(14,18,32,0.95)',
            borderBottom: '1px solid rgba(79,172,254,0.15)'
          }}>
          <h1 className="text-lg font-bold">化学3D机理可视化</h1>
          <div className="px-3 py-1 rounded-full text-sm"
            style={{ 
              background: 'rgba(79,172,254,0.15)',
              color: '#4facfe'
            }}>
            {currentReaction || '选择一个反应开始'}
          </div>
        </header>

        {/* 左侧面板 */}
        <ReactionList />

        {/* 中间3D场景 */}
        <main className="relative overflow-hidden">
          <Scene3D />
        </main>

        {/* 右侧面板 */}
        <MechPanel />

        {/* 底部控制栏 */}
        <ControlPanel />
      </div>
    </>
  )
}
