export const setTextContent = (parent, query, data) => {
  const element = parent.querySelector(query)
  if (!element) return
  
  element.textContent = data
}

export function setBackgroundImage(elementId, imageUrl) {
  const imageElement = document.getElementById(elementId)
  Object.assign(imageElement.style, {
    backgroundImage: `url("${imageUrl}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  })
}