import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBridgesAction, getBridges } from '../../../store/slices/bridgesSlice';
import Bridge from './Bridge';

const ConfigurationView = () => {
  const dispatch = useDispatch();
  const bridges = useSelector(getBridges);

  const handleOnClick = () => {
    dispatch(getBridgesAction());
  };

  const showBridges = () =>
    bridges?.length > 0 &&
    bridges?.map((bridge, index) => {
      const k = `k${index}`;
      return <Bridge key={k} data={bridge} />;
    });

  return (
    <div>
      <button type="button" onClick={() => handleOnClick()}>
        Discover bridges
      </button>
      {showBridges()}
    </div>
  );
};

export default ConfigurationView;
