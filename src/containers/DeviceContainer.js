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
            naam: '',
            laatstUitgevoerdeActie: {},
            eerstVolgendeActie: {},
            value: '',
            datumLaatsteActie: ''
        };
        // this.handleChange = this.handleChange.bind(this);
        // this.handleLaatsteActieChange = this.handleLaatsteActieChange.bind(this);
        // this.handleEerstVolgendeActieChange = this.handleEerstVolgendeActieChange.bind(this);
    }

    componentDidMount()
    {
        HallService.getHallFromBackend(this.props.params.hallId)
            .then((hal) => {
                hal.apparaten.forEach((apparaat) => {
                    if (apparaat.id == this.props.params.deviceId)
                    {
                        this.setState({device: apparaat});
                        this.setState({naam: {apparaat}});
                        this.setState({laatstUitgevoerdeActie: apparaat.laatstUitgevoerdeActie});
                        this.setState({eerstVolgendeActie: apparaat.eerstVolgendeActie});
                    }
                }) ;
            });
    }

    actionCompleted()
    {
        const eerstVolgendeActie = this.state.eerstVolgendeActie;
        this.setState({laatstUitgevoerdeActie : eerstVolgendeActie});
    }

    handleChange(event)
    {
        this.setState({device: {[event.target.name] : event.target.value}});
        this.setState({[event.target.name] : event.target.value});
    }
    //
    // handleLaatsteActieChange(event)
    // {
    //     this.setState({laatstUitgevoerdeActie: {[event.target.name] : event.target.value}});
    // }
    //
    // handleEerstVolgendeActieChange(event)
    // {
    //     this.setState({eerstVolgendeActie: {[event.target.name] : event.target.value}});
    // }

    render()
    {
        return <DeviceView
            {...this.state}
            actionCompleted={() => this.actionCompleted()}
            handleChange={(e) => this.handleChange(e)}
        />
    }
}

export default DeviceContainer;

/*
 {handleChange={(e) => this.handleChange(e)}}
{handleLaatsteActieChange = {(e) => this.handleLaatsteActieChange(e)}}
{handleEerstVolgendeActieChange = {(e) => this.handleEerstVolgendeActieChange(e)}}
 */