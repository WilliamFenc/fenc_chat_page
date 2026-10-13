import type { Project, Session } from '../types'

interface SidebarProps {
  projects: Project[]
  sessions: Session[]
  currentProjectId: string | null
  onSelectProject: (id: string) => void
  currentSessionId: string | null
  onSelectSession: (id: string) => void
  onNewSession: () => void
}

export function Sidebar({ 
  projects, 
  sessions, 
  currentProjectId, 
  onSelectProject, 
  currentSessionId, 
  onSelectSession,
  onNewSession
}: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-950 p-3">
      {projects.map((p) => (
        <div
          key={p.id}
          onClick={() => onSelectProject(p.id)}
          className={`cursor-pointer px-2 py-1 rounded ${
            p.id === currentProjectId ? 'bg-gray-800' : ''
          }`}
        >
          {p.name}
        </div>
      ))}
      <hr className="my-3 border-gray-800" />
      <button
       onClick={onNewSession}
       disabled={currentProjectId === null}
       className="w-full mb-2 px-2 py-1 rounded bg-gray-800 text-sm disabled:opacity-40"
      >
        + 
      </button>

      {sessions.map((s) => (
        <div
          key={s.id}
          onClick={() => onSelectSession(s.id)}
          className={`cursor-pointer px-2 py-1 rounded text-sm text-gray-300 ${
            s.id === currentSessionId ? 'bg-gray-800' : ''
          }`}
        >
          {s.title}
        </div>
      ))}
    </aside>
  )
}
