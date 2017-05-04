const initialState = {
        dashboardSlideIndex: 0,
    }


const dashboardReducer = (state=initialState, action) => {
    state = state || initialState
    switch(action.type) {
        case 'UPDATE_DASHBOARD_SLIDE':
            return {
                ...state,
                dashboardSlideIndex: action.payload
            }
        default:
            return state;
        }
        // return state;
    }

export default dashboardReducer;

