// REGISTER LIGHT BOX
export function registerLightBox(modalId, album) {
  const modal = document.getElementById(modalId)
  const gallery = document.querySelectorAll(`[data-album="${album}"]`)
  const gallerySrc = []
  if (!gallery || !modal) return

  const modalInner = modal.querySelector('.modal-body')

  var lightbox = new bootstrap.Modal(document.getElementById(modalId))

  let currentImage

  gallery.forEach((image, index) => {
    gallerySrc.push(image.src)
    // Attach event show modal when click image
    image.addEventListener('click', (e) => {
      lightbox.show()
      modalInner.querySelector('img').src = image.src
      currentImage = index
    })
  })

  // Attach event click next and prev
  const next = modalInner.querySelector('.next')
  if (next) {
    next.addEventListener('click', (e) => {
      currentImage = (currentImage + 1) % gallery.length
      modalInner.querySelector('img').src = gallerySrc[currentImage]
    })
  }
  const prev = modalInner.querySelector('.prev')
  prev.addEventListener('click', (e) => {
    currentImage = (currentImage - 1 + gallery.length) % gallery.length
    modalInner.querySelector('img').src = gallerySrc[currentImage]
  })
}