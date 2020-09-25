const initialState = { message: null, messageClass: '' }

const notificationReducer = (state = initialState, action) => {
  console.log(action)
  switch(action.type) {
  case 'NOTIFICATION':
    return state = { message: action.message, messageClass: action.messageClass }
  default: return state
  }
}

export const setNotification = (message, messageClass,time) => {
  console.log(message, 'message1', messageClass)
  return dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      message: message,
      messageClass: messageClass
    })
    setTimeout(() => {
      dispatch({
        type:'NOTIFICATION',
        message: '',
        messageClass: ''
      })
    }, time*1000)
  }
}

export default notificationReducer