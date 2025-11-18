import { motion } from 'framer-motion'

export default function MessageBubble({ role, content, active }) {
  const isUser = role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`${
          isUser
            ? 'bg-transparent border border-transparent relative'
            : 'bg-white/5 backdrop-blur-xl border border-white/10'
        } max-w-[80%] md:max-w-[70%] rounded-2xl p-4 text-slate-200 leading-relaxed shadow-xl`}
        style={
          isUser
            ? {
                backgroundClip: 'padding-box',
              }
            : {}
        }
      >
        {isUser ? (
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ padding: 1 }}>
              <div className="absolute inset-0 rounded-[1rem]" style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.6), rgba(139,92,246,0.6))',
                WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }} />
            </div>
            <div className="bg-black/30 rounded-2xl border border-white/10 p-4">
              <p>{content}</p>
            </div>
          </div>
        ) : (
          <div>
            <p>{content}</p>
          </div>
        )}

        {active && (
          <motion.div
            aria-hidden
            className="absolute -inset-1 rounded-[1.25rem]"
            animate={{ boxShadow: ['0 0 0 rgba(99,102,241,0)', '0 0 40px rgba(99,102,241,0.35)', '0 0 0 rgba(99,102,241,0)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
    </motion.div>
  )
}
