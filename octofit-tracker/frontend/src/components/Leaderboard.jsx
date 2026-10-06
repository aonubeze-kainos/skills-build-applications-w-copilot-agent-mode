import { apiBaseUrl, readCollectionResponse } from '../api.js'
import { useCollection } from '../hooks/useCollection.js'
import CollectionPage from './CollectionPage.jsx'

const loadLeaderboard = (signal) =>
  fetch(`${apiBaseUrl}/api/leaderboard/`, { signal }).then(readCollectionResponse)

const columns = [
  { key: 'rank', label: 'Rank', render: (_item, index) => <span className="rank-number">{index + 1}</span> },
  {
    key: 'name',
    label: 'Athlete or team',
    render: (item) => item.user?.displayName ?? item.team?.name ?? item.user?.username ?? 'Participant',
  },
  { key: 'period', label: 'Period', render: (item) => item.period ?? '—' },
  { key: 'points', label: 'Points', render: (item) => <span className="fw-bold">{item.points ?? 0}</span> },
]

function Leaderboard() {
  const collection = useCollection(loadLeaderboard)

  return (
    <CollectionPage
      {...collection}
      columns={columns}
      description="Friendly competition to celebrate consistent effort."
      emptyMessage="The leaderboard is ready for its first points."
      title="Leaderboard"
    />
  )
}

export default Leaderboard
