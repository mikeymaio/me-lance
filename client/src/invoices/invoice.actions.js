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




const requestDataFromServer = () => ({
  type: 'REQUEST_INVOICE_DATA'
})

// const receiveProjectDataFromServer = (projects) => ({
//   type: 'RECEIVE_PROJECT_DATA',
//   projects
// })

const receiveClientDataFromServer = (clients) => ({
  type: 'RECEIVE_CLIENT_DATA',
  clients
})



// const updateInvoiceData = (invoices) => ({
//   type: 'UPDATE_INVOICE_DATA',
//   invoices
// })



export const handleAddInvoice = (billingPeriodStart, billingPeriodEnd, tasks, userId, clientId, projectId) => {
    console.log('handleAddInvoicefired: ');
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch(`http://localhost:8080/api/clients/${clientId}/projects/${projectId}/invoices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        billingPeriodStart,
        billingPeriodEnd,
        tasks,
        clientId
      }),
      credentials: 'same-origin'
    })
    // .then(response => response.json())
    // .then(() =>  dispatch(addClientSuccess()))
    .then(fetch(`http://localhost:8080/api/clients?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(res => dispatch(receiveClientDataFromServer(res.clients))))
    .then( () => dispatch(handleInvoiceView( "invoiceList", null, null, null )))
    .catch(err => console.log(err))
  }
}



export const handleUpdateInvoice = (tasks, userId, clientId, projectId, invoiceId) => {
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch(`http://localhost:8080/api/clients/${clientId}/projects/${projectId}/invoices/${invoiceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tasks,
        clientId
      }),
      credentials: 'same-origin'
    })
    // .then( () => dispatch(handleInvoiceEdit()))
    .then(fetch(`http://localhost:8080/api/clients?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(res => dispatch(receiveClientDataFromServer(res.clients))))
    .then( () => dispatch(handleInvoiceView( "invoiceList", null, null, null )))
    .catch( err => console.log(err))
  }
}



export const handleDeleteInvoice = (userId, clientId, projectId, invoiceId) => {
    console.log('deleting project: ', projectId)
  return dispatch => {
    dispatch(requestDataFromServer())

    fetch(`http://localhost:8080/api/clients/${clientId}/projects/${projectId}/invoices/${invoiceId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        clientId,
        projectId,
        invoiceId
      }),
      credentials: 'same-origin'
    })
    // .then(response => response.text())
    .then(fetch(`http://localhost:8080/api/clients?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(res => dispatch(receiveClientDataFromServer(res.clients))))
    .then( () => dispatch(handleInvoiceView( "invoiceList", null, null, null )))
    .catch(err => console.log(err))
  }
}
