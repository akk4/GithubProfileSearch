import React from 'react';
import '../styles/Userprofile.css';


class Userprofile extends React.Component {
  constructor() {
    super();
    this.state = { username: localStorage.getItem('USER_NAME'), userdata: [] };
  }

  componentDidMount() {
    fetch(`https://api.github.com/users/${this.state.username}`)
      .then(data => data.json()).then((data) => {
        this.setState({
          userdata: this.state.userdata.concat(data)
        });
      });
  }

  render() {
    return (
      <div className="userprofile">
          <div className="heading"><h1>{localStorage.getItem('USER_NAME')}-Profile</h1></div>
          {this.state.userdata.map(obj => <ul className="userUL" key={obj.id}>
          Name: <li className="userLI" key={obj.id}>{obj.name}</li>
          Image: <li key={obj.id}><img src={obj.avatar_url}></img></li>
          </ul>)}
      </div>
    );
  }
}

export default Userprofile;
