export const setTextContent = (parent, query, data) => {
  const element = parent.querySelector(query)
  if (!element) return
  
  element.textContent = data
}

export function setHeroImage(elementId, imageUrl) {
  const imageElement = document.getElementById(elementId)
  Object.assign(imageElement.style, {
    backgroundImage: `url("${imageUrl}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  })
}

export function randomImage() {
  const imageId = Math.floor(Math.random() * 800)
  return `https://picsum.photos/id/${imageId}/1368/400`
}