export const handleUserUpdate = (userName, password, passwordConfirm, email, firstName, lastName, phone, address, userId) => {
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
    .then(res => dispatch(receiveData(res)))
  }
}

const requestDataFromServer = () => ({
  type: 'REQUEST_DATA'
})

// const receiveDataFromServer = (user) => ({
//   type: 'RECEIVE_USER_DATA',
//   user
// })

const receiveData = (res) => ({
  type: 'RECEIVE_DATA',
  res
})