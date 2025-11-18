import { motion } from 'framer-motion'
import { MessageSquare, Plus, User, Dot } from 'lucide-react'

export default function Sidebar({ open }) {
  const items = [
    { id: 1, title: 'Product strategy with CEO', active: true },
    { id: 2, title: 'Design prompt exploration' },
    { id: 3, title: 'Marketing copy ideas' },
  ]

  return (
    <motion.aside
      initial={false}
      animate={{ width: open ? 240 : 0 }}
      className="h-screen sticky top-0 overflow-hidden border-r border-white/5 bg-white/5 backdrop-blur-xl"
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-200">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" />
          <span className="text-sm font-medium">ChatGTO</span>
        </div>
        <button className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 grid place-items-center text-slate-200 hover:brightness-110">
          <Plus size={16} />
        </button>
      </div>
      <div className="px-2 space-y-2">
        {items.map((it) => (
          <button key={it.id} className={`w-full text-left group transition-all hover:translate-y-[-1px] ${it.active ? 'bg-white/10 border-l-2 border-indigo-500' : ''} rounded-lg px-3 py-2 text-slate-300`}>
            <div className="flex items-center gap-2">
              <MessageSquare size={14} className="text-slate-400" />
              <span className="text-sm line-clamp-1">{it.title}</span>
            </div>
          </button>
        ))}
      </div>
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <div className="flex items-center gap-2 text-slate-300">
          <div className="relative w-8 h-8 rounded-full bg-white/10 grid place-items-center">
            <User size={16} />
            <Dot className="absolute -bottom-1 -right-1 text-emerald-400" />
          </div>
          <div>
            <div className="text-sm">Avery</div>
            <div className="text-xs text-slate-400">Online</div>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}
