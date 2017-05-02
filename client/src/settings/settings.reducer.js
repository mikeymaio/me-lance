const initialState = {
        settingsView: '',
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
        // case 'UPDATE_INVOICE_EDIT':
        //     return {
        //         ...state,
        //         invoiceEdit: !state.invoiceEdit,
        //     }
        default:
            return state;
        }
        // return state;
    }

export default settingsReducer;

