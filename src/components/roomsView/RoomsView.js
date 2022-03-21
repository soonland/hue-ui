import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Title from 'components/common/Title';
import { getRooms, getLoading as getLoadingRooms, getRoomsAction, deleteRoomAction, setRoomStateAction } from 'store/slices/roomsSlice';
import { getLights, getLoading as getLoadingLights, getLightsAction } from 'store/slices/lightsSlice';
import Loading from 'components/common/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ActionIcon from '../common/ActionIcon';

const RoomsView = () => {
  const dispatch = useDispatch();
  const rooms = useSelector(getRooms);
  const lights = useSelector(getLights);
  const isLoading = useSelector(getLoadingLights);
  const isLoadingRoom = useSelector(getLoadingRooms);

  const loadData = async () => {
    dispatch(getLightsAction());
    dispatch(getRoomsAction());
  };

  useEffect(() => {
    loadData();
  }, []);

  const fetchLightById = (data) => lights.data.filter((el) => data.map((el3) => el3.rid).includes(`${el.id}`)).map((el2) => el2.name);

  const onClickRoom = async (action, index) => {
    if (action === 'delete') {
      dispatch(deleteRoomAction({ id: rooms[index].data.id, index }));
    } else if (action === 'switch') {
      dispatch(setRoomStateAction({ id: rooms[index].data.id, on: !rooms[index].data.state.all_on }));
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
      <ActionIcon onClick={onClickRoom} action="edit" index={index}>
        <FontAwesomeIcon icon={faEdit} />
      </ActionIcon>
      <ActionIcon onClick={onClickRoom} action="delete" index={index}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </ActionIcon>
      <ActionIcon onClick={onClickRoom} action="switch" index={index}>
        {/* <FontAwesomeIcon icon={rooms[index].data.state.all_on ? faToggleOn : faToggleOff} /> */}
      </ActionIcon>
    </>
  );

  if (isLoading || isLoadingRoom) return <Loading />;
  return (
    <div>
      <Title level="h1" id="leftMenu.menuItem.rooms" />
      <table className="ui selectable table">
        <thead>
          <tr>
            <th>
              <FormattedMessage id="roomsView.header.actions" />
            </th>
            <th>
              <FormattedMessage id="roomsView.header.id" />
            </th>
            <th>
              <FormattedMessage id="roomsView.header.name" />
            </th>
            <th>
              <FormattedMessage id="roomsView.header.lights" />
            </th>
          </tr>
        </thead>
        <tbody>
          {rooms &&
            rooms.data &&
            rooms.data.map((group, index) => {
              const k = `id${index}`;
              return (
                <tr key={k}>
                  <td>{editableActions(index)}</td>
                  <td>{group.id}</td>
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

export default RoomsView;
