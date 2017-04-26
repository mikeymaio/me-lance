const menuState = {
        selectedItem: 'dashboard',
    }


const menuReducer = (state=menuState, action) => {
    state = state || menuState
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

