export const setTextContent = (parent, query, data) => {
  const element = parent.querySelector(query)
  if (!element) return
  
  element.textContent = data
}