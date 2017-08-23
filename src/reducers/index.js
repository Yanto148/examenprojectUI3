import {combineReducers} from 'redux';

import deviceReducer from'./DeviceReducer';

var reducers = combineReducers({
    deviceState: deviceReducer
});

export default reducers;