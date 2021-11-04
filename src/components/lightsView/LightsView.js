import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import Title from 'components/common/Title';
import { getLightsAction, setStateAction, getLights } from 'store/slices/lightsSlice';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { CirclePicker } from 'react-color';
import Switch from 'react-switch';
import Slider from '@reach/slider';
import ActionIcon from '../common/ActionIcon';
import '@reach/slider/styles.css';

const LightsView = () => {
  const [color, setColor] = useState({ background: '#fff' });
  const [lightState, setLightState] = useState([]);
  const dispatch = useDispatch();
  const lights = useSelector(getLights);

  const loadData = async () => {
    dispatch(getLightsAction());
  };

  useEffect(() => {
    loadData();
  }, []);

  const onClickLight = (action, index) => {
    dispatch(setStateAction({ id: lights[index].data.id, rgb: [color.r, color.g, color.b] }));
  };

  const handleChangeComplete = (parColor) => {
    console.log(parColor);
    setColor({ background: parColor.hex, r: parColor.rgb.r, g: parColor.rgb.g, b: parColor.rgb.b });
  };

  const handleChange = (checked, event, id) => {
    setLightState({ ...lightState, [parseInt(id, 10)]: checked });
    dispatch(setStateAction({ id: lights[id].data.id, on: checked }));
  };

  const handleSliderChange = (newValue) => {
    console.log(newValue);
    // setBrightness(newValue);
  };

  // if (isLoading) return <Loading />;
  return (
    <div>
      <Title level="h1" id="topMenu.header.lights" />
      <div>{JSON.stringify(color)}</div>
      <CirclePicker color={color} onChangeComplete={handleChangeComplete} />
      <Grid fluid>
        <Row>
          {lights &&
            lights.map((data, index) => {
              const k = `id${index}`;
              const colorLight = data.data.state.on ? `rgb(${data.rgb[0]}, ${data.rgb[1]}, ${data.rgb[2]})` : 'black';
              return (
                <Col key={k} style={{ margin: '1em' }}>
                  <ActionIcon onClick={onClickLight} action="toggle" index={index}>
                    <FontAwesomeIcon icon={faLightbulb} size="4x" title={data.data.name} style={{ color: `${colorLight}` }} />
                  </ActionIcon>
                  <div>{data.data.name}</div>
                  <Switch onChange={handleChange} checked={lights[index].data.state.on || false} id={`${index}`} />
                  <Slider min={0} max={100} step={5} orientation="vertical" value={data.data.state.bri} onChange={handleSliderChange} />
                </Col>
              );
            })}
        </Row>
      </Grid>
    </div>
  );
};

export default LightsView;
