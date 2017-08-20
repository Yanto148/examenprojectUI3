import React , {Component} from 'react';
import * as HallService from '../service/HallService';
import DeviceView from '../layouts/DeviceView';

class DeviceContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            device: {},
            laatstUitgevoerdeActie: {},
            eerstVolgendeActie: {},
            style: {
                textAlign: "center"
            }
        }
    }

    componentDidMount()
    {
        HallService.getHallFromBackend(this.props.params.hallId)
            .then((hal) => {
                hal.apparaten.forEach((apparaat) => {
                    if (apparaat.id == this.props.params.deviceId)
                    {
                        this.setState({device: apparaat});
                        this.setState({laatstUitgevoerdeActie: apparaat.laatstUitgevoerdeActie});
                        this.setState({eerstVolgendeActie: apparaat.eerstVolgendeActie});
                    }
                }) ;
            })
            .then(console.log(this.state));
    }

    render()
    {
        return <DeviceView {...this.state}/>
    }
}

export default DeviceContainer;