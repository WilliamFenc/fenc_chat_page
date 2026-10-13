import type { Model } from '../types'

interface HeaderProps{
  models:Model[]
  currentModelId: string
  onSelectModel: (id:string) => void
}

export function Header({
  models,
  currentModelId,
  onSelectModel
}: HeaderProps) {

return (
    <header className="h-12 border-b border-gray-800 px-4 flex items-center">
      <select
        value={currentModelId}
        onChange={(e) => onSelectModel(e.target.value)}
        className="bg-gray-800 rounded px-2 py-1"
      >
        {models.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>
    </header>
)

}



