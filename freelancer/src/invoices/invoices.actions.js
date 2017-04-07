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

export function handleInvoiceDetailModal() {
    const UPDATE_INVOICE_DETAIL_MODAL = 'UPDATE_INVOICE_DETAIL_MODAL';
    return {
        type: UPDATE_INVOICE_DETAIL_MODAL,
    }
}
