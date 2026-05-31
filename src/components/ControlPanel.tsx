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
      className="col-span-3 px-5 py-3 flex items-center justify-center gap-3"
      style={{
        background: 'rgba(14,18,32,0.95)',
        borderTop: '1px solid rgba(79,172,254,0.15)',
      }}
    >
      <button className="ctrl-btn" onClick={prevStage}>⏮</button>
      <button className="ctrl-btn" onClick={handlePlay}>
        {isPlaying ? '⏸ 暂停' : '▶ 播放'}
      </button>
      <button className="ctrl-btn" onClick={nextStage}>⏭</button>
      <button className="ctrl-btn" onClick={resetAnimation}>↺</button>

      <select
        className="px-3 py-1.5 rounded-lg text-sm"
        style={{
          background: 'rgba(10,14,30,0.6)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#bbb',
        }}
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
      >
        <option value="0.25">0.25x</option>
        <option value="0.5">0.5x</option>
        <option value="1">1x</option>
        <option value="2">2x</option>
        <option value="4">4x</option>
      </select>

      <button className={`ctrl-btn ${isSpinning ? 'active' : ''}`} onClick={toggleSpin}>
        🔄
      </button>
      <button className={`ctrl-btn ${showLabels ? 'active' : ''}`} onClick={toggleLabels}>
        🏷
      </button>

      {/* 进度条 */}
      <div className="flex items-center gap-2.5 flex-1 max-w-sm">
        <div
          className="flex-1 h-1.5 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.1)' }}
        >
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #4facfe, #00f2c3)',
            }}
          />
        </div>
        <span className="text-sm font-bold text-blue-400 min-w-[40px] text-center">
          {Math.round(progress)}%
        </span>
      </div>
    </footer>
  )
}
