import * as yup from 'yup'

function setFieldError(field, message) {
  const element = document.querySelector(`[data-id="${field}"]`)
  const feedbackElement =
    element.parentElement.querySelector('.invalid-feedback')
  element.setCustomValidity(message)
  feedbackElement.textContent = message
}

const schema = yup.object().shape({
  author: yup
    .string()
    .required('Please enter author name!')
    .test('at-least-2-words', 'Please enter at least two word', (value) =>
      value.split(' ').length >= 2
    ),
  description: yup.string().required('Please enter post description!'),
  title: yup.string().required('Please enter post title!'),
  imageUrl: yup.string().url().required('Please random image!'),
})

export async function validate(formId, formValue) {
  const form = document.getElementById(formId)
  if (!form) return

  try {
    for (const field of ['title', 'author', 'description', 'imageUrl']) {
      setFieldError(field, '')
    }
    await schema.validate(formValue, { abortEarly: false })
  } catch (err) {
    if (err.name === 'ValidationError' && Array.isArray(err.inner)) {
      const errorLog = {}
      err.inner.forEach((error) => {
        // one field could has one or more error
        // if field has more than 1 error -> error will log last error from error.inner array
        // below is handle for it issue
        if (errorLog[error.path]) return
        setFieldError(error.path, error.message)
        errorLog[error.path] = true
      })
    }
  } finally {
    form.classList.add('was-validated')
    return form.checkValidity()
  }
}
