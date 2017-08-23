import * as types from '../actions/action-types';

const initialState =
{
    deviceDetails: {}
};

const deviceReducer = function (state = initialState, action)
{
    switch (action.type)
    {
        case types.SET_DEVICE_DETAILS:
            //console.log(action);
            return Object.assign({}, state, {deviceDetails: action.deviceDetails})
    }

    return state;
};

export default deviceReducer;