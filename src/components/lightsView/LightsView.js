import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import Title from 'components/common/Title';
import { getLightsAction, setStateAction, getLights } from 'store/slices/lightsSlice';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { CirclePicker } from 'react-color';
import Light from '../common/Light';

const LightsView = () => {
  const [color, setColor] = useState({ background: '#fff' });
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
    setColor({ background: parColor.hex, r: parColor.rgb.r, g: parColor.rgb.g, b: parColor.rgb.b });
  };

  const handleChange = (checked, event, id) => {
    dispatch(setStateAction({ id: lights[id].data.id, on: checked }));
  };

  const handleSliderChange = (bri, index) => {
    console.log(bri, index);
    dispatch(setStateAction({ id: lights[index].data.id, bri }));
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
              return (
                <Col key={k} style={{ margin: '1em' }}>
                  <Light onClickLight={onClickLight} handleChange={handleChange} handleSliderChange={handleSliderChange} data={data} index={index} />
                </Col>
              );
            })}
        </Row>
      </Grid>
    </div>
  );
};

export default LightsView;
