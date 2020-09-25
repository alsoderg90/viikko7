import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state.notification)

  if (notification.message !== null && notification.messageClass !== '') {
    if (notification.messageClass === 'error') {
      return (
        <div className='error'>{notification.message}</div>
      )
    }
    else {
      return (
        <div className='gg'>{notification.message}</div>
      )
    }
  }
  else return null
}

export default Notification