import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Ambient from './components/Ambient'
import Sidebar from './components/Sidebar'
import ChatBar from './components/ChatBar'
import MessageBubble from './components/MessageBubble'
import ModelSelector from './components/ModelSelector'
import { Bot, User } from 'lucide-react'

const BG = '#0A0A0F'

const initialMessages = [
  { id: 1, role: 'assistant', content: 'Welcome to ChatGTO. Where effortless power meets refined precision. How can I assist you today?' },
  { id: 2, role: 'user', content: 'Draft a luxurious product announcement for our new AI feature.' },
  { id: 3, role: 'assistant', content: 'Absolutely. I will craft a polished, high-impact announcement with a tone of quiet confidence and authority. Would you like it concise or expansive?'}
]

const models = [
  { id: 'auto', name: 'AUTO', tagline: 'Let ChatGTO choose', speed: 0.6, cost: 1, power: 4, icon: <Bot size={16} /> },
  { id: 'gpt4', name: 'GPT-4', tagline: 'Precision & reasoning', speed: 1.2, cost: 3, power: 5, icon: <Bot size={16} /> },
  { id: 'claude', name: 'Claude', tagline: 'Long-context maestro', speed: 1.0, cost: 2, power: 4, icon: <Bot size={16} /> },
  { id: 'gemini', name: 'Gemini', tagline: 'Multimodal agility', speed: 0.8, cost: 2, power: 4, icon: <Bot size={16} /> },
  { id: 'llama', name: 'Llama', tagline: 'Open & efficient', speed: 0.9, cost: 1, power: 3, icon: <Bot size={16} /> },
  { id: 'mixtral', name: 'Mixtral', tagline: 'MoE performance', speed: 0.9, cost: 2, power: 4, icon: <Bot size={16} /> },
  { id: 'phi3', name: 'Phi-3', tagline: 'Small, mighty', speed: 0.7, cost: 1, power: 3, icon: <Bot size={16} /> },
  { id: 'glaive', name: 'Glaive', tagline: 'Creative edge', speed: 0.8, cost: 2, power: 4, icon: <Bot size={16} /> },
]

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectorOpen, setSelectorOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState(models[0])
  const [messages, setMessages] = useState(initialMessages)
  const [thinking, setThinking] = useState(false)
  const [activeId, setActiveId] = useState(null)

  // Simulate AI streaming
  const streamResponse = async (text) => {
    setThinking(true)
    const id = Date.now()
    setActiveId(id)
    setMessages((m) => [...m, { id, role: 'assistant', content: '' }])
    const tokens = text.split(' ')
    for (let i = 0; i < tokens.length; i++) {
      await new Promise((r) => setTimeout(r, 60))
      setMessages((m) => m.map((msg) => (msg.id === id ? { ...msg, content: (msg.content + ' ' + tokens[i]).trim() } : msg)))
    }
    setThinking(false)
    setTimeout(() => setActiveId(null), 400)
  }

  const handleSend = async (value) => {
    const userId = Date.now() + Math.random()
    setMessages((m) => [...m, { id: userId, role: 'user', content: value }])

    // Example mocked response based on model
    const response = `(${selectedModel.name}) Consider it done. I will produce a response with measured elegance, balanced detail, and a tone of confident restraint.`
    await streamResponse(response)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: BG }}>
      <Ambient />

      <div className="relative z-10 flex">
        <Sidebar open={sidebarOpen} />

        <main className="flex-1 min-h-screen">
          <div className="mx-auto max-w-[800px] px-4 sm:px-6 md:px-8 pt-24 pb-40">
            {/* Chat container */}
            <div className="space-y-4">
              {messages.map((m) => (
                <MessageBubble key={m.id} role={m.role} content={m.content} active={activeId === m.id && thinking} />
              ))}

              {/* Streaming cursor when thinking */}
              {thinking && (
                <div className="pl-2 text-slate-400 animate-pulse">▍</div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* AI Response Orb */}
      <AnimatePresence>
        {thinking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: [0.9, 1.1, 0.9] }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="fixed left-[calc(50%-440px)] bottom-[120px] w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-[0_0_40px_rgba(99,102,241,0.6)]"/>
        )}
      </AnimatePresence>

      <ChatBar
        onSend={handleSend}
        typing={thinking}
        onFocusChange={() => {}}
        model={selectedModel}
        onOpenModels={() => setSelectorOpen(true)}
      />

      <ModelSelector
        open={selectorOpen}
        onClose={() => setSelectorOpen(false)}
        models={models}
        selectedId={selectedModel.id}
        onSelect={(m) => {
          setSelectedModel(m)
          setSelectorOpen(false)
        }}
      />
    </div>
  )
}
