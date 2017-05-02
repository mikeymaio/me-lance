const initialState = {
        startTime: 0,
        stopTime: 0,
    }


const timeTrackerReducer = (state=initialState, action) => {
    state = state || initialState
    switch(action.type) {
        case 'UPDATE_START_TIME':
            return {
                ...state,
                startTime: action.time,
            }
        case 'UPDATE_STOP_TIME':
            return {
                ...state,
                stopTime: action.time,
            }
        case 'TASK_COMPLETED':
            return {
                ...state,
                startTime: 0,
                stopTime: 0,
            }
        default:
            return state;
        }
        // return state;
    }

export default timeTrackerReducer;

