import type { Message } from '../types'
import { mockMessages, delay } from './mock-data'

export async function fetchMessages(sessionId: string): Promise<Message[]> {
  await delay(300)
  return mockMessages[sessionId] ?? []
}
