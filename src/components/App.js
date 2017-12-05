import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      Links: [
        { id: 1, label: 'Userprofile', link: '/user' },
        { id: 2, label: 'Repositories', link: '/repos' },
        { id: 3, label: 'Gists', link: '/gists' }
      ]
    };
  }
  renderLinks() {
    return this.state.Links.map(data => <li key={data.id} className='liclass'>
        <Link to={data.link}>{data.label}</Link>
      </li>);
  }

  saveUserName(e) {
    localStorage.setItem('USER_NAME', e.target.value);
    console.log(localStorage.getItem('USER_NAME'));
    if(e.target.value == "")
    {
      alert('Enter valid user name!!');
    }
    else{
      window.location.reload();
    }
  }

  render() {
    return (
      <div className="maincontent">
        <div className="mainlinks">
          <div>
          <ul className='ulclass'>
              { this.renderLinks() }
          </ul>
          </div>
        </div>
        <div className="username">
              <form>
                 <div>
                    <input className="textbox" type="textbox" id="textbox"
                    onBlur={ this.saveUserName } placeholder="Enter the user"></input>
                  </div>
              </form>
        </div>
      </div>
    );
  }
}
export default App;

