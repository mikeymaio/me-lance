const initialState = {
        statsView: 'TIME_USE',
    }


const chartsReducer = (state=initialState, action) => {
    state = state || initialState
    switch(action.type) {
        case 'UPDATE_STATS_VIEW':
            return {
                ...state,
                statsView: action.view,
                // settingsEdit: false,
            }
        default:
            return state;
        }
        // return state;
    }

export default chartsReducer;

