import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Title from 'components/common/Title';
import { getZones, getLoading as getLoadingZones, getZonesAction, deleteZoneAction, setZoneStateAction } from 'store/slices/zonesSlice';
import { getLights, getLoading as getLoadingLights, getLightsAction } from 'store/slices/lightsSlice';
import Loading from 'components/common/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Field, Form, Formik } from 'formik';
import ActionIcon from '../common/ActionIcon';
import RadioGroupButton from '../common/RadioGroupButton';
import { addNewZoneAction } from '../../store/slices/zonesSlice';
import DropdownMenu from '../common/DropdownMenu';

const ZonesView = () => {
  const dispatch = useDispatch();
  const zones = useSelector(getZones);
  const lights = useSelector(getLights);
  const isLoading = useSelector(getLoadingLights);
  const isLoadingZone = useSelector(getLoadingZones);

  const loadData = async () => {
    dispatch(getLightsAction());
    dispatch(getZonesAction());
  };

  useEffect(() => {
    loadData();
  }, []);

  const fetchLightById = (data) => lights.data.filter((el) => data.map((el3) => el3.rid).includes(`${el.id}`)).map((el2) => el2.name);

  const onClickZone = async (action, index) => {
    if (action === 'delete') {
      dispatch(deleteZoneAction({ id: zones.data[index].id, index }));
    } else if (action === 'switch') {
      dispatch(setZoneStateAction({ id: zones.data[index].id, on: !zones.data[index].state.all_on }));
    }
    // else if (action === 'edit') {
    //   setEditableProducts({
    //     ...editableProducts,
    //     [index]: { ...products[index] },
    //   });
    // } else if (action === 'cancel') {
    //   setEditableProducts({ ...editableProducts, [index]: undefined });
    // } else if (action === 'save') {
    //   dispatch(editProductAction({ data: editableProducts[index], index }));
    //   setEditableProducts({ ...editableProducts, [index]: undefined });
    // }
  };

  const editableActions = (index) => (
    <>
      <ActionIcon onClick={onClickZone} action="edit" index={index}>
        <FontAwesomeIcon icon={faEdit} />
      </ActionIcon>
      <ActionIcon onClick={onClickZone} action="delete" index={index}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </ActionIcon>
      <ActionIcon onClick={onClickZone} action="switch" index={index}>
        {/* <FontAwesomeIcon icon={zones[index].data.state.all_on ? faToggleOn : faToggleOff} /> */}
      </ActionIcon>
    </>
  );

  const onSubmit = (values) => {
    const obj = {
      type: 'zone',
      metadata: {
        archetype: values.zoneType,
        name: values.zoneName,
      },
      children: values.zoneLights.map((el) => ({ rid: el, rtype: 'light' })),
    };
    dispatch(addNewZoneAction(obj));
  };

  if (isLoading || isLoadingZone) return <Loading />;

  let options = [];
  if (lights && lights.data) {
    options = lights.data.map((el) => ({ text: el.name, value: el.id }));
  }

  let optionsZone = 'living room, kitchen, dining, bedroom, kids_bedroom, bathroom, nursery, recreation, office, gym, hallway, toilet, front_door, garage, terrace, garden, driveway, carport, home, downstairs, upstairs, top_floor, attic, guest_room, staircase, lounge, man_cave, computer, studio, music, tv, reading, closet, storage, laundry_room, balcony, porch, barbecue, pool, other'.split(', ').sort();
  optionsZone = optionsZone.map(el => ({ text: el, value: el }));
  return (
    <div>
      <Title level="h1" id="leftMenu.menuItem.zones" />
      <Formik initialValues={{ zoneName: 'test', zoneLights: [] }} onSubmit={onSubmit}>
        <Form>
          <Field name="zoneName" placeholder="Zone name" />
          <Field as={RadioGroupButton} name="zoneLights" options={options} />
          <Field as={DropdownMenu} name="zoneType" options={optionsZone} />
          <button type="submit">Go</button>
        </Form>
      </Formik>
      <table className="ui selectable table">
        <thead>
          <tr>
            <th>
              <FormattedMessage id="zonesView.header.actions" />
            </th>
            <th>
              <FormattedMessage id="zonesView.header.type" />
            </th>
            <th>
              <FormattedMessage id="zonesView.header.name" />
            </th>
            <th>
              <FormattedMessage id="zonesView.header.lights" />
            </th>
          </tr>
        </thead>
        <tbody>
          {zones &&
            zones.data &&
            zones.data.map((group, index) => {
              const k = `id${index}`;
              return (
                <tr key={k}>
                  <td>{editableActions(index)}</td>
                  <td>{group.metadata.archetype}</td>
                  <td>{group.metadata.name}</td>
                  <td>{fetchLightById(group.children).join(', ')}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ZonesView;
