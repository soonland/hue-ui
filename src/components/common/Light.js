import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import Switch from 'react-switch';
import Slider from '@reach/slider';
import ActionIcon from './ActionIcon';
import '@reach/slider/styles.css';

const Light = ({ data, onClickLight, handleChange, handleSliderChange, index }) => {
  const colorLight = data.on.on ? `rgb(${data.rgb.r}, ${data.rgb.g}, ${data.rgb.b})` : 'black';
  return (
    <>
      <ActionIcon onClick={onClickLight} action="toggle" index={data.id}>
        <FontAwesomeIcon icon={faLightbulb} size="4x" title={data.metadata.name} style={{ color: `${colorLight}` }} />
      </ActionIcon>
      <div>{data.metadata.name}</div>
      <Switch onChange={handleChange} checked={data.on.on || false} id={data.id} />
      <Slider
        onChange={(bri) => handleSliderChange(bri, data.id)}
        min={0}
        max={100}
        step={5}
        orientation="vertical"
        value={data.dimming.brightness}
        id={`${index}`}
      />
    </>
  );
};

export default Light;
