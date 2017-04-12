
const requestDataFromServer = () => ({
  type: 'REQUEST_DATA'
})

const receiveClientDataFromServer = (clients) => ({
  type: 'RECEIVE_CLIENT_DATA',
  clients
})

const updateClientData = (clients) => ({
  type: 'UPDATE_CLIENT_DATA',
  clients
})

'UPDATE_CLIENT_DATA'

export function handleClientDetailModal() {
    const UPDATE_CLIENT_DETAIL_MODAL = 'UPDATE_CLIENT_DETAIL_MODAL';
    return {
        type: UPDATE_CLIENT_DETAIL_MODAL,
    }
}

export function handleAddClientModal() {
    const UPDATE_ADD_CLIENT_MODAL = 'UPDATE_ADD_CLIENT_MODAL';
    return {
        type: UPDATE_ADD_CLIENT_MODAL,
    }
}

export const handleAddClient = (firstName, lastName, company, phone, email, address, userId) => {
    console.log('handleAddClient fired with client name:', firstName, lastName)
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch('http://localhost:8080/api/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName,
        lastName,
        company,
        phone,
        email,
        address,
        userId
      })
    })
    .then(response => response.json())
    .then(res => {console.log(res); dispatch(updateClientData(res))})
  }
}

export const fetchUserClients = (userId) => {
    console.log('fetching your clients')
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch(`http://localhost:8080/api/clients?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(res => dispatch(receiveClientDataFromServer(res.clients)))
  }
}


export function handleClientView(view) {
    const UPDATE_VIEW = 'UPDATE_VIEW';
    return {
        type: UPDATE_VIEW,
        payload: view
    }
}