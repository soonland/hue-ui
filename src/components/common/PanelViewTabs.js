import React from 'react';
import PanelViewTab from 'components/common/PanelViewTab';
import PanelViewSubTab from 'components/common/PanelViewSubTab';

const PanelViewTabs = ({ children, activeSection }) => {
  // const [activeTab, setActiveTab] = useState(children[0].props.label);

  // const onClick = (tab) => {
  //   setActiveTab(tab);
  // };

  const tabs = [];
  let content = '';
  children.forEach((child) => {
    const { label, indent, section, toLink } = child.props;

    if (indent === 'true') tabs.push(<PanelViewSubTab key={label} label={label} toLink={toLink} />);
    else tabs.push(<PanelViewTab key={label} label={label} toLink={toLink} />);

    if (activeSection === section) content = child.props.children;
  });

  return (
    <div style={{ width: '100%' }}>
      <div className="panelViewTabs">
        <ol style={{ paddingLeft: '0px' }}>{tabs}</ol>
      </div>
      <div className="panelViewContent">{content}</div>
    </div>
  );
};

export default PanelViewTabs;
