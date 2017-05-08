const requestDataFromServer = () => ({
  type: 'REQUEST_INVOICE_DATA'
})

const receiveClientDataFromServer = clients => ({
  type: 'RECEIVE_CLIENT_DATA',
  clients
})

const receiveData = message => ({
  type: 'RECEIVE_DATA',
  message
})


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


export const filterInvoices = filter => {
    const SET_INVOICE_FILTER = 'SET_INVOICE_FILTER'
    console.log('filter = ', filter);
    return {
          type: SET_INVOICE_FILTER,
          filter
    }
}

export const handleInvoiceView = ( view, cIndex, pIndex, iIndex ) => {
    const UPDATE_INVOICE_VIEW = 'UPDATE_INVOICE_VIEW';
    return {
        type: UPDATE_INVOICE_VIEW,
        view,
        cIndex,
        pIndex,
        iIndex
    }
}

export function handleInvoiceEdit() {
    const UPDATE_INVOICE_EDIT = 'UPDATE_INVOICE_EDIT';
    return {
        type: UPDATE_INVOICE_EDIT
    }
}

export const handleAddInvoice = (invoiceNo, billingPeriodStart, billingPeriodEnd, tasks, userId, clientId, projectId) => {
    console.log('handleAddInvoicefired: ');
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch(`/api/clients/${clientId}/projects/${projectId}/invoices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        invoiceNo,
        billingPeriodStart,
        billingPeriodEnd,
        tasks,
        clientId
      }),
      credentials: 'include'
    })
    .then(response => response.json())
    .then( res =>  dispatch(receiveData(res.message)))
    .then( () => dispatch(fetchUserClients(userId))
    )
    .then( () => dispatch(handleInvoiceView( "invoiceList", null, null, null )))
    .catch(err => console.log(err))
  }
}



export const handleUpdateInvoice = (tasks, tax, userId, clientId, projectId, invoiceId) => {
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch(`/api/clients/${clientId}/projects/${projectId}/invoices/${invoiceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tasks,
        tax,
        clientId
      }),
      credentials: 'include'
    })
    .then(response => response.json())
    .then( res =>  dispatch(receiveData(res.message)))
    .then( () => dispatch(fetchUserClients(userId))
    )
    .then( () => dispatch(handleInvoiceEdit()))
    .catch( err => console.log(err))
  }
}



export const handleDeleteInvoice = (userId, clientId, projectId, invoiceId) => {
    console.log('deleting project: ', projectId)
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch(`/api/clients/${clientId}/projects/${projectId}/invoices/${invoiceId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        clientId,
        projectId,
        invoiceId
      }),
      credentials: 'include'
    })
    .then(response => response.json())
    .then( res =>  dispatch(receiveData(res.message)))
    .then( () => dispatch(fetchUserClients(userId))
    )
    .then( () => dispatch(handleInvoiceView( "invoiceList", null, null, null )))
    .catch(err => console.log(err))
  }
}
