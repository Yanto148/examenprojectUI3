import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form'

import deviceReducer from'./DeviceReducer';

var reducers = combineReducers({
    deviceState: deviceReducer,
    form: formReducer
});

export default reducers;