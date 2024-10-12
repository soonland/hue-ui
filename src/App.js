import React, { useEffect } from 'react';
import LeftMenu from 'components/leftMenu/LeftMenu';
import './App.css';

const App = ({ children }) => {
  const loadData = async () => {};

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div id="content">
        <LeftMenu />
        <div style={{ marginLeft: '160px', marginRight: '25px' }}>{children}</div>
      </div>
    </>
  );
};

export default App;
