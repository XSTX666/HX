import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from './store/appStore'
import Scene3D from './components/Scene3D'
import ReactionList from './components/ReactionList'
import ControlPanel from './components/ControlPanel'
import MechPanel from './components/MechPanel'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const { 
    currentReaction, 
    isPlaying, 
    progress, 
    setProgress, 
    speed,
  } = useAppStore()
  
  const animRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  // 检测是否为移动设备
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
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
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-500/20 rounded-full" />
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin" />
            </div>
            <p className="mt-5 text-gray-400 text-sm tracking-wider animate-pulse">加载 3D 场景...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 主应用 */}
      <div className="h-screen grid app-layout" style={{
        gridTemplateColumns: isMobile ? '1fr' : '280px 1fr 300px',
        gridTemplateRows: 'auto 1fr auto',
      }}>
        {/* 顶部栏 */}
        <motion.header 
          className="col-span-3 px-6 py-3 flex items-center justify-between glass"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold tracking-wide gradient-text">
              化学3D机理可视化
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            {currentReaction && (
              <motion.div 
                className="px-4 py-1.5 rounded-full text-sm font-medium"
                style={{ 
                  background: 'rgba(79,172,254,0.12)',
                  border: '1px solid rgba(79,172,254,0.25)',
                  color: '#4facfe',
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {currentReaction}
              </motion.div>
            )}
          </div>
        </motion.header>

        {/* 左侧面板 */}
        {!isMobile && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ReactionList />
          </motion.div>
        )}

        {/* 中间3D场景 */}
        <motion.main 
          className="relative overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Scene3D />
        </motion.main>

        {/* 右侧面板 */}
        {!isMobile && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <MechPanel />
          </motion.div>
        )}

        {/* 底部控制栏 */}
        <motion.footer 
          className="col-span-3 glass"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <ControlPanel />
        </motion.footer>
      </div>
    </>
  )
}
