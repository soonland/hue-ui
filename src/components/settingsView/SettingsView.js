import React from 'react';
import PanelView from 'components/common/PanelView';
import PanelViewTabs from 'components/common/PanelViewTabs';
import { useParams } from 'react-router-dom';
import ConfigurationView from './configurationView/ConfigurationView';

const SettingsView = () => {
  const { sectionId } = useParams();

  return (
    <PanelView>
      <PanelViewTabs activeSection={sectionId}>
        <div label="settingsView.tab.config" section="config" toLink="/settings/config">
          <ConfigurationView />
        </div>
        <div label="settingsView.tab.notifications" section="notifications" toLink="/settings/notifications">
          Bonjour
        </div>
      </PanelViewTabs>
    </PanelView>
  );
};

export default SettingsView;
