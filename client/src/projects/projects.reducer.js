const projectState = {
        isDetailModalOpen: false,
        isLoading: false,

    }


const projectReducer = (state=projectState, action) => {
    state = state || projectState
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
        case 'UPDATE_PROJECT_DETAIL_MODAL':
            return {
                ...state,
                isDetailModalOpen: !state.isDetailModalOpen
            }
        default:
            console.log('No action');
            return state;
        }
        return state;
    }

export default projectReducer;

