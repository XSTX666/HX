import { useAppStore } from '../store/appStore'
import { ALL_REACTIONS } from '../data/reactions'
import EnergyDiagram from './EnergyDiagram'

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
        borderLeft: '1px solid rgba(79,172,254,0.12)',
        padding: '16px',
      }}
    >
      <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#6a7090' }}>
        反应机理
      </div>

      {/* 反应信息 */}
      {reaction && (
        <div className="mb-4 p-4 rounded-xl" style={{ 
          background: 'linear-gradient(135deg, rgba(79,172,254,0.08), rgba(0,242,195,0.05))',
          border: '1px solid rgba(79,172,254,0.15)',
        }}>
          <div className="text-sm font-semibold mb-2" style={{ color: '#4facfe' }}>
            {reaction.name}
          </div>
          <div className="text-xs" style={{ color: '#8890a0' }}>
            {reaction.formula}
          </div>
        </div>
      )}

      {/* 能量图 */}
      <EnergyDiagram />

      {/* 机理步骤 */}
      <div className="flex flex-col gap-2">
        {steps.map((step, i) => {
          const isActive = currentStep === i
          const isPast = currentStep > i
          
          return (
            <div
              key={step.id}
              className="rounded-xl p-3 transition-all duration-300"
              style={{
                background: isActive ? 'rgba(79,172,254,0.08)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${isActive ? 'rgba(79,172,254,0.3)' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                  style={{
                    background: isActive ? '#4facfe' : isPast ? 'rgba(79,172,254,0.2)' : 'rgba(255,255,255,0.05)',
                    color: isActive ? '#fff' : isPast ? '#4facfe' : '#6a7090',
                  }}
                >
                  {isPast ? '✓' : i + 1}
                </div>
                <div className="text-sm font-semibold" style={{
                  color: isActive ? '#4facfe' : isPast ? '#8890a0' : '#6a7090',
                }}>
                  {step.name}
                </div>
              </div>
              <div className="text-xs leading-relaxed mb-2" style={{
                color: isActive ? '#8890a0' : '#6a7090',
              }}>
                {step.description}
              </div>
              <div className="flex flex-wrap gap-1">
                {step.concepts.map((concept, j) => (
                  <span
                    key={j}
                    className="text-xs px-2 py-0.5 rounded-lg"
                    style={{
                      background: isActive ? 'rgba(79,172,254,0.12)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${isActive ? 'rgba(79,172,254,0.25)' : 'rgba(255,255,255,0.06)'}`,
                      color: isActive ? '#4facfe' : '#6a7090',
                    }}
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </aside>
  )
}
