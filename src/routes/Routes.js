import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import Home from '../components/home/Home';
import LightsView from '../components/lightsView/LightsView';
import RoomsView from '../components/roomsView/RoomsView';
import ZonesView from '../components/zonesView/ZonesView';
import SettingsView from '../components/settingsView/SettingsView';
import NoMatch from '../components/noMatch/NoMatch';
import AccessoriesView from '../components/accessoriesView/AccessoriesView';

const AppRoute = () => (
  <App>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lights" element={<LightsView />} />
      <Route path="/rooms" element={<RoomsView />} />
      <Route path="/rooms" element={<RoomsView />} />
      <Route path="/zones" element={<ZonesView />} />
      <Route path="/accessories" element={<AccessoriesView />} />
      <Route path="/settings" element={<SettingsView />} />
      <Route path="/settings/:sectionId" element={<SettingsView />} />
      <Route path="*" component={NoMatch} />
    </Routes>
  </App>
);

export default AppRoute;
