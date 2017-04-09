const invoiceState = {
        isDetailModalOpen: false,
        isLoading: false,

    }


const invoiceReducer = (state=invoiceState, action) => {
    state = state || invoiceState
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
        case 'UPDATE_INVOICE_DETAIL_MODAL':
            return {
                ...state,
                isDetailModalOpen: !state.isDetailModalOpen
            }
        default:
            return state;
        }
        // return state;
    }

export default invoiceReducer;

