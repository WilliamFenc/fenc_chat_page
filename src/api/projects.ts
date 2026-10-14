import type { Project } from '../types'
import { mockProjects, delay } from './mock-data'

export async function fetchProjects(): Promise<Project[]> {
  await delay(300)
  return mockProjects
}

