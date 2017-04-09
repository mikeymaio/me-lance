export function handleSession() {
    const UPDATE_SESSION = 'UPDATE_SESSION';
    return {
        type: UPDATE_SESSION,
    }
}

// const requestDataFromAPI = () => ({
//   type: 'REQUEST_DATA'
// })

// const recieveDataFromAPI = (data) => ({
//   type: 'RECEIVE_DATA',
//   payload: data
// })


// export const fetchDataFromApi = (q) => {
//   return dispatch => {
//     dispatch(requestDataFromAPI())
// //     SC.get('/tracks', {
// //     q: q,
// //     limit: 20,
// //   })
//     .then(response => {
//         dispatch(recieveDataFromAPI(response))})
//     .catch(ex => console.log('parsing failed', ex))
//   }
// }

const requestDataFromAPI = () => ({
  type: 'REQUEST_DATA'
})

const receiveDataFromAPI = (data) => ({
  type: 'RECEIVE_DATA',
  payload: data
})


// export const fetchDataFromApi = (form) => {
//     console.log(form, "has been submitted");
//   return dispatch => {
//     dispatch(requestDataFromAPI())
//     fetch('/api/users/login', {
//   method: 'POST',
//   body: new FormData(form)
// })
//     .then(response => {
//         dispatch(receiveDataFromAPI(response))})
//     .catch(ex => console.log('parsing failed', ex))
//   }
// }

const recieveDataFromServer = (user) => ({
  type: 'RECIEVE_USER_DATA',
  user
})

export const handleLogin = (userName, password) => {
    console.log('handleLogin fired with username:', userName)
  return dispatch => {
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
    .then(user => dispatch(recieveDataFromServer(user)))
  }
}


export function handleLoginModal() {
    const UPDATE_LOGIN_MODAL = 'UPDATE_LOGIN_MODAL';
    return {
        type: UPDATE_LOGIN_MODAL,
    }
}

export function handleDrawer() {
    const UPDATE_MODAL = 'UPDATE_DRAWER';
    return {
        type: UPDATE_MODAL,
    }
}

export function handleLoginSlides(value) {
    const UPDATE_LOGIN_MODAL_SLIDE = "UPDATE_LOGIN_MODAL_SLIDE";
    return{
        type: UPDATE_LOGIN_MODAL_SLIDE,
        payload: value
    }
  };
