import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Hallen from './Hallen';
import PlattegrondContainer from './containers/HallenContainer';
import HallContainer from './containers/HallContainer';

import { Router, Route, IndexRoute,browserHistory } from 'react-router';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App} >
            <IndexRoute component={PlattegrondContainer}/>
            <Route path='hall/:hallId' component={HallContainer}/>

            {/*<Route path="lijst">*/}
                {/*<IndexRoute component={LijstContainer} />*/}
            {/*</Route>*/}
        </Route>
    </Router>
    , document.getElementById('root')
);
