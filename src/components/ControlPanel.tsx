import { useAppStore } from '../store/appStore'

export default function ControlPanel() {
  const {
    isPlaying, setIsPlaying,
    progress, setProgress,
    speed, setSpeed,
    showLabels, toggleLabels,
    isSpinning, toggleSpin,
    resetAnimation,
    nextStage,
    prevStage,
  } = useAppStore()

  const handlePlay = () => {
    if (progress >= 100) {
      resetAnimation()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <footer
      className="col-span-3 px-6 py-3 flex items-center justify-center gap-3"
      style={{
        background: 'rgba(14,18,32,0.95)',
        borderTop: '1px solid rgba(79,172,254,0.12)',
        backdropFilter: 'blur(24px)',
      }}
    >
      <button className="ctrl-btn" onClick={prevStage} title="上一阶段">⏮</button>
      <button className="ctrl-btn" onClick={handlePlay} title={isPlaying ? '暂停' : '播放'}>
        {isPlaying ? '⏸ 暂停' : '▶ 播放'}
      </button>
      <button className="ctrl-btn" onClick={nextStage} title="下一阶段">⏭</button>
      <button className="ctrl-btn" onClick={resetAnimation} title="重置">↺</button>

      <select
        className="ctrl-btn"
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
        title="播放速度"
      >
        <option value="0.25">0.25x</option>
        <option value="0.5">0.5x</option>
        <option value="1">1x</option>
        <option value="2">2x</option>
        <option value="4">4x</option>
      </select>

      <div className="w-px h-6 bg-gray-700 mx-1" />

      <button 
        className={`ctrl-btn ${isSpinning ? 'active' : ''}`} 
        onClick={toggleSpin}
        title="自动旋转"
      >
        🔄
      </button>
      <button 
        className={`ctrl-btn ${showLabels ? 'active' : ''}`} 
        onClick={toggleLabels}
        title="显示标签"
      >
        🏷
      </button>

      {/* 进度条 */}
      <div className="flex items-center gap-3 flex-1 max-w-sm ml-3">
        <div
          className="flex-1 h-2 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #4facfe, #00f2c3)',
              boxShadow: '0 0 10px rgba(79,172,254,0.3)',
            }}
          />
        </div>
        <span className="text-sm font-bold min-w-[45px] text-center" style={{ color: '#4facfe' }}>
          {Math.round(progress)}%
        </span>
      </div>
    </footer>
  )
}
