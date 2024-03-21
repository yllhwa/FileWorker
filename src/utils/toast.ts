import 'toastify-js/src/toastify.css'
import Toast from 'toastify-js'

export function toast(message: string, type = 'info') {
  const themes: { [key: string]: any } = {
    info: {
      background: '#e9e9eb',
      text: '#909399'
    },
    success: {
      background: '#d4edda',
      text: '#67c23a'
    },
    error: {
      background: '#f8d7da',
      text: '#f56c6c'
    }
  };

  const theme = themes[type];

  return Toast({
    text: message,
    duration: 2000,
    close: false,
    position: 'center',
    style: {
      borderRadius: '5px',
      background: theme.background || '#ffffff',
      fontSize: '14px',
      color: theme.text || '#000000'
    }
  }).showToast()
}
