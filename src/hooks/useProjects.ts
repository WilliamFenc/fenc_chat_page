import { useState, useEffect } from 'react'
import type { Project } from '../types'
import { fetchProjects } from '../api/projects'

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    fetchProjects().then(setProjects)
  }, [])

  return { projects }
}
