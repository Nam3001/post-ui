import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'https://fake-post-api.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosClient.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    config.headers.Authorization = 'Bearer' + accessToken
  }

  return config
}, error => {
  return Promise.reject(error)
})

axiosClient.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

export default axiosClient