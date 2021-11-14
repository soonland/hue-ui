import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeLang } from 'store/slices/headerSlice';

const Header = () => {
  const dispatch = useDispatch();
  const menuOptions = [
    { label: 'topMenu.header.home', url: '/home' },
    { label: 'topMenu.header.lights', url: '/lights' },
    { label: 'topMenu.header.groups', url: '/groups' },
    { label: 'topMenu.header.settings', url: '/settings' },
  ];

  const menuHeader = menuOptions.map((data, index) => {
    const url = `${data.url}`;
    const key = index;
    return (
      <div key={key}>
        <NavLink to={url}>
          <FormattedMessage id={data.label} />
        </NavLink>
      </div>
    );
  });

  const handleOnClick = () => {
    dispatch(changeLang());
  };
  return (
    <div className="menuHeader">
      {menuHeader}
      <button type="button" onClick={handleOnClick} className="btn main">
        Click me
      </button>
    </div>
  );
};

export default Header;
