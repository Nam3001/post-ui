import postApi from './api/postApi'
import {
  registerSearch,
  registerPagination,
  renderPagination,
  renderPostList,
  toast,
} from './utils'

// HANDLE FILTER CHANGE
async function handleFilterChange(filterName, filterValue) {
  // set url search params
  const url = new URL(window.location)

  // if not pass argument, not set search params
  if (filterName) url.searchParams.set(filterName, filterValue)
  // set _page = 1 when search post
  if (filterName === 'title_like') url.searchParams.set('_page', 1)
  window.history.pushState({}, '', url)

  // Fetch api and rerender post / render pagination
  const postList = (await postApi.getAll(url.searchParams)).data
  renderPostList('post-list', postList.data)
  renderPagination({
    elementId: 'pagination',
    pagination: postList.pagination,
    onChange: handleFilterChange,
  })
}

function registerDeletePost() {
  document.addEventListener('delete-post', (e) => {
    var removePostModal = new bootstrap.Modal(
      document.getElementById('remove-post')
    )
    removePostModal.show()
    const confirmButton = removePostModal._element.querySelector('.confirm')

    const enterToConfirm = (event) => {
      if (event.key !== 'Enter') return
      handleDeletePost()
    }

    async function handleDeletePost() {
      try {
        confirmButton.textContent = 'Deleting...'
        confirmButton.classList.add('disabled')

        await postApi.delete(e.detail.postId)

        handleFilterChange()
        toast.toastSuccess('Post was deleted!')
      } catch (err) {
        toast.toastError("Couldn't delete post, " + err.message)
      } finally {
        removePostModal.hide()
        confirmButton.textContent = 'Confirm'
        confirmButton.classList.remove('disabled')
        confirmButton.removeEventListener('click', handleDeletePost)
        document.removeEventListener('keydown', enterToConfirm)
      }
    }
    confirmButton.addEventListener('click', handleDeletePost)
    document.addEventListener('keydown', enterToConfirm)
  })
}

// GET DEFAULT URL
function getDefaultUrl() {
  // Vars
  const url = new URL(window.location)
  const page = url.searchParams.get('_page')
  const limit = url.searchParams.get('_limit')

  // Set default page and limit
  if (!page) url.searchParams.set('_page', 1)
  if (!limit) url.searchParams.set('_limit', 6)

  window.history.pushState({}, '', url)

  return url.searchParams
}

// MAIN
;(async () => {
  try {
    // Get query Params
    const queryParams = getDefaultUrl()

    // Fetch api and render UI
    const response = await postApi.getAll(queryParams)
    const { pagination } = response.data

    // render post list and render pagination
    handleFilterChange()

    registerSearch({
      elementId: 'search',
      params: queryParams,
      onChange: handleFilterChange,
    })
    registerPagination({
      elementId: 'pagination',
      pagination,
      onChange: handleFilterChange,
    })
    registerDeletePost()

    // Handle go to add new post page
    const addPost = document.querySelector('.add-post')
    addPost.addEventListener('click', (e) => {
      e.preventDefault()
      window.location.assign('/add-edit-post.html')
    })
  } catch (err) {
    console.error(err)
  }
})()
