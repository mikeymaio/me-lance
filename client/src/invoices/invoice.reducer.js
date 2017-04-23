const invoiceState = {
        isLoading: false,
        invoiceFilter: 'SHOW_ALL',
        invoiceView: 'invoiceList',
        clientIndex: null,
        projectIndex: null,
        invoiceIndex: null,

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
        case 'SET_INVOICE_FILTER':
            return {
                ...state,
                invoiceFilter: action.filter
            }
        case 'UPDATE_INVOICE_VIEW':
            return {
                ...state,
                invoiceView: action.view,
                clientIndex: action.cIndex,
                projectIndex: action.pIndex,
                invoiceIndex: action.iIndex,
            }
        default:
            return state;
        }
        // return state;
    }

export default invoiceReducer;

