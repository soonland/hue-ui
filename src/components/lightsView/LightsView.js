import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import Title from 'components/common/Title';
import { getLightsAction, setStateAction, getLights } from 'store/slices/lightsSlice';
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
    dispatch(setStateAction({ id: index, rgb: [color.r, color.g, color.b] }));
  };

  const handleChangeComplete = (parColor) => {
    setColor({ background: parColor.hex, r: parColor.rgb.r, g: parColor.rgb.g, b: parColor.rgb.b });
  };

  const handleChange = (checked, event, id) => {
    dispatch(setStateAction({ id, on: checked }));
  };

  const handleSliderChange = (bri, id) => {
    console.log(bri, id);
    dispatch(setStateAction({ id, bri }));
  };

  // if (isLoading) return <Loading />;
  return (
    <div>
      <Title level="h1" id="topMenu.header.lights" />
      <div>{JSON.stringify(color)}</div>
      <CirclePicker color={color} onChangeComplete={handleChangeComplete} />
      {lights &&
        lights.data &&
        lights.data.map((data, index) => {
          const k = `id${index}`;
          return (
            <div key={k} style={{ margin: '1em', display: 'inline-block' }}>
              <Light onClickLight={onClickLight} handleChange={handleChange} handleSliderChange={handleSliderChange} data={data} index={index} />
            </div>
          );
        })}
    </div>
  );
};

export default LightsView;
