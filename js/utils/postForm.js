import { setHeroImage, randomImage } from './common'
import { validate } from './validate'

function showLoading() {
  const submitBtn = document.getElementById('submitBtn')
  if (!submitBtn) return

  submitBtn.textContent = 'Loading...'
  submitBtn.classList.add('disabled')
}

function hideLoading() {
  const submitBtn = document.getElementById('submitBtn')
  if (!submitBtn) return

  submitBtn.classList.remove('disabled')
  submitBtn.textContent = 'Save'
}

export function registerForm({ formId, defaultValue, onSubmit }) {
  const form = document.getElementById(formId)
  if (!form) return
  const postId = defaultValue.id

  ;['title', 'author', 'description', 'imageUrl'].forEach((field) => {
    setFieldValue(form, `[data-id="${field}"]`, defaultValue[field])
  })
  setHeroImage('hero-image', defaultValue.imageUrl)

  const randomImageBtn = document.querySelector('[data-id="random-image"]')
  randomImageBtn.addEventListener('click', () => {
    const imageUrl = randomImage()
    setFieldValue(form, `[data-id="imageUrl"]`, imageUrl)
    setHeroImage('hero-image', imageUrl)
  })

  let isSubmitting = false

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formValue = getForm(['title', 'author', 'description', 'imageUrl'])
    const isValid = await validate('postForm', formValue)
    if (!isValid) return

    showLoading()
    if (isSubmitting) return
    isSubmitting = true

    await onSubmit(formValue, postId)
    hideLoading()
    isSubmitting = false
  })
}

// SET FORM VALUE
function setFieldValue(parent, query, value) {
  const element = parent.querySelector(query)
  element.value = value
}

function getForm(inputList) {
  const formValue = {}
  inputList.forEach((input) => {
    const inputElement = document.querySelector(`[data-id="${input}"]`)
    formValue[input] = inputElement.value
  })
  return formValue
}
