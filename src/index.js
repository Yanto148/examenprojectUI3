import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import PlattegrondContainer from './containers/HallAggregateContainer';
import HallContainer from './containers/HallContainer';

import { Router, Route, IndexRoute,browserHistory } from 'react-router';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App} >
            <IndexRoute component={PlattegrondContainer}/>
            <Route path='hall/:hallId' component={HallContainer}/>
        </Route>
    </Router>
    , document.getElementById('root')
);
