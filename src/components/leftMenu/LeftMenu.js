import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

const LeftMenu = () => {
  const menuOptions = [
    { label: 'leftMenu.menuItem.home', url: '/' },
    { label: 'leftMenu.menuItem.lights', url: '/lights' },
    { label: 'leftMenu.menuItem.rooms', url: '/rooms' },
    { label: 'leftMenu.menuItem.zones', url: '/zones' },
    { label: 'leftMenu.menuItem.accessories', url: '/accessories' },
    { label: 'leftMenu.menuItem.settings', url: '/settings' },
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

  return <div className="menuHeader">{menuHeader}</div>;
};

export default LeftMenu;
