import { Toaster } from 'react-hot-toast'

const Toast = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'rgba(30, 27, 75, 0.95)',
          color: '#fff',
          border: '1px solid rgba(34, 211, 238, 0.3)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
        },
        success: {
          iconTheme: {
            primary: '#22d3ee',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
        },
      }}
    />
  )
}

export default Toast
