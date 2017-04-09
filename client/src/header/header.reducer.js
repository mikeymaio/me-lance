const headerState = {
        isLoggedIn: false,
        isLoginModalOpen: false,
        loginModalSlideIndex: 0,
        isDrawerOpen: false,
        isLoading: false,
        user: null

    }


const headerReducer = (state=headerState, action) => {
    state = state || headerState
    switch(action.type) {
        case 'UPDATE_SESSION':
            return {
                ...state,
                isLoggedIn: !state.isLoggedIn,
            }
        case 'RECIEVE_USER_DATA':
            return {
                ...state,
                user: action.user
            }
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
        case 'UPDATE_LOGIN_MODAL':
            return {
                ...state,
                isLoginModalOpen: !state.isLoginModalOpen
            }
        case 'UPDATE_LOGIN_MODAL_SLIDE':
            return {
                ...state,
                loginModalSlideIndex: action.payload
            }
        case 'UPDATE_DRAWER':
            return {
                ...state,
                isDrawerOpen: !state.isDrawerOpen
            }
        default:
            return state;
        }
        // return state;
    }

export default headerReducer;

