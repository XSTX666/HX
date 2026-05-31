import { useAppStore } from '../store/appStore'
import { ALL_REACTIONS } from '../data/reactions'

export default function MechPanel() {
  const { currentReaction, progress } = useAppStore()
  const reaction = currentReaction ? ALL_REACTIONS[currentReaction] : null

  const steps = reaction?.steps || []
  const currentStep = steps.findIndex(step => progress <= step.progress) || 0

  return (
    <aside
      className="overflow-y-auto"
      style={{
        background: 'rgba(14,18,32,0.95)',
        borderLeft: '1px solid rgba(79,172,254,0.15)',
        padding: '16px',
      }}
    >
      <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
        反应机理
      </div>

      {/* 反应信息 */}
      {reaction && (
        <div className="mb-4 p-3 rounded-xl" style={{ background: 'rgba(79,172,254,0.08)' }}>
          <div className="text-sm font-semibold mb-1">{reaction.name}</div>
          <div className="text-xs text-gray-400">{reaction.formula}</div>
        </div>
      )}

      {/* 能量图占位 */}
      <div
        className="rounded-xl p-3 mb-4"
        style={{
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid rgba(79,172,254,0.15)',
          height: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6a7090',
          fontSize: '13px',
        }}
      >
        能量图
      </div>

      {/* 机理步骤 */}
      <div className="flex flex-col gap-3">
        {steps.map((step, i) => (
          <div
            key={step.id}
            className="rounded-xl p-3.5 transition-all cursor-pointer"
            style={{
              background: currentStep === i ? 'rgba(79,172,254,0.08)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${currentStep === i ? 'rgba(79,172,254,0.4)' : 'rgba(255,255,255,0.08)'}`,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: currentStep === i ? '#4facfe' : 'rgba(79,172,254,0.15)',
                  color: currentStep === i ? '#fff' : '#4facfe',
                }}
              >
                {i + 1}
              </div>
              <div className="text-sm font-semibold">{step.name}</div>
            </div>
            <div className="text-xs text-gray-400 leading-relaxed mb-2">
              {step.description}
            </div>
            <div className="flex flex-wrap gap-1">
              {step.concepts.map((concept, j) => (
                <span
                  key={j}
                  className="text-xs px-2 py-0.5 rounded-lg"
                  style={{
                    background: 'rgba(79,172,254,0.12)',
                    border: '1px solid rgba(79,172,254,0.25)',
                    color: '#4facfe',
                  }}
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
