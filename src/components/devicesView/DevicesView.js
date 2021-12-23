import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Title from 'components/common/Title';
import { getDevices, getLoading as getLoadingDevices, getDevicesAction } from 'store/slices/devicesSlice';
import Loading from 'components/common/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import ActionIcon from '../common/ActionIcon';

const DevicesView = () => {
  const dispatch = useDispatch();
  const devices = useSelector(getDevices);
  const isLoadingDevices = useSelector(getLoadingDevices);

  const loadData = async () => {
    dispatch(getDevicesAction());
  };

  useEffect(() => {
    loadData();
  }, []);

  const onClickDevices = async (action) => {
    if (action === 'edit') {
      // dispatch(deleteDevicesAction({ id: devices[index].data.id, index }));
    }
  };

  const editableActions = (index) => (
    <ActionIcon onClick={onClickDevices} action="edit" index={index}>
      <FontAwesomeIcon icon={faEdit} />
    </ActionIcon>
  );

  if (isLoadingDevices) return <Loading />;
  return (
    <div>
      <Title level="h1" id="leftMenu.menuItem.devices" />
      <table className="ui selectable table">
        <thead>
          <tr>
            <th>
              <FormattedMessage id="devicesView.header.actions" />
            </th>
            {/* <th>
              <FormattedMessage id="devicesView.header.id" />
            </th> */}
            <th>
              <FormattedMessage id="devicesView.header.name" />
            </th>
            <th>
              <FormattedMessage id="devicesView.header.model" />
            </th>
            <th>
              <FormattedMessage id="devicesView.header.productName" />
            </th>
            <th>
              <FormattedMessage id="devicesView.header.type" />
            </th>
          </tr>
        </thead>
        <tbody>
          {devices &&
            devices.data &&
            devices.data.map((device, index) => {
              const k = `id${index}`;
              return (
                <tr key={k}>
                  <td>{editableActions(index)}</td>
                  {/* <td>{device.id}</td> */}
                  <td>{device.metadata.name}</td>
                  <td>{device.product_data.model_id}</td>
                  <td>{device.product_data.product_name}</td>
                  <td>{device.type}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default DevicesView;
