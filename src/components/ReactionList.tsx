import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/appStore'
import { ALL_REACTIONS } from '../data/reactions'

interface ReactionCategory {
  icon: string
  title: string
  color: string
  items: { id: string; name: string; formula: string }[]
}

const CATEGORIES: ReactionCategory[] = [
  {
    icon: '🔄',
    title: '取代反应',
    color: '#4facfe',
    items: [
      { id: 'alkane-halogenation', name: '烷烃卤代', formula: 'CH₄ + Cl₂ → CH₃Cl + HCl' },
      { id: 'benzene-bromination', name: '苯的溴代', formula: 'C₆H₆ + Br₂ → C₆H₅Br + HBr' },
      { id: 'benzene-nitration', name: '苯的硝化', formula: 'C₆H₆ + HNO₃ → C₆H₅NO₂ + H₂O' },
      { id: 'esterification', name: '酯化反应', formula: 'CH₃COOH + C₂H₅OH → 酯 + H₂O' },
    ],
  },
  {
    icon: '➕',
    title: '加成反应',
    color: '#00f2c3',
    items: [
      { id: 'hydrogenation', name: '烯烃加氢', formula: 'CH₂=CH₂ + H₂ → CH₃CH₃' },
      { id: 'alkene-halogenation', name: '烯烃加卤素', formula: 'CH₂=CH₂ + Br₂ → CH₂BrCH₂Br' },
    ],
  },
  {
    icon: '💨',
    title: '消去反应',
    color: '#ff6b4a',
    items: [
      { id: 'ethanol-elimination', name: '醇消去', formula: 'CH₃CH₂OH → CH₂=CH₂ + H₂O' },
    ],
  },
  {
    icon: '🔥',
    title: '氧化反应',
    color: '#ffaa33',
    items: [
      { id: 'combustion', name: '燃烧', formula: 'CH₄ + 2O₂ → CO₂ + 2H₂O' },
    ],
  },
  {
    icon: '🔗',
    title: '聚合反应',
    color: '#ff6b6b',
    items: [
      { id: 'condensation-poly', name: '缩聚反应', formula: '乙二醇 + 对苯二甲酸 → 涤纶' },
    ],
  },
]

export default function ReactionList() {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set(['取代反应']))
  const { currentReaction, setCurrentReaction, resetAnimation } = useAppStore()

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => {
      const next = new Set(prev)
      if (next.has(category)) {
        next.delete(category)
      } else {
        next.add(category)
      }
      return next
    })
  }

  const selectReaction = (id: string) => {
    setCurrentReaction(id)
    resetAnimation()
  }

  return (
    <aside
      className="overflow-y-auto"
      style={{
        background: 'rgba(14,18,32,0.95)',
        borderRight: '1px solid rgba(79,172,254,0.12)',
        padding: '16px',
      }}
    >
      <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#6a7090' }}>
        有机反应导航
      </div>

      <div className="flex flex-col gap-2">
        {CATEGORIES.map((category) => (
          <div
            key={category.title}
            className="rounded-xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div
              className="px-4 py-3 cursor-pointer flex items-center gap-3 transition-all duration-200 hover:bg-white/5"
              onClick={() => toggleCategory(category.title)}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="text-sm font-semibold flex-1">{category.title}</span>
              <span className="text-xs transition-transform duration-200" style={{
                transform: openCategories.has(category.title) ? 'rotate(90deg)' : 'rotate(0deg)',
                color: '#6a7090',
              }}>
                ▶
              </span>
            </div>

            <AnimatePresence>
              {openCategories.has(category.title) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  {category.items.map(item => (
                    <div
                      key={item.id}
                      className="px-4 py-3 pl-12 cursor-pointer text-sm transition-all duration-200"
                      style={{
                        borderLeft: `3px solid ${currentReaction === item.id ? category.color : 'transparent'}`,
                        background: currentReaction === item.id ? `${category.color}12` : 'transparent',
                        color: currentReaction === item.id ? category.color : '#8890a0',
                      }}
                      onClick={() => selectReaction(item.id)}
                    >
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs mt-1 opacity-60">{item.formula}</div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </aside>
  )
}
