const initialState = {
        isLoggedIn: false,
        isLoginModalOpen: false,
        loginModalSlideIndex: 0,
        isLoading: false,
        user: null,
        signUpRes: null,
        view: 'dashboard'
    }


const sessionReducer = (state=initialState, action) => {
    state = state || initialState
    switch(action.type) {
        case 'UPDATE_SESSION':
            return {
                ...state,
                isLoggedIn: !state.isLoggedIn,
            }
        case 'RECEIVE_USER_DATA':
            return {
                ...state,
                user: action.user,
                isLoading: false,
                isLoginModalOpen: false,
                isLoggedIn: true
            }
            case 'RECEIVE_SIGNUP_DATA':
            return {
                ...state,
                signUpRes: action.res,
                isLoading: false,
                loginModalSlideIndex: 0
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
        case 'UPDATE_VIEW':
            return {
                ...state,
                view: action.view
            }
        default:
            return state;
        }
        // return state;
    }

export default sessionReducer;

