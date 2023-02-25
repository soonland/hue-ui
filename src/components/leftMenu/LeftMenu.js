import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import ActionIcon from '../common/ActionIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faCloudSun } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { updateWeatherAction } from '../../store/slices/headerSlice';

const LeftMenu = () => {
  const dispatch = useDispatch();

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

  const onClickWeatherLogo = () => {
    dispatch(updateWeatherAction());
  };

  return (
    <div className="leftMenu">
      <FontAwesomeIcon icon={faLightbulb} size="4x" id="logo" />
      <div className="menuHeader">{menuHeader}</div>
      <div className="weather">
        <ActionIcon onClick={onClickWeatherLogo} action="edit">
          <FontAwesomeIcon icon={faCloudSun} size="4x" id="weatherLogo" />
        </ActionIcon>
      </div>
    </div>
  );
};

export default LeftMenu;
