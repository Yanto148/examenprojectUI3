import React from 'react';
import * as HallService from '../service/HallService';
import DeviceView from '../layouts/DeviceView';

import store from '../store';
import setDeviceDetails from '../actions/device-actions';
import { connect } from 'react-redux';

class DeviceContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            //id: '',
            categorie: '',
            naam: '',
            omschrijving: '',
            laatstUitgevoerdeActieDatum: '',
            laatstUitgevoerdeActieType: '',
            laatstUitgevoerdeActieOmschrijving: '',
            eerstVolgendeActieDatum: '',
            eerstVolgendeActieType: '',
            eerstVolgendeActieOmschrijving: '',
            formValid: true,
            naamMsg: '',
            datumMsgLaatsteActie: '',
            datumMsgEersteActie: '',
            typeMsgLaatsteActie: '',
            typeMsgEersteActie: ''
        };
    }

    componentDidMount()
    {
        HallService.getHallFromBackend(this.props.params.hallId)
            .then((hal) => {
                hal.apparaten.forEach((apparaat) => {
                    if (apparaat.id == this.props.params.deviceId)
                    {
                        let device = {};
                        device.initialValues = {
                            deviceId : apparaat.id,
                            categorie : apparaat.categorie,
                            naam : apparaat.naam,
                            omschrijving : apparaat.omschrijving,
                            laatstUitgevoerdeActieDatum : apparaat.laatstUitgevoerdeActie.datum,
                            laatstUitgevoerdeActieType : apparaat.laatstUitgevoerdeActie.type,
                            laatstUitgevoerdeActieOmschrijving : apparaat.laatstUitgevoerdeActie.omschrijving,
                            eerstVolgendeActieDatum : apparaat.eerstVolgendeActie.datum,
                            eerstVolgendeActieType : apparaat.eerstVolgendeActie.type,
                            eerstVolgendeActieOmschrijving : apparaat.eerstVolgendeActie.omschrijving
                        };

                        store.dispatch(setDeviceDetails(device));
                    }
                }) ;
            });
        console.log(this.props);
    }

    actionCompleted()
    {
        this.props.change("naam", "Hallo");
        // event.preventDefault();
        // const eerstVolgendeActieDatum = this.state.eerstVolgendeActieDatum;
        // const eerstVolgendeActieType = this.state.eerstVolgendeActieType;
        // const eerstVolgendeActieOmschrijving = this.state.eerstVolgendeActieOmschrijving;
        // let device = {
        //     laatstUitgevoerdeActieDatum: eerstVolgendeActieDatum,
        //     laatstUitgevoerdeActieType: eerstVolgendeActieType,
        //     laatstUitgevoerdeActieOmschrijving: eerstVolgendeActieOmschrijving
        // };

        //store.dispatch(setDeviceDetails(device));
        //console.log(this.props);
        // this.setState({laatstUitgevoerdeActieDatum : eerstVolgendeActieDatum});
        // this.setState({laatstUitgevoerdeActieType : eerstVolgendeActieType});
        // this.setState({laatstUitgevoerdeActieOmschrijving : eerstVolgendeActieOmschrijving});
    }

    handleChange(event)
    {
        // this.setState({device: {[event.target.name] : event.target.value}});
        // let device = {
        //     [event.target.name]: event.target.value
        // };
        //event.preventDefault();
        //let nameOfChanged = event.target.name;
        //console.log(nameOfChanged);
        //this.props.deviceDetails[nameOfChanged] = event.target.value;
        //console.log(this.props);
        // this.interval = setInterval(() => {
        //     console.log(this.props);
        // }, 1000);
        //this.setState({[event.target.name] : event.target.value});

        // let device = this.props.deviceDetails;
        // device[event.target.name] = event.target.value;
        // console.log(device);
        // store.dispatch(setDeviceDetails(device));

    }

    validateForm(event)
    {
        if (this.state.naam.length > 100 || this.state.naam === '')
        {
            this.setState({naamMsg: 'Verplicht veld, mag niet meer dan 100 karakters bevatten'});
            this.setState({formValid: false});
        }

        let regexp = new RegExp("^[0-9]?[0-9]\/[0-9]?[0-9]\/[0-9][0-9][0-9][0-9]$");
        if (!regexp.test(this.state.laatstUitgevoerdeActieDatum))
        {
            this.setState({datumMsgLaatsteActie: 'Datum moet van dd/mm/yyyy formaat zijn'});
            this.setState({formValid: false});
        }
        if (!regexp.test(this.state.eerstVolgendeActieDatum))
        {
            this.setState({datumMsgEersteActie: 'Datum moet van dd/mm/yyyy formaat zijn'});
            this.setState({formValid: false});
        }

        if (this.state.formValid)
        {
            this.clearErrorMessages();
            this.handleSubmit();
        }
    }

    clearErrorMessages()
    {
        this.setState({datumMsgLaatsteActie: ''});
        this.setState({datumMsgEersteActie: ''});
        this.setState({typeMsgLaatsteActie: ''});
        this.setState({typeMsgEersteActie: ''});
    }

    // handleSubmit(values)
    // {
    //     // const payload = {
    //     //     //id: this.state.id,
    //     //     categorie: this.state.categorie,
    //     //     naam: this.state.naam,
    //     //     omschrijving: this.state.omschrijving,
    //     //     laatstUitgevoerdeActie: {
    //     //         datum: this.state.laatstUitgevoerdeActieDatum,
    //     //         type: this.state.laatstUitgevoerdeActieType,
    //     //         omschrijving: this.state.laatstUitgevoerdeActieOmschrijving
    //     //     },
    //     //     eerstVolgendeActie: {
    //     //         datum: this.state.eerstVolgendeActieDatum,
    //     //         type: this.state.eerstVolgendeActieType,
    //     //         omschrijving: this.state.eerstVolgendeActieOmschrijving
    //     //     }
    //     // };
    //
    //     const url = 'http://localhost:4200/hal/' + this.props.params.hallId + '/apparaat/' + this.state.id;
    //     fetch(url, {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         method: 'POST',
    //         body: values
    //     })
    //         .then(() => this.props.router.push('/hall/' + this.props.params.hallId))
    //         .catch((err) => console.log(values));
    // }


    handleSubmit = (values) => {
        console.log(values.datumMsgEersteActie);
        const url = 'http://localhost:4200/hal/' + this.props.params.hallId + '/apparaat/' + this.state.id;
        fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: values
        })
            .then(() => this.props.router.push('/hall/' + this.props.params.hallId))
            .catch((err) => console.log(err));
    };

    render()
    {
        return <DeviceView
            {...this.state}
            {...this.props.deviceDetails}
            actionCompleted={ this.actionCompleted }
            handleChange={(e) => this.handleChange(e)}
            validateForm = {(e) => this.validateForm(e)}
            handleSubmit = {this.handleSubmit}
        />
    }
}

const mapStateToProps = function(store) {
    return {
        deviceDetails: store.deviceState.deviceDetails,
        initialValues: store.deviceState.deviceDetails
    };
};

export default connect(mapStateToProps)(DeviceContainer);