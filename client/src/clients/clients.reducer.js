const clientState = {
        isDetailModalOpen: false,
        isAddClientModalOpen: false,
        isLoading: false,
        clients: [
        //     {
        //     id: '12321',
        //     name: 'John Smith',
        //     company: 'John Smith Inc',
        //     address: '4519 Los Feliz Blvd, Los Angeles CA 90027',
        //     email: 'email@email.com',
        //     phone: '555-555-5555',
        // },
        // {
        //     id: '12321',
        //     name: 'Sally Smith',
        //     company: 'Sally Smith Inc',
        //     address: '123 Main St, Los Angeles CA 90026',
        //     email: 'email@email.com',
        //     phone: '555-555-5555',
        // },
        // {
        //     id: '12321',
        //     name: 'John Doe',
        //     company: 'John Doe LLC',
        //     address: '209 Central Ave, Los Angeles CA 90026',
        //     email: 'email@email.com',
        //     phone: '555-555-5555',
        // },
    ],

    }


const clientReducer = (state=clientState, action) => {
    state = state || clientState
    switch(action.type) {
        case 'REQUEST_DATA':
            return {
                ...state,
                isLoading: true
            }
        case 'RECEIVE_CLIENT_DATA':
            return {
                ...state,
                isLoading: false,
                clients: action.clients
            }
        case 'UPDATE_CLIENT_DETAIL_MODAL':
            return {
                ...state,
                isDetailModalOpen: !state.isDetailModalOpen
            }
        case 'UPDATE_ADD_CLIENT_MODAL':
            return {
                ...state,
                isAddClientModalOpen: !state.isAddClientModalOpen
            }
        default:
            return state;
        }
        // return state;
    }

export default clientReducer;

