import update from 'immutability-helper';

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
    clientView: 'clientList',
    clientEdit: false,

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
                clients: action.clients,
                clientView: 'clientList',
            }
        case 'UPDATE_CLIENT_DATA':
        return update(state, {
               clients: {
                  $push: [action.clients]
               },
               isLoading: { $set: false },
               clientView: { $set: 'clientList' }
           })
                // isLoading: false,
                // clients: [...state.clients, action.clients],
                // clientView: 'clientList',
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
        case 'UPDATE_VIEW':
            return {
                ...state,
                clientView: action.payload,
            }
        case 'UPDATE_CLIENT_EDIT':
            return {
                ...state,
                clientEdit: !state.clientEdit,
            }
        default:
            return state;
        }
        // return state;
    }

export default clientReducer;

