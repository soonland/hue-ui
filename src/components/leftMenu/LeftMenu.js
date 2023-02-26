import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import ActionIcon from '../common/ActionIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faCloudSun } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateWeatherAction, getWeather } from '../../store/slices/headerSlice';
import DropdownMenu from '../common/DropdownMenu';
import { getLightsAction } from 'store/slices/lightsSlice';

const LeftMenu = () => {
  const dispatch = useDispatch();
  const weather = useSelector(getWeather);

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

  const [value, setValue] = useState('');
  const options = [
    {
      text: 'Rimouski', value: '48.45;-68.52'
    },
    {
      text: 'Cuba', value: '22.02;-79.49'
    },
    {
      text: 'Madrid', value: '40.42;-3.70'
    },
    {
      text: 'Anchorage', value: '61.22;-149.90'
    }
  ];

  const onChangeCity = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
    dispatch(updateWeatherAction(event.target.value));
    dispatch(getLightsAction());
  };

  return (
    <div className="leftMenu">
      <FontAwesomeIcon icon={faLightbulb} size="4x" id="logo" />
      <div className="menuHeader">{menuHeader}</div>
      <div className="weather">
        <FontAwesomeIcon icon={faCloudSun} size="3x" id="weatherLogo" />
        <br />
        <DropdownMenu options={options} value={value} onChange={onChangeCity} />
        {weather?.temperature}
      </div>
    </div>
  );
};

export default LeftMenu;
