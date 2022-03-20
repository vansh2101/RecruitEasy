import React from 'react'

function ViewApplication() {
  if (!localStorage.getItem('token')){
      window.location = '/login'
  }

  const id = window.location.hash.replace('#', '')

  return (
    <div>ViewApplication {id}</div>
  )
}

export default ViewApplication