import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import Userprofile from '../components/Userprofile';
import Repositories from '../components/Repositories';
import Gists from '../components/Gists';
import Gistfile from '../components/GistFiles';

ReactDOM.render((<Router >
        <div>
            <App/>
             <Switch>
               <Route path="/user" component={Userprofile} />
               <Route path="/repos" component={Repositories} />
               <Route path="/gists/:fileId" component={Gistfile}/>
               <Route path="/gists" component={Gists} />
             </Switch>
    </div>
    </Router>), document.getElementById('root'));
