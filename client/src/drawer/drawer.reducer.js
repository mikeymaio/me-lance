const initialState = {
        isDrawerOpen: false,
    }


const drawerReducer = (state=initialState, action) => {
    state = state || initialState
    switch(action.type) {
        case 'UPDATE_DRAWER':
            return {
                ...state,
                isDrawerOpen: !state.isDrawerOpen
            }
        default:
            return state;
        }
    }

export default drawerReducer;

