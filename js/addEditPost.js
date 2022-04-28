import postApi from './api/postApi'
import { toast, registerForm } from './utils'

async function handleFormSubmit(postValue, postId) {
  try {
    const savePost = postId
      ? await postApi.update(postId, postValue)
      : await postApi.add(postValue)

    toast.toastSuccess(
      (!!postId ? 'Edit success' : 'Add success') + ', redirect after 3 seconds'
    )
    setTimeout(() => {
      window.location.assign(`/post-detail.html?id=${savePost.data.id}`)
    }, 3000)
  } catch (err) {
    toast.toastError(
      postId
        ? 'Oops! Occur error when edit post'
        : 'Oops! Occur err when add new post'
    )
  }
}

// MAIN
;(async () => {
  const url = new URL(window.location)
  const postId = url.searchParams.get('id')

  const defaultValue = postId
    ? (await postApi.getById(postId)).data
    : {
        imageUrl: '',
        description: '',
        title: '',
        author: '',
      }

  registerForm({
    formId: 'postForm',
    defaultValue,
    onSubmit: handleFormSubmit,
  })
})()
