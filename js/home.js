import postApi from './api/postApi'
import {
  registerSearch,
  registerPagination,
  renderPagination,
  renderPostList,
} from './utils'

// HANDLE FILTER CHANGE
async function handleFilterChange(filterName, filterValue) {
  // set url search params
  const url = new URL(window.location)
  url.searchParams.set(filterName, filterValue)
  if (filterName === 'title_like') url.searchParams.set('_page', 1)
  window.history.pushState({}, '', url)

  // Fetch api and rerender UI
  const postList = (await postApi.getAll(url.searchParams)).data
  renderPostList('post-list', postList.data)
  renderPagination({
    elementId: 'pagination',
    pagination: postList.pagination,
    onChange: handleFilterChange,
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
  // Get query Params
  const queryParams = getDefaultUrl()

  // Fetch api and render UI
  const response = await postApi.getAll(queryParams)
  const { data, pagination } = response.data

  renderPostList('post-list', data)
  renderPagination({
    elementId: 'pagination',
    pagination,
    onChange: handleFilterChange,
  })

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
})()
