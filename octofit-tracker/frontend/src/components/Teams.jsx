import { apiBaseUrl, readCollectionResponse } from '../api.js'
import { useCollection } from '../hooks/useCollection.js'
import CollectionPage from './CollectionPage.jsx'

const loadTeams = (signal) =>
  fetch(`${apiBaseUrl}/api/teams/`, { signal }).then(readCollectionResponse)

const columns = [
  { key: 'team', label: 'Team', render: (item) => <span className="fw-semibold">{item.name ?? 'Unnamed team'}</span> },
  { key: 'description', label: 'About', render: (item) => item.description || '—' },
  {
    key: 'members',
    label: 'Members',
    render: (item) => Array.isArray(item.members)
      ? item.members.map((member) => member.displayName ?? member.username ?? 'Member').join(', ') || 'No members yet'
      : '—',
  },
  { key: 'points', label: 'Points', render: (item) => <span className="fw-semibold">{item.points ?? 0}</span> },
]

function Teams() {
  const collection = useCollection(loadTeams)

  return (
    <CollectionPage
      {...collection}
      columns={columns}
      description="Find your crew and cheer each other on."
      emptyMessage="No teams have been formed yet."
      title="Teams"
    />
  )
}

export default Teams
