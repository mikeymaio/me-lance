const initialState = {
        isLoggedIn: false,
        isLoginModalOpen: false,
        loginModalSlideIndex: 0,
        user: null,
        signUpRes: null,
        error: '',
    }


const loginReducer = (state=initialState, action) => {
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
                isLoginModalOpen: false,
                isLoggedIn: true,
                error: '',
            }
        case 'RECEIVE_ERROR':
            return {
                ...state,
                error: action.error,
            }
            case 'RECEIVE_SIGNUP_DATA':
            return {
                ...state,
                signUpRes: action.res,
                loginModalSlideIndex: 0
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
        default:
            return state;
        }
        // return state;
    }

export default loginReducer;

