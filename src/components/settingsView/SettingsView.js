import React from 'react';
import PanelView from 'components/common/PanelView';
import PanelViewTabs from 'components/common/PanelViewTabs';

const SettingsView = (props) => {
  const {
    match: {
      params: { sectionId },
    },
  } = props;

  return (
    <PanelView>
      <PanelViewTabs activeSection={sectionId}>
        <div label="settingsView.tab.billing" section="billing" toLink="/settings/billing">
          Salut
        </div>
        <div label="settingsView.tab.employees" section="employees" toLink="/settings/employees">
          Bonjour
        </div>
      </PanelViewTabs>
    </PanelView>
  );
};

export default SettingsView;
