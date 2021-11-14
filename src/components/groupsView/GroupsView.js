import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Title from 'components/common/Title';
import {
  getGroups,
  getLights,
  getGroupsAction,
  getLightsAction,
  getLoading,
  getLoadingGroup,
  deleteGroupAction,
  setGroupStateAction,
} from 'store/slices/lightsSlice';
import Loading from 'components/common/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faToggleOff, faToggleOn, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ActionIcon from '../common/ActionIcon';

const GroupsView = () => {
  const dispatch = useDispatch();
  const groups = useSelector(getGroups);
  const lights = useSelector(getLights);
  const isLoading = useSelector(getLoading);
  const isLoadingGroup = useSelector(getLoadingGroup);

  const loadData = async () => {
    dispatch(getLightsAction());
    dispatch(getGroupsAction());
  };

  useEffect(() => {
    loadData();
  }, []);

  const fetchLightById = (data) => lights.filter((el) => data.includes(`${el.data.id}`)).map((el2) => el2.data.name);

  const onClickGroup = async (action, index) => {
    if (action === 'delete') {
      dispatch(deleteGroupAction({ id: groups[index].data.id, index }));
    } else if (action === 'switch') {
      dispatch(setGroupStateAction({ id: groups[index].data.id, on: !groups[index].data.state.all_on }));
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
      <ActionIcon onClick={onClickGroup} action="edit" index={index}>
        <FontAwesomeIcon icon={faEdit} />
      </ActionIcon>
      <ActionIcon onClick={onClickGroup} action="delete" index={index}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </ActionIcon>
      <ActionIcon onClick={onClickGroup} action="switch" index={index}>
        <FontAwesomeIcon icon={groups[index].data.state.all_on ? faToggleOn : faToggleOff} />
      </ActionIcon>
    </>
  );

  if (isLoading || isLoadingGroup) return <Loading />;
  return (
    <div>
      <Title level="h1" id="topMenu.header.groups" />
      <table className="ui selectable table">
        <thead>
          <tr>
            <th>
              <FormattedMessage id="groupsView.header.actions" />
            </th>
            <th>
              <FormattedMessage id="groupsView.header.id" />
            </th>
            <th>
              <FormattedMessage id="groupsView.header.name" />
            </th>
            <th>
              <FormattedMessage id="groupsView.header.lights" />
            </th>
          </tr>
        </thead>
        <tbody>
          {groups &&
            groups.map((group, index) => {
              const k = `id${index}`;
              return (
                <tr key={k}>
                  <td>{editableActions(index)}</td>
                  <td>{group.data.id}</td>
                  <td>{group.data.name}</td>
                  <td>{fetchLightById(group.data.lights).join(', ')}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default GroupsView;
