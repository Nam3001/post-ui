export const setTextContent = (parent, query, data) => {
  const element = parent.querySelector(query)
  if (!element) return
  
  element.textContent = data
}

export function setHeroImage(elementId, imageUrl) {
  const heroImage = document.getElementById(elementId)
  heroImage.style.backgroundImage = `url("${imageUrl}")`
  heroImage.style.backgroundSize = 'cover'
}