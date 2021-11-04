import React from 'react';
import LinkButton from 'components/common/LinkButton';

const ActionIcon = ({ onClick, children, action, index }) => <LinkButton onClick={() => onClick(action, index)}>{children}</LinkButton>;

export default ActionIcon;
