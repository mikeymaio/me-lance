
const initialState = {
        isLoading: false,
    }


const appReducer = (state=initialState, action) => {
    state = state || initialState
    switch(action.type) {
        case 'REQUEST_DATA':
            return {
                ...state,
                isLoading: true
            }
        case 'RECEIVE_DATA':
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state;
        }
    }

export default appReducer;

