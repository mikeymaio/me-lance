
const requestDataFromServer = () => ({
  type: 'REQUEST_DATA'
})

const receiveData = (message) => ({
  type: 'RECEIVE_DATA',
  message
})

const receiveClientDataFromServer = (clients) => ({
  type: 'RECEIVE_CLIENT_DATA',
  clients
})

const updateClientData = (clients) => ({
  type: 'UPDATE_CLIENT_DATA',
  clients
})

export function handleClientView(view) {
    const UPDATE_VIEW = 'UPDATE_CLIENT_VIEW';
    return {
        type: UPDATE_VIEW,
        payload: view
    }
}

export function handleClientEdit() {
    const UPDATE_CLIENT_EDIT = 'UPDATE_CLIENT_EDIT';
    return {
        type: UPDATE_CLIENT_EDIT
    }
}

export const fetchUserClients = (userId) => {
    console.log('fetching your clients')
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch(`/api/clients?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // mode: 'same-origin',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(res => dispatch(receiveClientDataFromServer(res.clients)))
    .then( () => dispatch(receiveData()) )
  }
}

export const handleAddClient = (firstName, lastName, company, phone, email, address, userId) => {
    console.log('handleAddClient fired with client name:', firstName, lastName)
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch('/api/clients', {
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
      }),
      credentials: 'include'
    })
    .then(response => response.json())
    .then(res => {
      dispatch(receiveData(res.message));
      return dispatch(updateClientData(res.client))
    });
  };
};

export const handleUpdateClient = (firstName, lastName, company, phone, email, address, clientId, userId) => {
    console.log('handleUpdateClient fired with client name:', firstName, lastName)
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch(`/api/clients/${clientId}`, {
      method: 'PUT',
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
        clientId
      }),
      credentials: 'include'
    })
    .then(response => response.json())
    .then(res => dispatch(receiveData(res.message)))
    .then( () => dispatch(fetchUserClients(userId))
    )
  }
}




export const handleDeleteClient = (clientId, userId) => {
    console.log('deleting client: ', clientId)
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch(`/api/clients/${clientId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        clientId
      }),
      credentials: 'include'
    })
    .then(response => response.json())
    .then(res => dispatch(receiveData(res.message)))
    .then( () => dispatch(fetchUserClients(userId))
    )
  }
}

export const testLoader = () => ({
  type: 'REQUEST_DATA'
})