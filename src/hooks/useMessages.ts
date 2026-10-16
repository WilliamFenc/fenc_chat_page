import { useState, useEffect } from 'react'
import type { Message } from '../types'
import { fetchMessages } from '../api/messages'

export function useMessages(sessionId: string | null) {
  const [bySession, setBySession] = useState<Record<string, Message[]>>({})

  useEffect(() => {
    if (sessionId === null) return
    if (sessionId in bySession) return

    fetchMessages(sessionId).then((msgs) => {
      setBySession((prev) => ({ ...prev, [sessionId]: msgs }))
    })
  }, [sessionId])

  function append(targetSessionId: string, message: Message) {
    setBySession((prev) => ({
      ...prev,
      [targetSessionId]: [...(prev[targetSessionId] ?? []), message],
    }))
  }

  const messages = sessionId ? (bySession[sessionId] ?? []) : []

  return { messages, append }
}
