import update from 'immutability-helper';

const initialState = {
        //isLoading: false,
        clients: [],
        clientView: 'clientList',
        clientEdit: false,
    }


const clientReducer = (state=initialState, action) => {
    state = state || initialState
    switch(action.type) {
        case 'REQUEST_DATA':
            return {
                ...state,
                //isLoading: true
            }
        case 'COMPLETE_UPDATE':
            return {
                ...state,
                //isLoading: false,
                clientView: 'clientList',
            }
        case 'RECEIVE_CLIENT_DATA':
            return {
                ...state,
                //isLoading: false,
                clients: action.clients,
                clientView: 'clientList',
                clientEdit: false
            }
        case 'UPDATE_CLIENT_DATA':
        return update(state, {
               clients: {
                  $push: [action.clients]
               },
               //isLoading: { $set: false },
               clientView: { $set: 'clientList' }
           })
        case 'UPDATE_CLIENT_VIEW':
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

