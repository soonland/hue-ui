import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBridges,
  getNewLights,
  getSearchNewLights,
  getBridgesAction,
  getNewLightsAction,
  getSearchNewLightsAction,
  getLoadingSearchLight,
  getLoadingNewLight,
} from '../../../store/slices/bridgesSlice';
import Bridge from './Bridge';

const ConfigurationView = () => {
  const dispatch = useDispatch();
  const bridges = useSelector(getBridges);
  const newLights = useSelector(getNewLights);
  const searchNewLights = useSelector(getSearchNewLights);
  const loadingSearch = useSelector(getLoadingSearchLight);
  const loadingNewLight = useSelector(getLoadingNewLight);

  const handleOnClickBridges = () => {
    dispatch(getBridgesAction());
  };

  const handleOnClickSearchNewLights = () => {
    dispatch(getSearchNewLightsAction());
    setTimeout(() => {
      dispatch(getNewLightsAction());
    }, 45000);
  };

  const showBridges = () =>
    bridges?.length > 0 &&
    bridges?.map((bridge, index) => {
      const k = `k${index}`;
      return <Bridge key={k} data={bridge} />;
    });

  const showNewLights = () =>
    newLights && (
      <>
        <div>Last Scan: {newLights.lastscan}</div>
        {Object.keys(newLights).map((key) => {
          const k = `k${key}`;
          return <div key={k}>{newLights[key].name}</div>;
        })}
      </>
    );

  return (
    <>
      <div>
        <button type="button" onClick={() => handleOnClickBridges()}>
          Discover bridges
        </button>
        <div style={{ padding: '5px' }}>{showBridges()}</div>
      </div>
      <div>
        <button type="button" onClick={() => handleOnClickSearchNewLights()}>
          Discover New Lights
        </button>
        <div style={{ padding: '5px' }}>
          {searchNewLights}
          {loadingSearch || loadingNewLight ? <>Loading</> : showNewLights()}
        </div>
      </div>
    </>
  );
};

export default ConfigurationView;
