import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import Switch from 'react-switch';
import ActionIcon from './ActionIcon';

const Light = ({ data, onClickLight, handleChange, handleSliderChange }) => {
  const colorLight = data.on.on ? `rgb(${data.rgb.r}, ${data.rgb.g}, ${data.rgb.b})` : 'black';
  return (
    <div className="light">
      <div className="name">{data.name}</div>
      <div className="switch">
        <Switch onChange={handleChange} checked={data.on.on || false} id={data.id} />
      </div>
      <div className="bulb">
        <ActionIcon onClick={onClickLight} action="toggle" index={data.id}>
          <FontAwesomeIcon icon={faLightbulb} size="4x" title={data.name} style={{ color: `${colorLight}` }} />
        </ActionIcon>
      </div>
      <input type="range" min="0" max="100" value={data.brightness} onChange={(e) => handleSliderChange(e.target.value, data.id)} />
      <div className="device">
        Device ID:
        <br />
        {data.device}
      </div>
    </div>
  );
};

export default Light;
