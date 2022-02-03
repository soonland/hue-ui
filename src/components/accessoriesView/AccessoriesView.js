import React, { useEffect } from 'react';
import Tippy from '@tippyjs/react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Title from 'components/common/Title';
import { getAccessories, getLoading as getLoadingAccessories, getAccessoriesAction } from 'store/slices/accessoriesSlice';
import Loading from 'components/common/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import ActionIcon from '../common/ActionIcon';
import HueIcon from '../common/HueIcons/HueIcon';

const AccessoriesView = () => {
  const dispatch = useDispatch();
  const accessories = useSelector(getAccessories);
  const isLoadingAccessories = useSelector(getLoadingAccessories);

  const loadData = async () => {
    dispatch(getAccessoriesAction());
  };

  useEffect(() => {
    loadData();
  }, []);

  const onClickAccessories = async (action) => {
    if (action === 'edit') {
      // dispatch(deleteAccessoriesAction({ id: accessories[index].data.id, index }));
    }
  };

  const editableActions = (index) => (
    <ActionIcon onClick={onClickAccessories} action="edit" index={index}>
      <FontAwesomeIcon icon={faEdit} />
    </ActionIcon>
  );

  if (isLoadingAccessories) return <Loading />;
  return (
    <div>
      <Title level="h1" id="leftMenu.menuItem.accessories" />
      <table className="ui selectable table">
        <thead>
          <tr>
            <th>
              <FormattedMessage id="accessoriesView.header.actions" />
            </th>
            <th>
              <FormattedMessage id="accessoriesView.header.name" />
            </th>
            <th>
              <FormattedMessage id="accessoriesView.header.model" />
            </th>
            <th>
              <FormattedMessage id="accessoriesView.header.productName" />
            </th>
            <th>
              <FormattedMessage id="accessoriesView.header.type" />
            </th>
          </tr>
        </thead>
        <tbody>
          {accessories &&
            accessories.data &&
            accessories.data.map((device, index) => {
              const k = `id${index}`;
              return (
                <tr key={k}>
                  <td>{editableActions(index)}</td>
                  <td>{device.metadata.name}</td>
                  <td>{device.product_data.model_id}</td>
                  <td>{device.product_data.product_name}</td>
                  <td>
                    <Tippy>
                      <HueIcon data={device.product_data} />
                    </Tippy>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AccessoriesView;
