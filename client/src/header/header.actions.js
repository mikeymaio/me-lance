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


const receiveDataFromServer = (data) => ({
  type: 'RECEIVE_USER_DATA',
  data
})

export function handleDrawer() {
    const UPDATE_MODAL = 'UPDATE_DRAWER';
    return {
        type: UPDATE_MODAL,
    }
}

export const handleLogout = (userName) => {
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch('/api/users/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName,
      }),
      credentials: 'include'
    })
    .then(response => response.json())
    .then(res => dispatch(receiveDataFromServer(res)))
  }
}
