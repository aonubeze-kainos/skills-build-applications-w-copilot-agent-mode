import { apiBaseUrl, readCollectionResponse } from '../api.js'
import { useCollection } from '../hooks/useCollection.js'
import CollectionPage from './CollectionPage.jsx'

const loadWorkouts = (signal) =>
  fetch(`${apiBaseUrl}/api/workouts/`, { signal }).then(readCollectionResponse)

const columns = [
  { key: 'workout', label: 'Workout', render: (item) => <span className="fw-semibold">{item.name ?? 'Workout'}</span> },
  { key: 'category', label: 'Category', render: (item) => item.category ?? '—' },
  { key: 'level', label: 'Level', render: (item) => <span className="badge text-bg-light border text-capitalize">{item.level ?? 'All levels'}</span> },
  { key: 'duration', label: 'Duration', render: (item) => `${item.durationMinutes ?? '—'} min` },
  { key: 'description', label: 'Details', render: (item) => item.description ?? '—' },
]

function Workouts() {
  const collection = useCollection(loadWorkouts)

  return (
    <CollectionPage
      {...collection}
      columns={columns}
      description="Pick a session that fits your energy and experience."
      emptyMessage="No workout suggestions are available yet."
      title="Workouts"
    />
  )
}

export default Workouts
