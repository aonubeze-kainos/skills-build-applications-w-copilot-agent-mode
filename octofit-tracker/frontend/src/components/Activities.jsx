import { apiBaseUrl, readCollectionResponse } from '../api.js'
import { useCollection } from '../hooks/useCollection.js'
import CollectionPage from './CollectionPage.jsx'

const loadActivities = (signal) =>
  fetch(`${apiBaseUrl}/api/activities/`, { signal }).then(readCollectionResponse)

const columns = [
  { key: 'activity', label: 'Activity', render: (item) => <span className="text-capitalize fw-semibold">{item.type ?? 'Activity'}</span> },
  { key: 'athlete', label: 'Athlete', render: (item) => item.user?.displayName ?? item.user?.username ?? '—' },
  { key: 'duration', label: 'Duration', render: (item) => `${item.durationMinutes ?? '—'} min` },
  { key: 'distance', label: 'Distance', render: (item) => item.distanceKm == null ? '—' : `${item.distanceKm} km` },
  { key: 'points', label: 'Points', render: (item) => <span className="fw-semibold">{item.points ?? 0}</span> },
  {
    key: 'date',
    label: 'Completed',
    render: (item) => item.completedAt ? new Date(item.completedAt).toLocaleDateString() : '—',
  },
]

function Activities() {
  const collection = useCollection(loadActivities)

  return (
    <CollectionPage
      {...collection}
      columns={columns}
      description="Every session counts. See the latest movement from your community."
      emptyMessage="No activities yet. Your next workout can start the streak."
      title="Activities"
    />
  )
}

export default Activities
