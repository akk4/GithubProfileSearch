import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../styles/Gists.css';

export default class Gists extends React.Component {
  constructor() {
    super();
    this.state = { gists: [] };
  }
  componentDidMount() {
    fetch(`https://api.github.com/users/${localStorage.getItem('USER_NAME')}/gists`)
      .then(data => data.json())
      .then((data) => {
        this.setState({
          gists: this.state.gists.concat(data)
        });
      });
  }
  render() {
    const filenames = this.state.gists.map((obj) => {
      const { files, id } = obj;
      if (typeof obj !== "undefined" && obj !== null) {
        return { filename: Object.keys(files)[0], fileId: id };
      }
      else {
        return { filename: "", fileId: 0 };
      }
    });
    return (
      <MuiThemeProvider>
        <div className="usergists">
          <List className="gistsul">
            {filenames.map(obj =>
              <div style={{ height: 80, padding: 10 }} className='gistsli' key={obj.fileId}>
                <ListItem style={{ padding: 20, fontSize: 20 }} containerElement={<Link id="filelink" to={{ pathname: `gists/${obj.fileId}`, state: { username: this.state.username } }} />}>{obj.filename}</ListItem>
                <Divider></Divider>
              </div>)
            }
          </List>
        </div>
      </MuiThemeProvider>
    );
  }
}

