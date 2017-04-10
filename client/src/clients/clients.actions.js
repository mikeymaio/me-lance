
const requestDataFromServer = () => ({
  type: 'REQUEST_DATA'
})

const receiveDataFromServer = (clients) => ({
  type: 'RECEIVE_CLIENT_DATA',
  clients
})

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

export const handleAddClient = (clientName, company, phone, email, address) => {
    console.log('handleAddClient fired with client name:', clientName)
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch('http://localhost:8080/api/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        clientName,
        company,
        phone,
        email,
        address
      })
    })
    .then(response => response.json())
    .then(client => dispatch(receiveDataFromServer(client)))
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
    .then(res => dispatch(receiveDataFromServer(res.clients)))
  }
}