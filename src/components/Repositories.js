import React from 'react';
import '../styles/Repositories.css';

export default class Repositories extends React.Component {
  constructor() {
    super();
    this.state = { username: 'kishankanugula', userrepos: [] };
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
    return (
      <div className="userrepos">
        <div className="heading"><h1>{localStorage.getItem('USER_NAME')}-Repositories</h1></div>
        {
          this.state.userrepos.map(obj => <ul className= "repoUL" key={obj.id}>
              <li className="repoLI" key={obj.id}>{obj.name}</li>
              <li className="repoLI" key ={obj.id}>{obj.description}</li></ul>)
        }
      </div>
    );
  }
}

