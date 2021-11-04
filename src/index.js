import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import ReduxProvider from './components/contextProvider/ReduxProvider';
import LanguageProvider from './components/contextProvider/LanguageProvider';
import AppRoute from './routes/Routes';

ReactDOM.render(
  <ReduxProvider>
    <LanguageProvider>
      <Router>
        <AppRoute />
      </Router>
    </LanguageProvider>
  </ReduxProvider>,
  document.getElementById('root')
);
