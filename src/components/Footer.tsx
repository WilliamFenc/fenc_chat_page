import { useState } from 'react'

interface ComposerProps {
  onSend: (text: string) => void
  disabled: boolean
}

export function Footer({ onSend, disabled }: ComposerProps) {
  const [draft, setDraft] = useState('')

  function handleSend() {
    if (disabled) return 
    const text = draft.trim()
    if (text === '') return
    onSend(text)
    setDraft('')
  }

  return (
    <footer className="p-4 border-t border-gray-800 flex gap-2">
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
	onKeyDown={(e) => {
	    if (e.key === 'Enter') handleSend()
        }}
        className="flex-1 bg-gray-800 rounded px-3 py-2"
        placeholder="Message..."
      />
      <button 
       onClick={handleSend} 
       disabled={disabled} 
       className="bg-gray-700 rounded px-4 disabled:opacity-50"
      >
        Send
      </button>
    </footer>
  )
}
