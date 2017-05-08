
const requestDataFromServer = () => ({
  type: 'REQUEST_DATA'
})

const receiveUserData = (user) => ({
  type: 'RECEIVE_USER_DATA',
  user
})

const receiveData = () => ({
  type: 'RECEIVE_DATA',
})

// export const handleSettingsView = view => {
//     const UPDATE_SETTINGS_VIEW = 'UPDATE_SETTINGS_VIEW';
//     return {
//         type: UPDATE_SETTINGS_VIEW,
//         view,
//     }
// }

export const handleTimerStart = time => {
    const UPDATE_START_TIME = 'UPDATE_START_TIME';
    return {
        type: UPDATE_START_TIME,
        time,
    }
}

export const handleSaveStartTime = (timerStart, timerRunning, userId) => {
    return dispatch => {
    dispatch(requestDataFromServer())
    // dispatch(handleTimerStart(timerStart))

    fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        timerStart,
        timerRunning,
        userId
      }),
      credentials: 'include'
    })
    .then(fetch(`/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    .then( response => response.json() )
    .then( res => dispatch(receiveUserData(res.user)))
    )
    .then( () => dispatch(receiveData()) )
    .catch(err => alert(err))
  }
}


export const handleTimerStop = time => {
    const UPDATE_STOP_TIME = 'UPDATE_STOP_TIME';
    return {
        type: UPDATE_STOP_TIME,
        time,
    }
}

export const handleSaveTimerStop = (time, timerRunning, userId) => {
    return dispatch => {
    dispatch(requestDataFromServer())
    // dispatch(handleTimerStart(timerStart))
    dispatch(handleTimerStop(time))
    fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        timerRunning,
        userId
      }),
      credentials: 'include'
    })
    .then(fetch(`/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    .then( response => response.json() )
    .then( res => dispatch(receiveUserData(res.user)))
    )
    .then( () => dispatch(receiveData()) )
    // .then( () => dispatch(handleTimerStop(time)))
    .catch(err => alert(err))
  }
}

export const handleClearStartTime = userId => {
    return dispatch => {
    dispatch(requestDataFromServer())
    // dispatch(handleTimerStop(timerStop))

    fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        timerStart: 0,
        timerRunning: false,
        userId
      }),
      credentials: 'include'
    })
    .then(fetch(`/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    .then( response => response.json() )
    .then( res => dispatch(receiveUserData(res.user)))
    )
    .then( () => {
        return dispatch(receiveData()) } )
    .catch(err => alert(err))
  }
}

export function handleTimeModal() {
    const UPDATE_TIME_MODAL = 'UPDATE_TIME_MODAL';
    return {
        type: UPDATE_TIME_MODAL,
    }
}