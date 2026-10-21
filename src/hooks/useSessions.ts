import { useState, useEffect } from 'react'
import type { Session } from '../types'
import { fetchSessions, createSession, renameSession } from '../api/sessions'

export function useSessions(projectId: string | null) {
  const [sessions, setSessions] = useState<Session[]>([])

  useEffect(() => {
    if (projectId === null) {
      setSessions([])
      return
    }
    fetchSessions(projectId).then(setSessions)
  }, [projectId])

  async function create(modelId: string): Promise<Session> {
    if (projectId === null) throw new Error('No project selected')
    const session = await createSession(projectId, modelId)
    setSessions((prev) => [session, ...prev])
    return session
  }

  async function rename(sessionId: string, title: string) {
    const updated = await renameSession(sessionId, title)
    setSessions((prev) => prev.map((s) => (s.id === updated.id ? updated : s)))
  }

  return { sessions, create , rename}
}
