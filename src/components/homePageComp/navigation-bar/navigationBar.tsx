import React, { useState } from 'react';


interface NavProp {
  handlePage: (page: string, tabname: string) => void;
}

const NavigationBar: React.FC<NavProp> = ({handlePage}) => {
  const [activeTab, setActiveTab] = useState<string>('Home'); // State for the active tab

  // Function to handle tab change and set the active tab
  const handleTabChange = (page: string, tabname: string) => {
    setActiveTab(tabname); // Update the active tab
    handlePage(page, tabname); // Call the parent handler
  };

  return (
    <div>
    <nav style={{ backgroundColor: '#2c6fbb', padding: '5px' }}>
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', justifyContent: 'center' }}>
        <li className={activeTab === 'Home' ? 'active' : 'default'}>
          <button style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }} onClick={() => handleTabChange('Home', 'Home')}>Home</button>
        </li>
        <li className={activeTab === 'Basic' ? 'active' : 'default'}>
          <button style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }} onClick={() => handleTabChange('Basic', 'Basic')}>Basic</button>
        </li>
        <li className={activeTab === 'Detailed' ? 'active' : 'default'}>
          <button style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }} onClick={() => handleTabChange('Detailed', 'Detailed')}>Detailed</button>
        </li>
        <li className={activeTab === 'Contact' ? 'active' : 'default'}>
          <button style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }} onClick={() => handleTabChange('Contact', 'Contact')}>Contact</button>
        </li>
      </ul>
    </nav>
    </div>
    

  );
}

export default NavigationBar;
