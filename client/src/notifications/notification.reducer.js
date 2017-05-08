const initialState = {
        isNotificationOpen: false,
        message: '',
    }


const notificationReducer = (state=initialState, action) => {
    state = state || initialState
    switch(action.type) {
        case 'RECEIVE_DATA':
        if (state.mesage === action.message) {
            return {
                ...state
            }
        }
            return {
                ...state,
                isNotificationOpen: true,
                message: action.message,
        }
        case 'RECEIVE_ERROR':
            return {
                ...state,
                isNotificationOpen: true,
                message: action.error,
            }
        case 'UPDATE_NOTIFICATION':
            return {
                ...state,
                isNotificationOpen: false
            }
        default:
            return state;
        }
    }

export default notificationReducer;

