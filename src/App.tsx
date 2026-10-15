import { useState, useEffect } from 'react'
import type { Message } from './types'
import { newId } from './utils/id'
import { fetchMessages } from './api/messages'
import { useProjects } from './hooks/useProjects'
import { useModels } from './hooks/useModels'
import { useSessions } from './hooks/useSessions'
import { useMessages } from './hooks/useMessages'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { Mainchat } from './components/Mainchat'
import { Footer } from './components/Footer'

function App() {

  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null)
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const [currentModelId, setCurrentModelId] = useState<string>('m1')
  const [isStreaming, setIsStreaming] = useState(false)

  const { projects } = useProjects()
  const { models } = useModels()
  const { sessions, create: createSession } = useSessions(currentProjectId)
  const { messages, append: appendMessage } = useMessages(currentSessionId)

  function handleSelectProject(id: string) {
     setCurrentProjectId(id)   // switch project
     setCurrentSessionId(null) // nothing selected in the new project yet
  }

  async function handleNewSession() {
    if (currentProjectId === null ) return
    const session = await createSession(currentModelId)
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
    <div className="h-screen flex bg-page text-ink">
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
          messages={messages}
         />
  	 <Footer onSend={handleSend} disabled={isStreaming} />
      </main>
    </div>
  )
}

export default App
