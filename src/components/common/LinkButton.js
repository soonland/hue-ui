import React from 'react';

const LinkButton = ({ onClick, children, title = '', className = 'link-button' }) => (
  <button title={title} type="button" onClick={onClick} className={className}>
    {children}
  </button>
);

export default LinkButton;
