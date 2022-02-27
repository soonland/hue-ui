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
  let defaultContent = false;
  children.forEach((child, index) => {
    const { label, indent, section, toLink } = child.props;

    if (indent === 'true') tabs.push(<PanelViewSubTab key={label} label={label} toLink={toLink} />);
    else tabs.push(<PanelViewTab key={label} label={label} toLink={toLink} />);

    if (activeSection === section) content = child.props.children;
    if (index === 0) defaultContent = child.props.children;
  });

  return (
    <div style={{ width: '100%' }}>
      <div className="panelViewTabs">{tabs}</div>
      <div className="panelViewContent">{content || defaultContent}</div>
    </div>
  );
};

export default PanelViewTabs;
