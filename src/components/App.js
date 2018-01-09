import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainTabs from './MainTabs';
import TextField from 'material-ui/TextField';

class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <MuiThemeProvider>
        <MainTabs />
      </MuiThemeProvider>
    );
  }
}
export default App;
