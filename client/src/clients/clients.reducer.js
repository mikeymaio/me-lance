const clientState = {
        isDetailModalOpen: false,
        isLoading: false,

    }


const clientReducer = (state=clientState, action) => {
    state = state || clientState
    switch(action.type) {
        case 'REQUEST_DATA':
            return {
                ...state,
                isLoading: true
            }
        case 'RECEIVE_DATA':
            return {
                ...state,
                isLoading: false, isLoggedIn: action.payload
            }
        case 'UPDATE_CLIENT_DETAIL_MODAL':
            return {
                ...state,
                isDetailModalOpen: !state.isDetailModalOpen
            }
        default:
            return state;
        }
        // return state;
    }

export default clientReducer;

