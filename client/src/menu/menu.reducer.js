const initialState = {
        selectedItem: 'dashboard',
    }


const menuReducer = (state=initialState, action) => {
    state = state || initialState
    switch(action.type) {
        case 'MENU_ITEM_SELECTED':
            return {
                ...state,
                selectedItem: action.payload,
            }
        default:
            return state;
        }
        // return state;
    }

export default menuReducer;

