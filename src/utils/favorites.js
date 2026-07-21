const STORAGE_KEY = 'errorfix_favorites'

export function getFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function toggleFavorite(code) {
  const current = getFavorites()
  const next = current.includes(code)
    ? current.filter((c) => c !== code)
    : [...current, code]
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // ignore quota or serialization errors
  }
  return next
}
