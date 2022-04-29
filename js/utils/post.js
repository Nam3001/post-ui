import { setTextContent } from './common'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// CREATE POST ITEM
function createPostItem(postData) {
  if (!postData) return

  // Get template
  const template = document.getElementById('post-template')
  if (!template) return

  // Clone liElement node
  const liElement = template.content.firstElementChild.cloneNode(true)

  // custom liElement
  setTextContent(liElement, '[data-id="title"]', postData.title)
  setTextContent(liElement, '[data-id="description"]', postData.description)
  setTextContent(liElement, '[data-id="author"]', postData.author)

  // Set timeSpan
  dayjs.extend(relativeTime)
  setTextContent(
    liElement,
    '[data-id="timeSpan"]',
    `- ${dayjs(postData.updatedAt).fromNow()}`
  )

  const postImage = liElement.querySelector('[data-id="imageUrl"]')
  postImage.src = postData.imageUrl

  // Attach Event
  // Go to edit post page when click edit button
  const editBtn = liElement.querySelector('[data-id="edit"]')
  if (editBtn) {
    editBtn.onclick = () => {
      window.location.assign(`/add-edit-post.html?id=${postData.id}`)
    }
  }

  // Handle delete post when click delete
  const deleteBtn = liElement.querySelector('[data-id="delete"]')
  if (deleteBtn) {
    deleteBtn.onclick = () => {
      // Dispatch custom event and listen this event on home.js
      const deletePostEvent = new CustomEvent('delete-post', {
        detail: {
          postId: postData.id,
        },
        bubbles: true,
      })

      deleteBtn.dispatchEvent(deletePostEvent)
    }
  }

  // Go to post detail when click on liElement
  liElement.onclick = (e) => {
    if (e.target === editBtn || e.target === deleteBtn) return
    window.location.assign(`/post-detail.html?id=${postData.id}`)
  }

  // Add placeholder image occurs error when load image
  postImage.onerror = () => {
    postImage.src = 'https://via.placeholder.com/1368x400?text=Image'
  }

  return liElement
}

// RENDER POST LIST
export function renderPostList(elementId, postList) {
  if (!postList) return

  // Get post list element
  const ulElement = document.getElementById(elementId)
  if (!ulElement) return

  // reset ulElement before render. use when search post
  ulElement.textContent = ''
  ulElement.style.height = 'auto'

  // loop through post list data and create post item, then append it into ulElement
  for (const post of postList) {
    const liElement = createPostItem(post)
    ulElement.appendChild(liElement)
  }
}
