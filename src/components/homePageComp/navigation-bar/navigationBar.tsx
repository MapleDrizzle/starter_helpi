interface NavProp {
  activeTab: string;
  handlePage: (page: string, tabname: string) => void;
}

const NavigationBar: React.FC<NavProp> = ({activeTab, handlePage}) => {
  //const [activeTab, setActiveTab] = useState<string>('Home'); // State for the active tab

  // Function to handle tab change and set the active tab
  const handleTabChange = (page: string, tabname: string) => {
    //setActiveTab(tabname); // Update the active tab
    handlePage(page, tabname); // Call the parent handler
  };

  return (
    <div className = "container">
    <nav style={{ padding: '5px' }}>
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', justifyContent: 'center' }}>
        <li className={activeTab === 'Home' ? 'active' : 'default'}>
          <button onClick={() => handleTabChange('Home', 'Home')}>Home</button>
        </li>
        <li className={activeTab === 'Basic' ? 'active' : 'default'}>
          <button onClick={() => handleTabChange('Basic', 'Basic')}>Basic</button>
        </li>
        <li className={activeTab === 'Detailed' ? 'active' : 'default'}>
          <button onClick={() => handleTabChange('Detailed', 'Detailed')}>Detailed</button>
        </li>
        <li className={activeTab === 'Contact' ? 'active' : 'default'}>
          <button onClick={() => handleTabChange('Contact', 'Contact')}>Contact</button>
        </li>
      </ul>
    </nav>
    </div>
    

  );
}

export default NavigationBar;
