const codespaceName = import.meta.env?.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export async function readCollectionResponse(response) {
  if (!response.ok) {
    throw new Error(`API request failed (${response.status} ${response.statusText})`)
  }

  const payload = await response.json()
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    for (const key of ['results', 'data', 'items']) {
      if (Array.isArray(payload[key])) {
        return payload[key]
      }
      if (payload[key] && Array.isArray(payload[key].results)) {
        return payload[key].results
      }
    }
  }

  throw new TypeError('API response must be an array or a paginated collection')
}
