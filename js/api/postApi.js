import axiosClient from "./axiosClient";

const postApi = {
  getAll(queryParams) {
    return axiosClient.get('/posts', {params: queryParams})
  },
  getById(id) {
    return axiosClient.get(`/posts/${id}`)
  },
  update(id, post) {
    return axiosClient.patch(`/posts/${id}`, post)
  },
  add(newPost) {
    return axiosClient.post('/posts', newPost)
  },
  delete(id) {
    return axiosClient.delete(`/posts/${id}`)
  }
}

export default postApi