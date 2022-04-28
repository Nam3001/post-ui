// PAGINATION
export function registerPagination({ elementId, pagination, onChange }) {
  // Get pagination list
  const ulPagination = document.getElementById(elementId)
  if (!ulPagination) return

  // Calculate total pages
  const { _page, _limit, _totalRows } = pagination
  const totalPages = Math.ceil(_totalRows / _limit)

  // Get current page
  // Attach event for next and previous button
  let queryParams = null
  let currentPage = _page

  const nextBtn = ulPagination.querySelector('[data-id="next"]')
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault()
      queryParams = new URLSearchParams(window.location.search)
      currentPage = Number.parseInt(queryParams.get('_page'))
      if (currentPage >= totalPages) return
      
      currentPage += 1
      onChange('_page', currentPage)
    })
  }
  
  const prevBtn = document.querySelector('[data-id="prev"]')
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault()
      queryParams = new URLSearchParams(window.location.search)
      currentPage = Number.parseInt(queryParams.get('_page'))
      if (currentPage <= 1) return

      currentPage -= 1
      onChange('_page', currentPage)
    })
  }
}

// RENDER PAGINATION
export function renderPagination({ elementId, pagination, onChange }) {
  const ulPagination = document.getElementById(elementId)
  if (!ulPagination) return 

  const nextBtn = ulPagination.querySelector('[data-id="next"]')
  const prevBtn = ulPagination.querySelector('[data-id="prev"]')

  // Calculate total pages
  const { _page, _limit, _totalRows } = pagination
  const totalPages = Math.ceil(_totalRows / _limit)

  // Remove page number before rerender
  Array.from(ulPagination.children).forEach(element => {
    if (element === nextBtn || element === prevBtn) return
    element.remove()
  })

  // Disable next btn and prev btn if need
  if (_page <= 1) {
    prevBtn.classList.add('disabled')
  } else {
    prevBtn.classList.remove('disabled')
  }

  if (_page >= totalPages) {
    nextBtn.classList.add('disabled')
  } else {
    nextBtn.classList.remove('disabled')
  }

  // Render page number
  const range = handlePagination(_page, totalPages)
  for (const page of range) {
    const pageElement = createPageBtn(page, _page, onChange)
    ulPagination.appendChild(pageElement)
  }
  ulPagination.appendChild(nextBtn)
}

function createPageBtn(value,currentPage, onChange) {
  // Create li element
  const liElement = document.createElement('li')
  liElement.classList.add('page-item')

  // If value === ellipsis, disable btn
  if (typeof value !== 'number') liElement.classList.add('disabled')
  if (currentPage === value) liElement.classList.add('active')

  // Create page link
  const pageLink = document.createElement('a')
  pageLink.classList.add('page-link')
  pageLink.textContent = value
  pageLink.href = '#'
  liElement.appendChild(pageLink)

  // Attach event for li element
  liElement.addEventListener('click', e => {
    e.preventDefault()
    // If target is ellipsis btn, return
    if (!Number(e.target.textContent)) return
    
    onChange('_page', value)
  })

  return liElement
}

// RETURN THE PAGE NUMBER USE TO DISPLAY ON SCREEN
function handlePagination(currentPage, quantity, maxPage = 4) {
  let current = currentPage,
    last = quantity,
    left,
    right,
    range = [],
    nearLeft = Math.floor(maxPage / 2),
    nearRight = last - Math.ceil(maxPage / 2)

  if (current <= nearLeft) {
    left = 1
    right = maxPage
  } else if (current >= nearRight) {
    left = last - maxPage + 1
    right = last
  } else {
    left = current - nearLeft + 1
    right = current + nearLeft - 1
  }

  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || (i >= left && i <= right)) {
      range.push(i)
    }
  }

  if (range[1] > 2) range.splice(1, 0, '…')
  else if (range[range.length - 2] < last - 1) range.splice(range.length - 1, 0, '…')

  return range
}