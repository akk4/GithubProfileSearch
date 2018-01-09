import React from 'react';
import PropTypes from 'prop-types';
import '../styles/GistFiles.css';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';

class Gistfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { files: {} };
  }
  componentDidMount() {
    const { fileId: Id } = this.props.match.params;
    fetch(`https://api.github.com/gists/${Id}`)
      .then(data => data.json())
      .then((data) => {
        this.setState({
          files: data.files
        });
      });
  }
  goBack() {
    this.props.history.goBack();
  }
  render() {
    const { files } = this.state;
    const { goBack } = this.props;
    return (
      <MuiThemeProvider>
        <div className="content">
          <IconButton onClick={this.goBack.bind(this)} tooltip="go back and hold see the history"><ArrowBackIcon /></IconButton>
          {Object.keys(files).map(name => <div>
            <div style={{ paddingLeft: 30, paddingRight: 30 }}><h3 >{name}</h3></div>
            <div style={{ paddingLeft: 30, paddingRight: 30 }}><p style={{ color: 'gray', border: '1px solid black', padding: 15 }}>{files[name].content}</p></div>
            <Divider></Divider>
          </div>)}
        </div>
      </MuiThemeProvider>
    );
  }
}
Gistfile.propTypes = {
  match: PropTypes.object.isRequired,
  state: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired
};
export default Gistfile;
