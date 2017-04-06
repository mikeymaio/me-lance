const headerState = {
        isLoggedIn: false,
        isModalOpen: false,
        modalSlideIndex: 0,
        isDrawerOpen: false,
        isLoading: false,

    }


const headerReducer = (state=headerState, action) => {
    state = state || headerState
    switch(action.type) {
        case 'UPDATE_SESSION':
            return {
                ...state,
                isLoggedIn: !state.isLoggedIn,
            }
        case 'REQUEST_DATA':
            return {
                ...state,
                loading: true
            }
        case 'RECEIVE_DATA':
            return {
                ...state,
                loading: false, isLoggedIn: action.payload
            }
        case 'UPDATE_MODAL':
            return {
                ...state,
                isModalOpen: !state.isModalOpen
            }
        case 'UPDATE_MODAL_SLIDE':
            return {
                ...state,
                modalSlideIndex: action.payload
            }
        case 'UPDATE_DRAWER':
            return {
                ...state,
                isDrawerOpen: !state.isDrawerOpen
            }
        default:
            console.log('No action');
            return state;
        }
        return state;
    }

export default headerReducer;

