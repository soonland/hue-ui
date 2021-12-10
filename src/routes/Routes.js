import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import App from '../App';
import Home from '../components/home/Home';
import LightsView from '../components/lightsView/LightsView';
import RoomsView from '../components/roomsView/RoomsView';
import ZonesView from '../components/zonesView/ZonesView';
import SettingsView from '../components/settingsView/SettingsView';
import NoMatch from '../components/noMatch/NoMatch';

const AppRoute = () => (
  <App>
    <Switch>
      <Redirect from="/" to="/home" exact />
      <Redirect from="/settings" to="/settings/banners" exact />
      <Route path="/home" component={Home} />
      <Route path="/lights" exact component={LightsView} />
      <Route path="/rooms" exact component={RoomsView} />
      <Route path="/zones" exact component={ZonesView} />
      <Route path="/settings/:sectionId" component={SettingsView} />
      <Route path="*" component={NoMatch} />
    </Switch>
  </App>
);

export default AppRoute;
