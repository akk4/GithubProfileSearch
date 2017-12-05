import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Gists.css';

export default class Gists extends React.Component {
  constructor() {
    super();
    this.state = {gists: [] };
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
      if(typeof obj!== "undefined" && obj !== null)
      {
      return { filename: Object.keys(files)[0], fileId: id };
      
      }
      else
      {
      return {filename : "",fileId : 0};
      }
    });
    return (
      <div className="usergists">
        <div className="heading"><h1 >{localStorage.getItem('USER_NAME')}-Gists</h1></div>
        <ul className="gistsul">
        { filenames.map(obj =>
          <li className='gistsli' key={obj.fileId}>
            <Link to={{ pathname: `gists/${obj.fileId}`, state: { username: this.state.username } }}>{obj.filename}</Link>
          </li>)
        }
        </ul>
      </div>
    );
  }
}

