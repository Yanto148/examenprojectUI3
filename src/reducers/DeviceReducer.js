import * as types from '../actions/action-types';

const initialState =
    {
    deviceId: {}
};

const deviceReducer = function (state = initialState, action)
{
    switch (action.type)
    {
        case types.SET_DEVICE_ID:
            return Object.assign({}, state, {deviceId: action.deviceId})
    }

    return state;
};

export default deviceReducer;