import postApi from './api/postApi'
import { setHeroImage, setTextContent } from './utils/common'
import dayjs from 'dayjs'

function setPostData(post) {
  setTextContent(document, '#post-detail__title', post.title)
  setTextContent(document, '#post-detail__author', post.author)
  setTextContent(document, '#post-detail__description', post.description)
  setTextContent(
    document,
    '#post-detail__timespan',
    ' - ' + dayjs(post.updatedAt).format('DD/MM/YYYY')
  )
  setHeroImage('hero-image', post.imageUrl)

  document.getElementById('post-detail__description').style.height = 'auto'
}

function registerLightBox(lightboxId, album) {
  const modal = document.getElementById(lightboxId)
  const gallery = document.querySelectorAll(`[data-album="${album}"]`)
  const gallerySrc = []
  if (!gallery || !modal) return

  const modalInner = modal.querySelector('.modal-body')

  var myModal = new bootstrap.Modal(document.getElementById('lightbox'))
  let currentImage

  gallery.forEach((image, i) => {
    gallerySrc.push(image.src)
    image.addEventListener('click', (e) => {
      myModal.show()
      modalInner.querySelector('img').src = image.src
      currentImage = i
    })
  })

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

;(async () => {
  const searchParams = new URLSearchParams(window.location.search)
  const postId = searchParams.get('id')
  const post = (await postApi.getById(postId)).data
  setPostData(post)
  registerLightBox('lightbox', 'lightbox')
})()
