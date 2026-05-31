import { useAppStore } from '../store/appStore'

interface MechStep {
  title: string
  desc: string
  concepts: string[]
}

const MECH_DATA: Record<string, MechStep[]> = {
  'alkane-halogenation': [
    { title: '反应物就位', desc: '甲烷和氯气分子', concepts: ['sp³杂化', '正四面体'] },
    { title: 'Cl₂光解', desc: '紫外光使Cl-Cl键断裂', concepts: ['自由基', '均裂'] },
    { title: '链反应', desc: 'Cl·夺取H·生成HCl', concepts: ['链增长', '自由基'] },
    { title: '产物生成', desc: '生成CH₃Cl和HCl', concepts: ['取代反应'] },
  ],
  'hydrogenation': [
    { title: '反应物就位', desc: '乙烯和氢气', concepts: ['C=C双键', 'π键'] },
    { title: '催化剂吸附', desc: 'H₂在Ni表面解离', concepts: ['催化加氢'] },
    { title: '加成反应', desc: 'H原子加到C=C上', concepts: ['顺式加成'] },
    { title: '产物生成', desc: '生成乙烷', concepts: ['sp³杂化'] },
  ],
  'condensation-poly': [
    { title: '单体就位', desc: '乙二醇和对苯二甲酸', concepts: ['双官能团'] },
    { title: '酯化脱水', desc: '形成酯键，脱去水', concepts: ['酯化', '脱水'] },
    { title: '链增长', desc: '不断形成酯键', concepts: ['缩聚'] },
    { title: '产物生成', desc: '生成涤纶', concepts: ['高分子'] },
  ],
}

export default function MechPanel() {
  const { currentReaction, currentStage } = useAppStore()

  const steps = currentReaction ? MECH_DATA[currentReaction] || [] : []

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
            key={i}
            className={`rounded-xl p-3.5 transition-all cursor-pointer ${
              currentStage === i ? 'active' : ''
            }`}
            style={{
              background: currentStage === i ? 'rgba(79,172,254,0.08)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${currentStage === i ? 'rgba(79,172,254,0.4)' : 'rgba(255,255,255,0.08)'}`,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: currentStage === i ? '#4facfe' : 'rgba(79,172,254,0.15)',
                  color: currentStage === i ? '#fff' : '#4facfe',
                }}
              >
                {i + 1}
              </div>
              <div className="text-sm font-semibold">{step.title}</div>
            </div>
            <div className="text-xs text-gray-400 leading-relaxed mb-2">
              {step.desc}
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
