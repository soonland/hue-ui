import React from 'react';
import { FormattedMessage } from 'react-intl';

const Title = ({ id, level }) => {
  if (level === 'h4') {
    return (
      <h4 className={level}>
        <FormattedMessage id={id} />
      </h4>
    );
  }
  if (level === 'h3') {
    return (
      <h3 className={level}>
        <FormattedMessage id={id} />
      </h3>
    );
  }
  if (level === 'h2') {
    return (
      <h2 className={level}>
        <FormattedMessage id={id} />
      </h2>
    );
  }
  return (
    <h1 className={level}>
      <FormattedMessage id={id} />
    </h1>
  );
};

export default Title;
