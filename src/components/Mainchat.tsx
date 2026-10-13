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
          className={`mb-3 text-lg ${m.role === 'user' ? 'text-right' : 'text-left'}`}
        >
          {m.content}
        </div>
      ))}
    </div>
  )
}
