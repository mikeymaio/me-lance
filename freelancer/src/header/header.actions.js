export function handleSession() {
    const UPDATE_MODAL = 'UPDATE_SESSION';
    return {
        type: UPDATE_MODAL,
    }
}

const requestDataFromAPI = () => ({
  type: 'REQUEST_DATA'
})

const recieveDataFromAPI = (data) => ({
  type: 'RECEIVE_DATA',
  payload: data
})


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

export function handleModal() {
    const UPDATE_MODAL = 'UPDATE_MODAL';
    return {
        type: UPDATE_MODAL,
    }
}

export function handleDrawer() {
    const UPDATE_MODAL = 'UPDATE_DRAWER';
    return {
        type: UPDATE_MODAL,
    }
}

export function handleLoginSlides(value) {
    const UPDATE_MODAL_SLIDE = "UPDATE_MODAL_SLIDE";
    return{
        type: UPDATE_MODAL_SLIDE,
        payload: value
    }
  };
