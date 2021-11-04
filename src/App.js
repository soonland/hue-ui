import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import CSSReset from '@tds/core-css-reset';
import Header from 'components/header/Header';
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
      <Header />
      <div id="content">{children}</div>
    </>
  );
};

export default App;
