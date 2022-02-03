import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Title from 'components/common/Title';
import { getZones, getLoading as getLoadingZones, getZonesAction, deleteZoneAction, setZoneStateAction } from 'store/slices/zonesSlice';
import { getLights, getLoading as getLoadingLights, getLightsAction } from 'store/slices/lightsSlice';
import Loading from 'components/common/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ActionIcon from '../common/ActionIcon';

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

  const fetchLightById = (data) => lights.data.filter((el) => data.map((el3) => el3.rid).includes(`${el.id}`)).map((el2) => el2.metadata.name);

  const onClickZone = async (action, index) => {
    if (action === 'delete') {
      dispatch(deleteZoneAction({ id: zones[index].data.id, index }));
    } else if (action === 'switch') {
      dispatch(setZoneStateAction({ id: zones[index].data.id, on: !zones[index].data.state.all_on }));
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

  if (isLoading || isLoadingZone) return <Loading />;
  return (
    <div>
      <Title level="h1" id="leftMenu.menuItem.zones" />
      <table className="ui selectable table">
        <thead>
          <tr>
            <th>
              <FormattedMessage id="zonesView.header.actions" />
            </th>
            <th>
              <FormattedMessage id="zonesView.header.id" />
            </th>
            <th>
              <FormattedMessage id="zonesView.header.groupedLight" />
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
                  <td>{group.id}</td>
                  <td>{group.services.filter((el) => el.rtype === 'grouped_light')[0].rid}</td>
                  <td>{group.metadata.name}</td>
                  <td>{fetchLightById(group.services).join(', ')}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ZonesView;
