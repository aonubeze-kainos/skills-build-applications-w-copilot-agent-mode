import { apiBaseUrl, readCollectionResponse } from '../api.js'
import { useCollection } from '../hooks/useCollection.js'
import CollectionPage from './CollectionPage.jsx'

const loadUsers = (signal) =>
  fetch(`${apiBaseUrl}/api/users/`, { signal }).then(readCollectionResponse)

const columns = [
  { key: 'name', label: 'Athlete', render: (item) => <span className="fw-semibold">{item.displayName ?? item.username ?? 'Athlete'}</span> },
  { key: 'team', label: 'Team', render: (item) => item.team?.name ?? 'Independent' },
  { key: 'points', label: 'Points', render: (item) => <span className="fw-semibold">{item.points ?? 0}</span> },
]

function Users() {
  const collection = useCollection(loadUsers)

  return (
    <CollectionPage
      {...collection}
      columns={columns}
      description="Meet the people making movement part of their day."
      emptyMessage="No athlete profiles to show yet."
      title="Athletes"
    />
  )
}

export default Users
