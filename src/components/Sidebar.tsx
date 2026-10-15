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
    <aside className="w-64 bg-panel p-3">
      {projects.map((p) => (
        <div
          key={p.id}
          onClick={() => onSelectProject(p.id)}
          className={`cursor-pointer px-2 py-1 rounded ${
            p.id === currentProjectId ? 'bg-accent-soft' : ''
          }`}
        >
          {p.name}
        </div>
      ))}
      <hr className="my-3 border-line" />
      <button
       onClick={onNewSession}
       disabled={currentProjectId === null}
       className="w-full mb-2 px-2 py-1 rounded bg-accent-soft text-sm disabled:opacity-40"
      >
        + 
      </button>

      {sessions.map((s) => (
        <div
          key={s.id}
          onClick={() => onSelectSession(s.id)}
          className={`cursor-pointer px-2 py-1 rounded text-sm text-ink-muted ${
            s.id === currentSessionId ? 'bg-accent-soft' : ''
          }`}
        >
          {s.title}
        </div>
      ))}
    </aside>
  )
}
