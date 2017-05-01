export const handleUserUpdate = (userName, email, firstName, lastName, phone, address, userId) => {
    console.log('handleUserUpdate fired with username:', userName)
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
      return dispatch(receiveUserData(res.user))
    })
    .then( () => dispatch(receiveData()) )
  };
};

const requestDataFromServer = () => ({
  type: 'REQUEST_DATA'
})

// const receiveDataFromServer = (user) => ({
//   type: 'RECEIVE_USER_DATA',
//   user
// })

const receiveUserData = (user) => ({
  type: 'RECEIVE_USER_DATA',
  user
})

const receiveData = () => ({
  type: 'RECEIVE_DATA',
})