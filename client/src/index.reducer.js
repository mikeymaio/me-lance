import { combineReducers } from 'redux';
import headerReducer from './header/header.reducer';
import leftMenuReducer from './menu/left-menu.reducer';
import clientReducer from './clients/clients.reducer';
import invoiceReducer from './invoices/invoices.reducer';
import projectReducer from './projects/projects.reducer';
import loginReducer from './login/login.reducer';


const rootReducer = combineReducers({
    headerReducer,
    leftMenuReducer,
    clientReducer,
    invoiceReducer,
    projectReducer,
    loginReducer,
});

export default rootReducer;



