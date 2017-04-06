import { combineReducers } from 'redux';
import headerReducer from './header/header.reducer';


const rootReducer = combineReducers({
    headerReducer,
});

export default rootReducer;



