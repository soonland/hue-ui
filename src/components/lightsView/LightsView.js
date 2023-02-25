import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import Title from 'components/common/Title';
import { CirclePicker } from 'react-color';
import Switch from 'react-switch';
import Light from '../common/Light';
import { getDevicesAction, getDevices } from 'store/slices/devicesSlice';
import { getLightsAction, setStateAction, getLights } from 'store/slices/lightsSlice';
import { getRooms, getRoomsAction, setRoomStateAction } from 'store/slices/roomsSlice';
import { getGroupedLight, getGroupedLightAction, setGroupedLightStateAction } from '../../store/slices/groupedLightSlice';
import DropdownMenu from '../common/DropdownMenu';
import ActionIcon from '../common/ActionIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { updateRoomAction } from '../../store/slices/roomsSlice';

const LightsView = () => {
  const [color, setColor] = useState({ background: '#fff' });
  const dispatch = useDispatch();
  const lights = useSelector(getLights);
  const rooms = useSelector(getRooms);
  const groupedLight = useSelector(getGroupedLight);
  const [unassignedLights, setUnassignedLights] = useState([]);

  const loadData = async () => {
    dispatch(getRoomsAction());
    dispatch(getDevicesAction());
    dispatch(getLightsAction());
    dispatch(getGroupedLightAction());
  };

  useEffect(() => {
    loadData();
  }, []);

  const onClickLight = (action, index) => {
    dispatch(setStateAction({ id: index, rgb: [color.r, color.g, color.b] }));
  };

  const onClickRoom = (id) => {
    dispatch(setGroupedLightStateAction({ id, rgb: [color.r, color.g, color.b] }));
  };

  const handleChangeComplete = (parColor) => {
    setColor({ background: parColor.hex, r: parColor.rgb.r, g: parColor.rgb.g, b: parColor.rgb.b });
  };

  const handleChange = (checked, event, id) => {
    dispatch(setStateAction({ id, on: checked }));
  };

  const handleChangeRoom = (checked, event, id) => {
    dispatch(setGroupedLightStateAction({ id, on: checked })).then(() => dispatch(getLightsAction()));
  };

  const handleSliderChange = (bri, id) => {
    dispatch(setStateAction({ id, bri }));
  };

  useEffect(() => {
    if (rooms && rooms.data && rooms.data.length > 0 && lights && lights.data && lights.data.length > 0) {
      const devicesList = lights.data.map((el) => el.device);
      const assignedLightsList = rooms.data.map((el) => el.children.map((el2) => el2.rid)).flat();
      const l = devicesList.filter((el) => !assignedLightsList.includes(el));
      setUnassignedLights(l);
    }
  }, [rooms, lights]);

  const [value, setValue] = useState('');
  const onChange = (ev) => {
    setValue(ev.target.value);
  };

  const updateRoom = (light) => {
    const currentLights = rooms.data.filter((el) => el.id === value)[0].children;
    const newLights = [...currentLights, { rid: light.device, rtype: 'device' }];
    dispatch(updateRoomAction({ children: newLights, id: value })).then(() => dispatch(getLightsAction()));
  };

  // if (isLoading) return <Loading />;
  return (
    <div>
      <Title level="h1" id="leftMenu.menuItem.lights" />
      <CirclePicker color={color} onChangeComplete={handleChangeComplete} />
      <br />
      {lights &&
        lights.data &&
        rooms &&
        rooms.data &&
        unassignedLights.length > 0 &&
        unassignedLights.map((unassignedLight, index) => {
          const k = `unassigned${index}`;
          const light = lights.data.filter((el) => el.device === unassignedLight)[0];
          const options = rooms.data.map((el) => {
            return { text: el.metadata.name, value: el.id };
          });
          options.unshift({ text: 'veuillez selectionner', value: '', disabled: true });
          return (
            <div key={k} className="room">
              <div className="name">Unassigned Lights</div>
              <Light key={k} handleChange={handleChange} handleSliderChange={handleSliderChange} data={light} index={index} />
              <DropdownMenu options={options} value={value} onChange={onChange} />
              <ActionIcon onClick={() => updateRoom(light)} action="save" index={index}>
                <FontAwesomeIcon icon={faSave} />
              </ActionIcon>
            </div>
          );
        })}
      {lights &&
        rooms &&
        groupedLight &&
        lights.data &&
        rooms.data &&
        groupedLight.data &&
        rooms.data.map((room, index) => {
          const k = `room${index}`;
          const glight = groupedLight.data.filter((el) => el.id === room.services[0].rid)[0];
          return (
            <div key={k} className="room">
              <div className="name">{room.metadata.name}</div>
              <div className="switch">
                <ActionIcon onClick={() => onClickRoom(glight.id)}>
                  <FontAwesomeIcon icon={faLightbulb} />
                </ActionIcon>
                <Switch onChange={handleChangeRoom} checked={glight.on.on || false} id={room.services[0].rid} />
              </div>
              {lights.data.map((light, index) => {
                const k = `id${index}`;
                const roomLights = room.children.filter((el) => el.rid === light.device);
                if (roomLights && roomLights.length > 0) {
                  return (
                    <Light
                      key={k}
                      onClickLight={onClickLight}
                      handleChange={handleChange}
                      handleSliderChange={handleSliderChange}
                      data={light}
                      index={index}
                    />
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
