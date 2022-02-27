import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import CSSReset from '@tds/core-css-reset';
import LeftMenu from 'components/leftMenu/LeftMenu';
import './App.css';

const App = ({ children }) => {
  // const dispatch = useDispatch();

  const loadData = async () => {};

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <CSSReset />
      <div id="content">
        <LeftMenu />
        <div style={{ marginLeft: '160px', marginRight: '25px' }}>{children}</div>
      </div>
    </>
  );
};

export default App;
