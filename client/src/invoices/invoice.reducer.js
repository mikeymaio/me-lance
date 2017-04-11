const invoiceState = {
        isDetailModalOpen: false,
        isLoading: false,
        invoiceFilter: 'SHOW_ALL',
        invoices: [
        {
            id: '12321',
            client: 'John Smith',
            project: 'John\'s Website',
            date: '4/21/17',
            hours: '5',
            status: 'in progress',
            completed: false,
        },
        {
            id: '12322',
            client: 'Sally Smith',
            project: 'Another website',
            date: '4/22/17',
            hours: '5',
            status: 'in progress',
            completed: false,
        },
        {
            id: '12323',
            client: 'John Doe',
            project: 'another website',
            date: '4/23/17',
            hours: '5',
            status: 'completed',
            completed: true,
        },
        ]

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
        case 'SET_INVOICE_FILTER':
            return {
                ...state,
                invoiceFilter: action.filter
            }
        default:
            return state;
        }
        // return state;
    }

export default invoiceReducer;

