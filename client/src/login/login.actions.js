import fetch from 'isomorphic-fetch'

export function handleSession() {
    const USER_LOGOUT = 'USER_LOGOUT';
    return {
        type: USER_LOGOUT,
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

const receiveData = (message) => ({
  type: 'RECEIVE_DATA',
  message
})

const receiveErrorFromServer = (error) => ({
  type: 'RECEIVE_ERROR',
  error
})

const receiveSignUpResponse = (res) => ({
  type: 'RECEIVE_SIGNUP_DATA',
  res
})

export const handleLogin = (username, password) => {
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: "include"
    })
    .then(response => response.json() )
    .then(res => {
      if (res.user) {
      dispatch(receiveData(res.message));
      return dispatch(receiveDataFromServer(res.user))
    }
    return dispatch(receiveErrorFromServer(res.error))
    })
  }
}

export const handleSignUp = (userName, password, passwordConfirm, email, firstName, lastName, phone, address) => {
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName,
        password,
        passwordConfirm,
        email,
        firstName,
        lastName,
        phone,
        address,
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

export const handleLogout = () => {
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch('/api/users/logout', {
      method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     userName,
    //   })
    credentials: 'include'
    })
    // .then(response => response.json())
    // .then(res => dispatch(receiveDataFromServer(res)))
    .then(() => dispatch(handleSession()))
    .catch( err => alert(err))
  }
}