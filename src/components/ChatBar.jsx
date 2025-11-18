import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Send, Loader2, Sparkles, ChevronUp, ChevronDown } from 'lucide-react'

export default function ChatBar({ onSend, typing, onFocusChange, model, onOpenModels, charCount }) {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(false)
  const textareaRef = useRef(null)

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    const lineHeight = 24
    el.style.height = '56px'
    el.style.height = Math.min(el.scrollHeight, 96).toString() + 'px'
  }, [value])

  useEffect(() => {
    onFocusChange?.(focused)
  }, [focused])

  const canSend = value.trim().length > 0 && !loading

  const handleSend = async () => {
    if (!canSend) return
    setLoading(true)
    await onSend?.(value)
    setValue('')
    setLoading(false)
  }

  return (
    <motion.div
      initial={false}
      animate={{
        y: 0,
        boxShadow: focused ? '0 8px 40px rgba(99,102,241,0.25)' : '0 6px 24px rgba(0,0,0,0.35)',
      }}
      className="fixed left-1/2 -translate-x-1/2 bottom-8 z-30 w-[92%] sm:w-[85%] md:w-[70%] lg:w-[800px]"
    >
      <motion.div
        className="relative rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl overflow-hidden"
        animate={{ height: expanded || focused ? 120 : 56, backgroundColor: 'rgba(255,255,255,0.05)' }}
        transition={{ type: 'spring', stiffness: 220, damping: 26 }}
        onFocus={() => { setFocused(true); setExpanded(true) }}
        onBlur={() => { setFocused(false); setExpanded(false) }}
      >
        {/* Breathing idle glow */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          animate={{ boxShadow: focused ? 'inset 0 0 0 1px rgba(99,102,241,0.35), 0 0 0 0 rgba(99,102,241,0.0)' : ['inset 0 0 0 1px rgba(255,255,255,0.06)','inset 0 0 0 1px rgba(99,102,241,0.25)','inset 0 0 0 1px rgba(255,255,255,0.06)'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Model pill */}
        <button
          aria-label="Select model"
          onMouseDown={(e) => e.preventDefault()}
          onClick={onOpenModels}
          className="absolute left-2 top-1/2 -translate-y-1/2 h-10 px-3 rounded-full bg-white/5 border border-white/10 text-sm text-slate-200 flex items-center gap-2 hover:scale-[1.02] hover:brightness-110 active:brightness-125 transition-all"
        >
          <Sparkles size={18} className="text-indigo-400" />
          <span className="font-medium">{model?.name || 'AUTO'}</span>
        </button>

        {/* Textarea */}
        <div className="px-28 pr-24 h-full flex items-center">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setExpanded(true)}
            onBlur={() => setExpanded(false)}
            placeholder="Ask anything..."
            className="w-full bg-transparent outline-none resize-none text-slate-100 placeholder:text-slate-400 text-base leading-6 py-4"
            rows={1}
            style={{ maxHeight: 96 }}
          />
        </div>

        {/* Character count and hint */}
        <div className="pointer-events-none absolute right-16 top-2 text-xs text-slate-400/70">
          {value.length} chars
        </div>
        <AnimatePresence>
          {focused && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="pointer-events-none absolute right-16 bottom-2 text-[11px] text-slate-400/80"
            >
              Shift+Enter for newline
            </motion.div>
          )}
        </AnimatePresence>

        {/* Send button */}
        <motion.button
          aria-label="Send message"
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleSend}
          disabled={!canSend}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full grid place-items-center text-slate-100 disabled:opacity-50"
          whileTap={{ scale: 0.96 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {loading ? (
              <motion.span key="loader" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 grid place-items-center shadow-[0_0_24px_rgba(99,102,241,0.6)]">
                <Loader2 className="animate-spin" size={18} />
              </motion.span>
            ) : (
              <motion.span key="send" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 grid place-items-center shadow-[0_0_24px_rgba(99,102,241,0.6)]">
                <Send size={18} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
