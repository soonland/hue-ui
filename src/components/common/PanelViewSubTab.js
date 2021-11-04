import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
// import LinkButton from 'components/common/LinkButton';

const PanelViewSubTab = ({ activeTab, label, toLink }) => {
  let css = 'subtab-list-item';
  if (activeTab === label) {
    css += ' subtab-list-active';
  }

  return (
    <li className={css}>
      <NavLink to={toLink}>
        <FormattedMessage id={label} />
      </NavLink>
    </li>
  );
};

export default PanelViewSubTab;
