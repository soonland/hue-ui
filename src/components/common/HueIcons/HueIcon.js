import React from 'react';

import SultanBulb from '../../../../public/assets/icons-hue/bulbsSultan.svg';
import BridgeV2 from '../../../../public/assets/icons-hue/devicesBridgesV2.svg';
import DimmerSwitch from '../../../../public/assets/icons-hue/devicesDimmerswitch.svg';
import HuePlay from '../../../../public/assets/icons-hue/heroesHueplay.svg';

const HueIcon = ({ data }) => {
  if (data) {
    const { product_archetype: hueArchetype, model_id: hueModelId, product_name: hueName } = data;
    let iconType;
    const archetype = hueArchetype === 'unknown_archetype' ? hueName : hueArchetype;
    if (archetype === 'sultan_bulb') iconType = SultanBulb;
    else if (archetype === 'bridge_v2') iconType = BridgeV2;
    else if (archetype === 'Hue dimmer switch') iconType = DimmerSwitch;
    else if (archetype === 'hue_play') iconType = HuePlay;
    return <img src={iconType} alt={`${archetype} - ${hueModelId}`} style={{ color: '#FFF' }} />;
  }
  return <img src={SultanBulb} alt="sultan_bulb" style={{ color: '#FFF' }} />;
};

export default HueIcon;
