import { useState, useEffect } from 'react'
import type { Model } from '../types'
import { fetchModels } from '../api/models'

export function useModels() {
  const [models, setModels] = useState<Model[]>([])

  useEffect(() => {
    fetchModels().then(setModels)
  }, [])

  return { models }
}
