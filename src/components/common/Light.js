import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import Switch from 'react-switch';
import Slider from '@reach/slider';
import ActionIcon from './ActionIcon';
import '@reach/slider/styles.css';

const Light = ({ data, onClickLight, handleChange, handleSliderChange, index }) => {
  const colorLight = data.data.state.on ? `rgb(${data.rgb[0]}, ${data.rgb[1]}, ${data.rgb[2]})` : 'black';
  return (
    <>
      <ActionIcon onClick={onClickLight} action="toggle" index={index}>
        <FontAwesomeIcon icon={faLightbulb} size="4x" title={data.data.name} style={{ color: `${colorLight}` }} />
      </ActionIcon>
      <div>{data.data.name}</div>
      <Switch onChange={handleChange} checked={data.data.state.on || false} id={`${index}`} />
      <Slider min={0} max={256} step={5} orientation="vertical" value={data.data.state.bri} onChange={handleSliderChange} />
    </>
  );
};

export default Light;
