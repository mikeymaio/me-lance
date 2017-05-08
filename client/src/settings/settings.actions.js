const requestDataFromServer = () => ({
  type: 'REQUEST_DATA'
})

const receiveUserData = user => ({
  type: 'RECEIVE_USER_DATA',
  user
})

const receiveData = message => ({
  type: 'RECEIVE_DATA',
  message
})

const receiveDataFromServer = (user) => ({
  type: 'RECEIVE_USER_DATA',
  user
})

export const handleUserUpdate = (userName, email, firstName, lastName, phone, address, userId) => {
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName,
        email,
        firstName,
        lastName,
        phone,
        address,
        userId
      }),
      credentials: 'include'
    })
    .then(response => response.json())
    .then(res => {
      return dispatch(receiveData(res.message))
      // return dispatch(receiveUserData(res.user))
    })
    // .then( () => dispatch(receiveData()) )
    .then(fetch(`/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    .then( response => response.json() )
    .then( res => dispatch(receiveDataFromServer(res.user)))
    )
  }
};

export const handlePasswordUpdate = (oldPassword, password, userId) => {
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        oldPassword,
        password,
        userId
      }),
      credentials: 'include'
    })
    .then(response => response.json())
    .then(res => {
      return dispatch(receiveUserData(res.user))
    })
    .then( () => dispatch(receiveData()) )
  };
};

export const handleSettingsView = view => {
    const UPDATE_SETTINGS_VIEW = 'UPDATE_SETTINGS_VIEW';
    return {
        type: UPDATE_SETTINGS_VIEW,
        view,
    }
}

export const handleThemeChange = theme => {
    const UPDATE_THEME = 'UPDATE_THEME';
    return {
        type: UPDATE_THEME,
        theme,
    }
}