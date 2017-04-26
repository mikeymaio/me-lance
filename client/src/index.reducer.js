import { combineReducers } from 'redux';
import headerReducer from './header/header.reducer';
import menuReducer from './menu/menu.reducer';
import clientReducer from './clients/clients.reducer';
import invoiceReducer from './invoices/invoice.reducer';
import projectReducer from './projects/projects.reducer';
import loginReducer from './login/login.reducer';
import drawerReducer from './drawer/drawer.reducer';


const rootReducer = combineReducers({
    headerReducer,
    menuReducer,
    clientReducer,
    invoiceReducer,
    projectReducer,
    loginReducer,
    drawerReducer,
});

export default rootReducer;



