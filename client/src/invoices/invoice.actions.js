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

