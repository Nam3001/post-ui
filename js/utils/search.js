// REGISTER SEARCH
export function registerSearch({ elementId, params, onChange }) {
  const searchInput = document.getElementById(elementId)
  if (!searchInput) return

  // Set search term if title_like exist when start app
  const searchTerm = params.get('title_like')
  if (searchTerm) searchInput.value = searchTerm

  const debounce = useDebounce(500)
  searchInput.addEventListener('input', (event) => {
    debounce(() => onChange('title_like', searchInput.value.toLowerCase()))
  })
}

// DEBOUNCE
function useDebounce(duration) {
  let timeoutId
  return (callback) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      callback()
    }, duration)
  }
}