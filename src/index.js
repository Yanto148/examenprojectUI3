import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import PlattegrondContainer from './containers/HallAggregateContainer';
import HallContainer from './containers/HallContainer';
import DeviceContainer from './containers/DeviceContainer';
import store from './store';
import { Provider } from 'react-redux';

import { Router, Route, IndexRoute,browserHistory } from 'react-router';

ReactDOM.render(
    <Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={App} >
            <IndexRoute component={PlattegrondContainer}/>
            <Route path='hall/:hallId'>
                <IndexRoute component={HallContainer}/>
                <Route path='apparaat/:deviceId' component={DeviceContainer}/>
            </Route>
        </Route>
    </Router>
    </Provider>
    , document.getElementById('root')
);
