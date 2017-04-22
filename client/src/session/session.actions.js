import fetch from 'isomorphic-fetch'

export function handleSession() {
    const UPDATE_SESSION = 'UPDATE_SESSION';
    return {
        type: UPDATE_SESSION,
    }
}

const requestDataFromServer = () => ({
  type: 'REQUEST_DATA'
})

// const receiveDataFromAPI = (data) => ({
//   type: 'RECEIVE_DATA',
//   payload: data
// })


const receiveDataFromServer = (user) => ({
  type: 'RECEIVE_USER_DATA',
  user
})

const receiveSignUpResponse = (res) => ({
  type: 'RECEIVE_SIGNUP_DATA',
  res
})

export const handleLogin = (userName, password) => {
    console.log('handleLogin fired with username:', userName)
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch('http://localhost:8080/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName,
        password,
      })
    })
    .then(response => response.json())
    .then(user => dispatch(receiveDataFromServer(user)))
  }
}

export const handleSignUp = (userName, password, passwordConfirm, email) => {
    console.log('handleSignup fired with username:', userName)
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch('http://localhost:8080/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName,
        password,
        passwordConfirm,
        email
      })
    })
    .then(response => response.json())
    .then(res => dispatch(receiveSignUpResponse(res)))
  }
}


export function handleLoginModal() {
    const UPDATE_LOGIN_MODAL = 'UPDATE_LOGIN_MODAL';
    return {
        type: UPDATE_LOGIN_MODAL,
    }
}

export function handleLoginSlides(value) {
    const UPDATE_LOGIN_MODAL_SLIDE = "UPDATE_LOGIN_MODAL_SLIDE";
    return{
        type: UPDATE_LOGIN_MODAL_SLIDE,
        payload: value
    }
  };


export const handleLogout = (userName) => {
    console.log('handleLogout fired')
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch('http://localhost:8080/api/users/logout', {
      method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     userName,
    //   })
    credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(res => dispatch(receiveDataFromServer(res)))
  }
}