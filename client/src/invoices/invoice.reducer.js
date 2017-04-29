const initialState = {
        isLoading: false,
        invoiceFilter: 'SHOW_ALL',
        invoiceView: 'invoiceList',
        invoiceEdit: false,
        clientIndex: null,
        projectIndex: null,
        invoiceIndex: null,

    }


const invoiceReducer = (state=initialState, action) => {
    state = state || initialState
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
                invoiceEdit: false,
            }
        case 'UPDATE_INVOICE_EDIT':
            return {
                ...state,
                invoiceEdit: !state.invoiceEdit,
            }
        default:
            return state;
        }
        // return state;
    }

export default invoiceReducer;

