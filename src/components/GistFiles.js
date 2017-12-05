import React from 'react';
import PropTypes from 'prop-types';
import '../styles/GistFiles.css';


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
  render() {
    const { files } = this.state;
    const { username } = this.props.location.state;
    return (
      <div className="content">
        {Object.keys(files).map(name =>
        <ul key=""><label className="label">{ `${username} / ${name}`}</label><li className="file-li">{files[name].content}</li></ul>)}
      </div>
    );
  }
}

Gistfile.propTypes = {
  match: PropTypes.object.isRequired,
  state: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
};
export default Gistfile;
