import { useState } from 'react'
import type { Project, Session } from '../types'

interface SidebarProps {
  projects: Project[]
  sessions: Session[]
  currentProjectId: string | null
  onSelectProject: (id: string) => void
  currentSessionId: string | null
  onSelectSession: (id: string) => void
  onNewSession: () => void
  onRenameSession: (id: string, title: string) => void
}

export function Sidebar({ 
  projects, 
  sessions, 
  currentProjectId, 
  currentSessionId, 
  onSelectProject, 
  onSelectSession,
  onNewSession, 
  onRenameSession
}: SidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draftTitle, setDraftTitle] = useState('')

  function startEditing(s: Session) {
    setEditingId(s.id)
    setDraftTitle(s.title)
  }

  function commitEditing(sessionId: string) {
    const title = draftTitle.trim()
    if (title !== '') onRenameSession(sessionId, title)
    setEditingId(null)
  }

  return (
    <aside className="w-64 bg-panel border-r border-line p-3">
      {projects.map((p) => (
        <div
          key={p.id}
          onClick={() => onSelectProject(p.id)}
          className={`cursor-pointer px-2 py-1 rounded ${
            p.id === currentProjectId ? 'bg-accent-soft font-medium' : 'hover:bg-page'
          }`}
        >
          {p.name}
        </div>
      ))}

      <hr className="my-3 border-line" />

      <button
        onClick={onNewSession}
        disabled={currentProjectId === null}
        className="w-full mb-2 px-2 py-1 rounded bg-surface border border-line text-ink text-sm hover:bg-page disabled:opacity-40"
      >
        + New chat
      </button>

      {sessions.map((s) =>
        s.id === editingId ? (
          <input
            key={s.id}
            autoFocus
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            onBlur={() => setEditingId(null)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitEditing(s.id)
              if (e.key === 'Escape') setEditingId(null)
            }}
            className="w-full px-2 py-1 rounded text-sm bg-surface border border-line text-ink"
          />
        ) : (
          <div
            key={s.id}
            onClick={() => onSelectSession(s.id)}
            onDoubleClick={() => startEditing(s)}
            className={`cursor-pointer px-2 py-1 rounded text-sm text-ink ${
              s.id === currentSessionId ? 'bg-accent-soft font-medium' : 'hover:bg-page'
            }`}
          >
            {s.title}
          </div>
        ),
      )}
    </aside>
  )
}
