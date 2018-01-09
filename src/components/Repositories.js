import React from 'react';
import '../styles/Repositories.css';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class Repositories extends React.Component {
  constructor() {
    super();
    this.state = { username: localStorage.getItem('USER_NAME'), userrepos: [] };
  }
  componentDidMount() {
    fetch(`https://api.github.com/users/${localStorage.getItem('USER_NAME')}/repos`)
      .then(data => data.json())
      .then((data) => {
        this.setState({
          userrepos: this.state.userrepos.concat(data)
        });
      });
  }
  render() {
    const style1 = {
      color: 'black',
      fontSize: 20,
      padding: 10,
    };
    const style2 = {
      fontSize: 12,
      padding: 10,
      color: 'gray'
    };
    return (
      <MuiThemeProvider>
        <div className="userrepos">
          <List className="repoUL">
            <div >
              {
                this.state.userrepos.map((obj) => {
                  const date = new Date(obj.updated_at).toDateString();
                  return <div>
                    <ListItem style={{ height: 120 }} key={obj.id} >
                      <div style={style1} className="repoLI"><Link to={{ pathname: `repos/${obj.name}` }}>{obj.name}</Link></div>
                      <div style={style2}>{obj.description}</div>
                      <div style={style2}>Updated on {date}</div>
                      <Divider></Divider>
                    </ListItem>
                  </div>
                })
              }
            </div>
          </List>
        </div>
      </MuiThemeProvider>
    );
  }
}

