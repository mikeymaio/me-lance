import { combineReducers } from 'redux';
import headerReducer from './header/header.reducer';
import menuReducer from './menu/menu.reducer';
import clientReducer from './clients/clients.reducer';
import invoiceReducer from './invoices/invoice.reducer';
import projectReducer from './projects/projects.reducer';
import loginReducer from './login/login.reducer';
import drawerReducer from './drawer/drawer.reducer';
import appReducer from './app/app.reducer';
import settingsReducer from './settings/settings.reducer';
import chartsReducer from './dashboard/charts/charts.reducer';
import timeTrackerReducer from './time-tracker/time-tracker.reducer'


const indexReducer = combineReducers({
    appReducer,
    headerReducer,
    menuReducer,
    clientReducer,
    invoiceReducer,
    projectReducer,
    loginReducer,
    drawerReducer,
    settingsReducer,
    chartsReducer,
    timeTrackerReducer
});


const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }
  return indexReducer(state, action)
}

export default rootReducer;



