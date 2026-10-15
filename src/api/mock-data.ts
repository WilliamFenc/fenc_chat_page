import type { Project, Session, Model, Message } from '../types'

export const mockProjects: Project[] = [
  { id: 'p1', name: 'Default', createdAt: '2026-10-01T00:00:00Z' },
  { id: 'p2', name: 'NL-to-SQL', createdAt: '2026-10-01T00:00:00Z' },
  { id: 'p3', name: 'Number3', createdAt: '2026-10-01T00:00:00Z' },
]

export const mockSessions: Session[] = [
  { id: 's1', projectId: 'p1', modelId: 'm1', title: 'Hello world', createdAt: '2026-10-01T00:00:00Z', updatedAt: '2026-10-01T00:00:00Z' },
  { id: 's2', projectId: 'p1', modelId: 'm1', title: 'Docker question', createdAt: '2026-10-01T00:00:00Z', updatedAt: '2026-10-01T00:00:00Z' },
  { id: 's3', projectId: 'p2', modelId: 'm1', title: 'Join query', createdAt: '2026-10-01T00:00:00Z', updatedAt: '2026-10-01T00:00:00Z' },
  { id: 's4', projectId: 'p3', modelId: 'm2', title: 'we are tesitng', createdAt: '2026-10-01T00:00:00Z', updatedAt: '2026-10-01T00:00:00Z' },
]

export const mockModels: Model[] = [
  { id: 'm1', name: 'GPT-4o' },
  { id: 'm2', name: 'Claude Sonnet' },
]

export const mockMessages: Record<string, Message[]> = {
  s1: [
    { id: 'msg1', role: 'user', content: 'Hello', createdAt: '2026-10-01T00:00:00Z' },
    { id: 'msg2', role: 'assistant', content: 'Hi — how can I help?', createdAt: '2026-10-01T00:00:01Z' },
  ],
  s3: [
    { id: 'msg3', role: 'user', content: 'How do I join two tables?', createdAt: '2026-10-01T00:00:00Z' },
  ],
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
