const leftMenuState = {
        selectedItem: 'dashboard',
    }


const leftMenuReducer = (state=leftMenuState, action) => {
    state = state || leftMenuState
    switch(action.type) {
        case 'MENU_ITEM_SELECTED':
            return {
                ...state,
                selectedItem: action.payload,
            }
        // default:
        //     console.log('No action');
        //     return state;
        }
        return state;
    }

export default leftMenuReducer;

