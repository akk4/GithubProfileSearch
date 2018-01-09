import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import IconButton from 'material-ui/IconButton';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ContentSave from 'material-ui/svg-icons/content/save';
import '../styles/Userprofile.css';

class Userprofile extends React.Component {
  constructor() {
    super();
    this.state = { userdata: [], isEdit: localStorage.getItem('USER_NAME') ? false : true };
    this.saveUserName = this.saveUserName.bind(this);
    this.getUserData = this.getUserData.bind(this);
  }

  onUserInput(event) {
    const gitUserName = event.target.value;
    localStorage.setItem('USER_NAME', gitUserName);
  }
  saveUserName() {
    this.setState({ isEdit: false, userdata: [] });
    this.getUserData();
  }
  changeUser() {
    this.setState({ isEdit: true, userdata: [] });
    this.getUserData();
  }
  getUserData() {
    localStorage.getItem('USER_NAME') ?
      fetch(`https://api.github.com/users/${localStorage.getItem('USER_NAME')}`)
        .then(data => data.json()).then((data) => {
          this.setState({
            userdata: this.state.userdata.concat(data)
          });
        })
      : alert("Please enter the User!!");
  }
  componentDidMount() {
    this.setState({ isEdit: false, userdata: [] });
    this.getUserData();
  }
  renderGitUserTextField(login = '') {
    return (
      <div>
        <TextField id="usersearch" floatingLabelText="Enter the User"
          defaultValue={login} onBlur={this.onUserInput.bind(this)} />
        <IconButton tooltip="Save" onClick={this.saveUserName}><ContentSave /></IconButton>
      </div>
    )
  }
  render() {
    const userinformation = this.state.userdata;
    return (
      <MuiThemeProvider>
        <div className="userprofile">
          <div className="avatar" >
            {((userinformation.length > 0) || (this.state.isEdit)) ?
              this.state.userdata.map(obj =>
                <div>
                  <div className="userLI" key={obj.id}>
                    <Avatar size={150} src={obj.avatar_url} />
                  </div>
                  <div style={{ fontSize: 26 }}>
                    <span>{obj.name}</span>
                  </div>
                  {
                    this.state.isEdit ? this.renderGitUserTextField(obj.login) : <div>
                      <span style={{ fontSize: 20 }}>{obj.login}</span>
                      <IconButton tooltip="Edit User Name" onClick={this.changeUser.bind(this)}><EditorModeEdit /></IconButton>
                    </div>
                  }
                </div>
              ) : <div>
                <span> Please enter github username</span>
                {this.renderGitUserTextField()}</div>
            }
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Userprofile;
