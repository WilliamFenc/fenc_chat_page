import type { Model } from '../types'
import { mockModels, delay } from './mock-data'

export async function fetchModels(): Promise<Model[]> {
  await delay(300)
  return mockModels
}
