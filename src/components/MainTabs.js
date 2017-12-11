import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

class MainTabs extends React.Component {
  constructor()
  {
    super();
  
  }
  render() {
    const styles= 
    {
      headline: {
        fontSize: 11,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 200,
      }
    };
    
    return (
    <Tabs >
    <Tab label="Userprofile" data-route="/user" style={styles.headline}></Tab>
    <Tab label="Repositories" data-route="/user" style={styles.headline}></Tab>
    <Tab label="Gists" data-route="/user" style={styles.headline}></Tab>
  </Tabs>
    );
  }
  }
  export default MainTabs;