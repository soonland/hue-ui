import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

const LeftMenu = () => {
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

  return <div className="menuHeader">{menuHeader}</div>;
};

export default LeftMenu;
