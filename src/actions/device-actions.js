import * as types from '../actions/action-types'

export function setDeviceDetails(deviceDetails)
{
    return {
        type: types.SET_DEVICE_DETAILS,
        deviceDetails
    };
}

export default setDeviceDetails;