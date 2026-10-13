import { useState, useEffect } from 'react'
import type { Project, Session, Model, Message} from './types'
import { newId } from './utils/id'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { Mainchat } from './components/Mainchat'
import { Footer } from './components/Footer'
import { fetchProjects, fetchModels, fetchSessions, fetchMessages, createSession } from './api'


function App() {

  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null)
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const [currentModelId, setCurrentModelId] = useState<string>('m1')
  const [isStreaming, setIsStreaming] = useState(false)

  const [projects, setProjects] = useState<Project[]>([])
  const [models, setModels] = useState<Model[]>([])
  const [sessions, setSessions] = useState<Session[]>([])
  const [messagesBySession, setMessagesBySession] = useState<Record<string, Message[]>>({})

  useEffect(() => {
    fetchProjects().then(setProjects)
    fetchModels().then(setModels)
  }, [])

  useEffect(() => {
    if (currentProjectId === null) {
      setSessions([])
      return
    }
    fetchSessions(currentProjectId).then(setSessions)
  }, [currentProjectId])

  useEffect(() => {
  if (currentSessionId === null) return
  if (currentSessionId in messagesBySession) return
  
  fetchMessages(currentSessionId).then((msgs) => {
    setMessagesBySession((prev) => ({ ...prev, [currentSessionId]: msgs }))
    })
  }, [currentSessionId])

  //if currentSessionId is set (not null), then return messagesBySession[currentSessionId] (falling back to [] if that key is missing); else return [].
  const currentMessages = currentSessionId ? (messagesBySession[currentSessionId] ?? []) : []

  function handleSelectProject(id: string) {
     setCurrentProjectId(id)   // switch project
     setCurrentSessionId(null) // nothing selected in the new project yet
  }

  function appendMessage(sessionId: string, message: Message) {
    setMessagesBySession((prev) => ({
      ...prev,
      [sessionId]: [...(prev[sessionId] ?? []), message],
    }))
  }
  
  async function handleNewSession() {
    if (currentProjectId === null ) return
    const session = await createSession(currentProjectId, currentModelId)
    setSessions((prev) => [...prev, session])
    setCurrentSessionId(session.id)
  }

  function handleSend(text: string) {
    if (currentSessionId === null) return

    appendMessage(currentSessionId, {
      id: newId(),
      role: 'user',
      content: text,
      createdAt: new Date().toISOString(),
    })

    setIsStreaming(true)

    setTimeout(() => {
      appendMessage(currentSessionId, {
        id: newId(),
        role: 'assistant',
        content: `You said: ${text}`,
        createdAt: new Date().toISOString(),
      })
      setIsStreaming(false)
    }, 1000)
  }


  return (
    <div className="h-screen flex bg-gray-900 text-white">
	<Sidebar 
	 projects={projects}
	 sessions={sessions}
	 currentProjectId={currentProjectId}
	 currentSessionId={currentSessionId}
	 onSelectProject={handleSelectProject}
         onSelectSession={setCurrentSessionId}
         onNewSession={handleNewSession}
	/>
	<main className="flex-1 flex flex-col">
	 <Header 
          models={models}
          currentModelId={currentModelId}
          onSelectModel={setCurrentModelId}
         />
	 <Mainchat
          messages={currentMessages}
         />
  	 <Footer onSend={handleSend} disabled={isStreaming} />
      </main>
    </div>
  )
}

export default App
