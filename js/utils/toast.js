import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

export const toast = {
  toastSuccess(message) {
    Toastify({
      text: message,
      duration: 2000,
      close: true,
      gravity: 'top',
      position: 'right',
      stopOnFocus: true,
      style: {
        background: '#4caf50',
      },
    }).showToast()
  },
  toastError(message) {
    Toastify({
      text: message,
      duration: 2000,
      close: true,
      gravity: 'top',
      position: 'right',
      stopOnFocus: true,
      style: {
        background: '#ef5350',
      },
    }).showToast()
  },
  toastInfo(message) {
    Toastify({
      text: message,
      duration: 2000,
      close: true,
      gravity: 'top',
      position: 'right',
      stopOnFocus: true,
      style: {
        background: '#03a9f4',
      },
    }).showToast()
  }
  
}