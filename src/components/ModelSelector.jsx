import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles, Star, Zap, DollarSign } from 'lucide-react'

export default function ModelSelector({ open, onClose, models, selectedId, onSelect }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-28 w-[92%] sm:w-[85%] md:w-[70%] lg:w-[800px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-2xl border border-white/10 bg-white/8 backdrop-blur-2xl p-3 shadow-2xl">
              <div className="flex items-center gap-2 text-slate-300 px-2 pb-2">
                <Sparkles size={16} className="text-indigo-400" />
                <span className="text-sm">Select a model</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {models.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => onSelect(m)}
                    className={`group relative rounded-xl border bg-white/5 backdrop-blur-xl p-3 text-left transition-all hover:scale-[1.02] hover:brightness-110 ${
                      selectedId === m.id ? 'border-transparent ring-2 ring-indigo-500/60' : 'border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 grid place-items-center text-white shadow-[0_0_16px_rgba(99,102,241,0.5)]">
                        {m.icon}
                      </div>
                      <div>
                        <div className="text-slate-100 text-sm font-medium">{m.name}</div>
                        <div className="text-[11px] text-slate-400">{m.tagline}</div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-300">
                      <div className="flex items-center gap-1">
                        <Zap size={14} className="text-emerald-400" />
                        <div className="h-2 w-12 bg-emerald-400/20 rounded overflow-hidden">
                          <motion.div className="h-full bg-emerald-400" initial={{ x: '-100%' }} animate={{ x: 0 }} transition={{ duration: m.speed }} />
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign size={14} className="text-amber-400" />
                        <div className="flex gap-[2px]">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <span key={i} className={`w-2 h-2 rounded-sm ${i < m.cost ? 'bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.7)]' : 'bg-amber-400/20'}`} />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-indigo-400" />
                        <div className="flex gap-[2px]">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={`w-2 h-2 rounded-full ${i < m.power ? 'bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.7)]' : 'bg-indigo-400/20'}`} />
                          ))}
                        </div>
                      </div>
                    </div>

                    {m.id === 'auto' && (
                      <motion.div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-xl"
                        animate={{
                          background: [
                            'conic-gradient(from 0deg, rgba(99,102,241,0.0), rgba(99,102,241,0.3), rgba(139,92,246,0.3), rgba(99,102,241,0.0))',
                            'conic-gradient(from 360deg, rgba(99,102,241,0.0), rgba(99,102,241,0.3), rgba(139,92,246,0.3), rgba(99,102,241,0.0))',
                          ],
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                        style={{ mixBlendMode: 'plus-lighter', opacity: 0.35 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
