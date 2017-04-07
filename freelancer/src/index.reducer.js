import { combineReducers } from 'redux';
import headerReducer from './header/header.reducer';
import leftMenuReducer from './menu/left-menu.reducer';
import clientReducer from './clients/clients.reducer';
import invoiceReducer from './invoices/invoices.reducer';


const rootReducer = combineReducers({
    headerReducer,
    leftMenuReducer,
    clientReducer,
    invoiceReducer,
});

export default rootReducer;



