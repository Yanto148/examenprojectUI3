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
            id: '',
            categorie: '',
            naam: '',
            omschrijving: '',
            // laatstUitgevoerdeActie: {},
            laatstUitgevoerdeActieDatum: '',
            laatstUitgevoerdeActieType: '',
            laatstUitgevoerdeActieOmschrijving: '',
            // eerstVolgendeActie: {},
            eerstVolgendeActieDatum: '',
            eerstVolgendeActieType: '',
            eerstVolgendeActieOmschrijving: '',
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
                        this.setState({naam: apparaat.id});
                        this.setState({naam: apparaat.categorie});
                        this.setState({naam: apparaat.naam});
                        this.setState({naam: apparaat.omschrijving});
                        // this.setState({laatstUitgevoerdeActie: apparaat.laatstUitgevoerdeActie});
                        this.setState({laatstUitgevoerdeActieDatum: apparaat.laatstUitgevoerdeActie.datum});
                        this.setState({laatstUitgevoerdeActieType: apparaat.laatstUitgevoerdeActie.type});
                        this.setState({laatstUitgevoerdeActieOmschrijving: apparaat.laatstUitgevoerdeActie.omschrijving});
                        // this.setState({eerstVolgendeActie: apparaat.eerstVolgendeActie});
                        this.setState({eerstVolgendeActieDatum: apparaat.eerstVolgendeActie.datum});
                        this.setState({eerstVolgendeActieType: apparaat.eerstVolgendeActie.type});
                        this.setState({eerstVolgendeActieOmschrijving: apparaat.eerstVolgendeActie.omschrijving});
                    }
                }) ;
            });
    }

    actionCompleted()
    {
        const eerstVolgendeActieDatum = this.state.eerstVolgendeActieDatum;
        const eerstVolgendeActieType = this.state.eerstVolgendeActieType;
        const eerstVolgendeActieOmschrijving = this.state.eerstVolgendeActieOmschrijving;
        this.setState({laatstUitgevoerdeActieDatum : this.state.eerstVolgendeActieDatum});
        this.setState({laatstUitgevoerdeActieType : eerstVolgendeActieType});
        this.setState({laatstUitgevoerdeActieOmschrijving : eerstVolgendeActieOmschrijving});
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