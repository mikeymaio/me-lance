import { combineReducers } from 'redux';
import headerReducer from './header/header.reducer';
import leftMenuReducer from './menu/left-menu.reducer';


const rootReducer = combineReducers({
    headerReducer,
    leftMenuReducer,
});

export default rootReducer;



