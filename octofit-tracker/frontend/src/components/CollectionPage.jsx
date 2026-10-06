function CollectionPage({ title, description, items, loading, error, retry, columns, emptyMessage }) {
  return (
    <section aria-labelledby="collection-title">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-end gap-3 mb-4">
        <div>
          <p className="section-eyebrow mb-2">OCTOFIT TRACKER</p>
          <h1 className="h2 mb-2" id="collection-title">{title}</h1>
          <p className="text-secondary mb-0">{description}</p>
        </div>
        <span className="badge rounded-pill text-bg-light border px-3 py-2">
          {loading ? 'Loading' : `${items.length} ${items.length === 1 ? 'record' : 'records'}`}
        </span>
      </div>

      {error && (
        <div className="alert alert-danger d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2" role="alert">
          <span>{error}</span>
          <button className="btn btn-sm btn-outline-danger align-self-start" onClick={retry} type="button">
            Try again
          </button>
        </div>
      )}

      <div className="card collection-card border-0 shadow-sm">
        {loading ? (
          <div className="d-flex align-items-center gap-3 p-4" role="status">
            <span className="spinner-border spinner-border-sm text-primary" aria-hidden="true" />
            <span>Loading {title.toLowerCase()}…</span>
          </div>
        ) : !error && items.length === 0 ? (
          <p className="text-secondary text-center p-5 mb-0">{emptyMessage}</p>
        ) : !error ? (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  {columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item._id ?? item.id ?? `${title}-${index}`}>
                    {columns.map((column) => (
                      <td key={column.key}>{column.render(item, index)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default CollectionPage
