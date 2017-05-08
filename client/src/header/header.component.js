import React from 'react';
import AppBar from 'material-ui/AppBar';

import DrawerMenu from '../drawer/drawer.component';
import PopoverMenu from '../popover-menu/popover-menu.component';

import TimeTracker from '../time-tracker/time-tracker.component';

import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

import './header.css';


const ToolBar = () => {
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true} style={{marginTop: 0}}>
          <TimeTracker id="timetracker" formId="add-time-form" textColor="#FFF" style={{width: '100%', textAlign: 'center'}}/>
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <PopoverMenu />
        </ToolbarGroup>
      </Toolbar>
    )
};

const Header = () => {
    return (
        <AppBar
          title="Me-Lance"
          style={{padding: 20,}}
          titleStyle={{minWidth: 100}}
          iconElementLeft={<DrawerMenu />}
          iconElementRight={<ToolBar />}
        />
    );
}

export default Header;

