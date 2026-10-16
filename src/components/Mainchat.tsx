import type { Message } from '../types'

interface MainchatProps {
  messages: Message[]
}

export function Mainchat({ messages }: MainchatProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.length === 0 && (
        <p className="text-lg text-gray-500">Select a session</p>
      )}

      {messages.map((m) => (
        <div
          key={m.id}
          //className={`mb-3 text-lg ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          className={`mb-3 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[70%] px-4 py-2 rounded-2xl ${
	    m.role === 'user' ? 'bg-accent-soft px-5 py-3 rounded-3xl' : 'py-3'
            }`}
          >
            {m.content}
          </div>
        </div>
      ))}
    </div>
  )
}
