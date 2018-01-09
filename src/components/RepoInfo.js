import React from 'react';
import { List, ListItem } from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import IconButton from 'material-ui/IconButton';
import '../styles/RepoInfo.css';

export default class RepoInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { commits: [] }
    }
    componentDidMount() {
        const name = this.props.match.params.reponame;
        fetch(`https://api.github.com/repos/${localStorage.getItem('USER_NAME')}/${name}/commits`)
            .then(data =>
                data.json())
            .then((data) => {
                this.setState({
                    commits: this.state.commits.concat(data)
                })
            }
            )
    }
    goBack() {
        this.props.history.goBack();
    }
    render() {
        const styles = {
            paddingLeft: 50,
            paddingRight: 50
        }
        const felx = {
            display: 'flex'
        }
        return (
            <MuiThemeProvider>
                <div className="repoinfo">
                    <IconButton onClick={this.goBack.bind(this)}><ArrowBackIcon/></IconButton>
                    <h3 style={{ paddingLeft: 50, paddingRight: 50, color: 'gray' }}>commits</h3>
                    <div style={styles}>
                        <List>
                            {
                                this.state.commits.map(obj => {
                                    const { commit } = obj;
                                    const { committer } = commit;
                                    //const commitdate= new Date(Date.parse("2011-07-14 11:23:00"));
                                    const commitdate = new Date(committer.date).toDateString();
                                    const hcode = (obj.sha).slice(0, 6);
                                    return <div style={{ backgroundColor: 'white', border: '1px solid gray' }}><ListItem style={felx}>
                                        <div style={{ padding: 5 }}>{commit.message}</div>
                                        <div style={{ padding: 5, color: 'gray', fontSize: 12 }}>{committer.name} commited on {commitdate}</div>
                                        <div style={{ padding: 5, color: 'blue', alignself: 'flex-end' }}>{hcode}</div>
                                    </ListItem></div>
                                })
                            }
                        </List>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}
