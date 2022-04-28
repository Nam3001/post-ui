import postApi from './api/postApi'
import { setHeroImage, setTextContent, registerLightBox } from './utils'
import dayjs from 'dayjs'

// SET POST
function setPost(post) {
  setTextContent(document, '#post-detail__title', post.title)
  setTextContent(document, '#post-detail__author', post.author)
  setTextContent(document, '#post-detail__description', post.description)
  setTextContent(
    document,
    '#post-detail__timespan',
    ' - ' + dayjs(post.updatedAt).format('DD/MM/YYYY')
  )
  setHeroImage('hero-image', post.imageUrl)

  // Reduce cls
  document.getElementById('post-detail__description').style.height = 'auto'
}

// MAIN
;(async () => {
  const searchParams = new URLSearchParams(window.location.search)
  const postId = searchParams.get('id')
  const post = (await postApi.getById(postId)).data
  setPost(post)
  registerLightBox('lightbox', 'lightbox')

  const editPost = document.querySelector('.edit-post-btn')
  editPost.addEventListener('click', e => {
    e.preventDefault()
    window.location.assign(`/add-edit-post.html?id=${postId}`)
  })
})()
