import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import Title from 'components/common/Title';
import { CirclePicker } from 'react-color';
import Switch from 'react-switch';
import Light from '../common/Light';
import { getLightsAction, setStateAction, getLights } from 'store/slices/lightsSlice';
import { getRooms, getRoomsAction, setRoomStateAction } from 'store/slices/roomsSlice';
import { getGroupedLight, getGroupedLightAction, setGroupedLightStateAction } from '../../store/slices/groupedLightSlice';

const LightsView = () => {
  const [color, setColor] = useState({ background: '#fff' });
  const dispatch = useDispatch();
  const lights = useSelector(getLights);
  const rooms = useSelector(getRooms);
  const groupedLight = useSelector(getGroupedLight);

  const loadData = async () => {
    dispatch(getRoomsAction());
    dispatch(getLightsAction());
    dispatch(getGroupedLightAction());
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

  const handleChangeRoom = (checked, event, id) => {
    dispatch(setGroupedLightStateAction({ id, on: checked }));
  };

  const handleSliderChange = (bri, id) => {
    dispatch(setStateAction({ id, bri }));
  };

  // if (isLoading) return <Loading />;
  return (
    <div>
      <Title level="h1" id="leftMenu.menuItem.lights" />
      {/* <CirclePicker color={color} onChangeComplete={handleChangeComplete} /> */}
      {lights && rooms && groupedLight &&
        lights.data && rooms.data && groupedLight.data &&
        rooms.data.map((room, index) => {
          const k = `room${index}`;
          const glight = groupedLight.data.filter((el) => el.id === room.services[0].rid)[0];
          return (
            <div key={k} className='room'>
              <div className='name'>{room.metadata.name}</div>
              <div className='switch'>
                <Switch onChange={handleChangeRoom} checked={glight?.on.on || false} id={room.services[0].rid} />
              </div>
              {lights.data.map((light, index) => {
                const k = `id${index}`;
                const roomLights = room.children.filter((el) => el.rid === light.device);
                if (roomLights && roomLights.length > 0) {
                  return (
                    <Light key={k} onClickLight={onClickLight} handleChange={handleChange} handleSliderChange={handleSliderChange} data={light} index={index} />
                  );
                }
                return null;
              })}
            </div>
          );
        })}
    </div>
  );
};

export default LightsView;
