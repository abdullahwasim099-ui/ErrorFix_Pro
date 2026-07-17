import errorCodes from '../../data/windows_error_codes.json'
import bloatware from '../../data/bloatware.json'
import compatibility from '../../data/compatibility.json'

export { errorCodes, bloatware, compatibility }

export const severityOrder = { critical: 0, warning: 1, info: 2 }

export function searchErrors(query) {
  if (!query) return errorCodes
  const q = query.toLowerCase()
  return errorCodes.filter(
    (e) =>
      e.code.toLowerCase().includes(q) ||
      e.issue.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q)
  )
}

export function searchBloatware(query, category) {
  let results = bloatware
  if (query) {
    const q = query.toLowerCase()
    results = results.filter(
      (b) =>
        b.processName.toLowerCase().includes(q) ||
        b.manufacturer.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
    )
  }
  if (category && category !== 'all') {
    results = results.filter((b) => b.category === category)
  }
  return results
}

export function searchCompatibility(query, component) {
  let results = compatibility
  if (component && component !== 'all') {
    results = results.filter((c) => c.component === component)
  }
  if (query) {
    const q = query.toLowerCase()
    results = results.filter(
      (c) => c.question.toLowerCase().includes(q) || c.answer.toLowerCase().includes(q)
    )
  }
  return results
}

export const bloatwareCategories = [...new Set(bloatware.map((b) => b.category))]
export const compatComponents = [...new Set(compatibility.map((c) => c.component))]

export const stats = {
  errorCodes: errorCodes.length,
  bloatware: bloatware.length,
  guides: compatibility.length,
  components: compatComponents.length,
}
