import type { Session } from '../types'
import { newId } from '../utils/id'
import { mockSessions, delay } from './mock-data'

export async function fetchSessions(projectId: string): Promise<Session[]> {
  await delay(300)
  return mockSessions.filter((s) => s.projectId === projectId)
}

export async function renameSession(projectId: string, title: string): Promise<Session[]> {
  await delay(300)
  const session = mockSession.find((s) => s.id === sessionId)
  if (!session) throw new Error(`Session ${sessionId} not found`)
  session.title = title
  session.updatedAt = new Date().toISOString()
  return session
}

export async function createSession(projectId: string, modelId: string): Promise<Session> {
  await delay(300)
  const now = new Date().toISOString()
  const session: Session = {
    id: newId(),
    projectId,
    modelId,
    title: 'New chat',
    createdAt: now,
    updatedAt: now,
  }
  mockSessions.push(session)
  return session
}
