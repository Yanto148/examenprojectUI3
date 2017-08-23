import * as types from '../actions/action-types'

export function setDeviceId(deviceId)
{
    return {
        type: types.SET_DEVICE_ID,
        deviceId
    };
}

export default setDeviceId;