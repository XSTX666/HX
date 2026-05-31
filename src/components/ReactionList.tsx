import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/appStore'

interface ReactionItem {
  id: string
  name: string
  formula: string
}

interface ReactionCategory {
  icon: string
  title: string
  items: ReactionItem[]
}

const REACTIONS: Record<string, ReactionCategory> = {
  substitution: {
    icon: '🔄',
    title: '取代反应',
    items: [
      { id: 'alkane-halogenation', name: '烷烃卤代', formula: 'CH₄ + Cl₂ → CH₃Cl + HCl' },
      { id: 'benzene-bromination', name: '苯的溴代', formula: 'C₆H₆ + Br₂ → C₆H₅Br + HBr' },
      { id: 'esterification', name: '酯化反应', formula: 'CH₃COOH + C₂H₅OH → 酯 + H₂O' },
    ],
  },
  addition: {
    icon: '➕',
    title: '加成反应',
    items: [
      { id: 'hydrogenation', name: '烯烃加氢', formula: 'CH₂=CH₂ + H₂ → CH₃CH₃' },
      { id: 'halogenation', name: '烯烃加卤素', formula: 'CH₂=CH₂ + Br₂ → CH₂BrCH₂Br' },
    ],
  },
  elimination: {
    icon: '💨',
    title: '消去反应',
    items: [
      { id: 'ethanol-elimination', name: '醇消去', formula: 'CH₃CH₂OH → CH₂=CH₂ + H₂O' },
    ],
  },
  oxidation: {
    icon: '🔥',
    title: '氧化反应',
    items: [
      { id: 'combustion', name: '燃烧', formula: 'CH₄ + 2O₂ → CO₂ + 2H₂O' },
    ],
  },
  polymerization: {
    icon: '🔗',
    title: '聚合反应',
    items: [
      { id: 'addition-poly', name: '加聚反应', formula: 'n CH₂=CH₂ → 聚乙烯' },
      { id: 'condensation-poly', name: '缩聚反应', formula: '乙二醇 + 对苯二甲酸 → 涤纶' },
    ],
  },
}

export default function ReactionList() {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set(['substitution']))
  const { currentReaction, setCurrentReaction } = useAppStore()

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

  const selectReaction = (id: string, formula: string) => {
    setCurrentReaction(id)
  }

  return (
    <aside
      className="overflow-y-auto"
      style={{
        background: 'rgba(14,18,32,0.95)',
        borderRight: '1px solid rgba(79,172,254,0.15)',
        padding: '16px',
      }}
    >
      <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
        有机反应导航
      </div>

      <div className="flex flex-col gap-2">
        {Object.entries(REACTIONS).map(([category, data]) => (
          <div
            key={category}
            className="rounded-xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {/* 分类标题 */}
            <div
              className="px-4 py-3 cursor-pointer flex items-center gap-3 transition-colors hover:bg-white/5"
              onClick={() => toggleCategory(category)}
            >
              <span className="text-lg">{data.icon}</span>
              <span className="text-sm font-semibold">{data.title}</span>
            </div>

            {/* 反应列表 */}
            <AnimatePresence>
              {openCategories.has(category) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  {data.items.map(item => (
                    <div
                      key={item.id}
                      className={`px-4 py-2.5 pl-11 cursor-pointer text-sm transition-all border-l-3 ${
                        currentReaction === item.id
                          ? 'bg-blue-500/12 border-l-blue-500 text-blue-400'
                          : 'border-l-transparent hover:bg-blue-500/8 hover:border-l-blue-500/40'
                      }`}
                      onClick={() => selectReaction(item.id, item.formula)}
                    >
                      {item.name}
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
