import * as yup from 'yup'

const schema = yup.object().shape({
  author: yup.string().required('Please enter author name!'),
  description: yup.string().required('Please enter post description!'),
  title: yup.string().required('Please enter post title!'),
  imageUrl: yup.string().url().required('Please random image!')
})

export async function validate(formId, formValue) {
  const form = document.getElementById(formId)
  if (!form) return 

  try {
    await schema.validate(
      formValue,
      {
        abortEarly: false
      }
    )
  } catch(err) {
    err.inner.forEach(error => {
      const element = document.querySelector(`[data-id="${error.path}"]`)
      const feedbackElement = element.parentElement.querySelector('.invalid-feedback')
      element.setCustomValidity(error.message)
      feedbackElement.textContent = error.message
    })
  } finally {
    form.classList.add('was-validated')
    return form.checkValidity()
  }
}