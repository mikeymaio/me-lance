const initialState = {
        settingsView: '',
        theme: 'light',
    }


const settingsReducer = (state=initialState, action) => {
    state = state || initialState
    switch(action.type) {
        case 'UPDATE_SETTINGS_VIEW':
            return {
                ...state,
                settingsView: action.view,
                // settingsEdit: false,
            }
        case 'UPDATE_THEME':
            return {
                ...state,
                theme: action.theme,
            }
        default:
            return state;
        }
        // return state;
    }

export default settingsReducer;

