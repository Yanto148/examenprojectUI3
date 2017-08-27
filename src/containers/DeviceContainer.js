import React from 'react';
import * as HallService from '../service/HallService';
import * as Utils from '../service/Utils';
import DeviceView from '../layouts/DeviceView';

class DeviceContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            hallId: this.props.params.hallId,
            id: '',
            categorie: '',
            icon: '',
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
                        this.setState({id: apparaat.id});
                        this.setState({categorie: apparaat.categorie});
                        this.setState({naam: apparaat.naam});
                        this.setState({omschrijving: apparaat.omschrijving});
                        this.setState({laatstUitgevoerdeActieDatum: apparaat.laatstUitgevoerdeActie.datum});
                        this.setState({laatstUitgevoerdeActieType: apparaat.laatstUitgevoerdeActie.type});
                        this.setState({laatstUitgevoerdeActieOmschrijving: apparaat.laatstUitgevoerdeActie.omschrijving});
                        this.setState({eerstVolgendeActieDatum: apparaat.eerstVolgendeActie.datum});
                        this.setState({eerstVolgendeActieType: apparaat.eerstVolgendeActie.type});
                        this.setState({eerstVolgendeActieOmschrijving: apparaat.eerstVolgendeActie.omschrijving});
                    }
                });
            })
            .then(() => this.setIcon());
    }

    setIcon()
    {
        let device = this.state;
        device.eerstVolgendeActie = {};
        device.eerstVolgendeActie.datum = this.state.eerstVolgendeActieDatum;

        if (this.state.categorie === 'machine' && !Utils.checkIfNextActionIn24Hours(device))
        {
            this.setState({icon: '../../assets/icons/conveyor.png'});
        }
        else if (this.state.categorie === 'machine' && Utils.checkIfNextActionIn24Hours(device))
        {
            this.setState({icon: '../../assets/icons/conveyor-red.png'});
        }
        else if (this.state.categorie === 'lamp' && !Utils.checkIfNextActionIn24Hours(device))
        {
            this.setState({icon: '../../assets/icons/small-light-bulb.png'});
        }
        else if (this.state.categorie === 'lamp' && Utils.checkIfNextActionIn24Hours(device))
        {
            this.setState({icon: '../../assets/icons/small-light-bulb-red.png'});
        }
        else if (this.state.categorie === 'band' && !Utils.checkIfNextActionIn24Hours(device))
        {
            this.setState({icon: '../../assets/icons/assembly-line.png'});
        }
        else if (this.state.categorie === 'band' && Utils.checkIfNextActionIn24Hours(device))
        {
            this.setState({icon: '../../assets/icons/assembly-line-red.png'});
        }
    }

    actionCompleted(event)
    {
        event.preventDefault();
        const eerstVolgendeActieDatum = this.state.eerstVolgendeActieDatum;
        const eerstVolgendeActieType = this.state.eerstVolgendeActieType;
        const eerstVolgendeActieOmschrijving = this.state.eerstVolgendeActieOmschrijving;
        this.setState({laatstUitgevoerdeActieDatum : eerstVolgendeActieDatum});
        this.setState({laatstUitgevoerdeActieType : eerstVolgendeActieType});
        this.setState({laatstUitgevoerdeActieOmschrijving : eerstVolgendeActieOmschrijving});
    }

    handleChange(event)
    {
        this.setState({[event.target.name] : event.target.value});
    }

    validateForm(event)
    {
        event.preventDefault();
        this.clearErrorMessages();
        let regexp = new RegExp("^[0-9]?[0-9]\/[0-9]?[0-9]\/[0-9][0-9][0-9][0-9]$");

        if (this.state.naam.length > 100 || this.state.naam === '')
        {
            this.setState({naamMsg: 'Verplicht veld, mag niet meer dan 100 karakters bevatten'});
            this.setState({formValid: false});
        }
        else if (!regexp.test(this.state.laatstUitgevoerdeActieDatum))
        {
            this.setState({datumMsgLaatsteActie: 'Datum moet van dd/mm/yyyy formaat zijn', formValid: false});
            this.setState({formValid: false});
        }
        else if (!regexp.test(this.state.eerstVolgendeActieDatum))
        {
            this.setState({datumMsgEersteActie: 'Datum moet van dd/mm/yyyy formaat zijn'});
            this.setState({formValid: false});
        }
        else
        {
            this.setState({formValid: true});
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

    handleSubmit()
    {
        const payload = {
            id: this.state.id,
            categorie: this.state.categorie,
            naam: this.state.naam,
            omschrijving: this.state.omschrijving,
            laatstUitgevoerdeActie: {
                datum: this.state.laatstUitgevoerdeActieDatum,
                type: this.state.laatstUitgevoerdeActieType,
                omschrijving: this.state.laatstUitgevoerdeActieOmschrijving
            },
            eerstVolgendeActie: {
                datum: this.state.eerstVolgendeActieDatum,
                type: this.state.eerstVolgendeActieType,
                omschrijving: this.state.eerstVolgendeActieOmschrijving
            }
        };

        const url = 'http://localhost:4200/hal/' + this.props.params.hallId + '/apparaat/' + this.state.id;
        fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(payload)
        })
            .then(() => this.props.router.push('/hall/' + this.props.params.hallId))
            .catch((err) => console.log(err));
    }

    render()
    {
        return <DeviceView
            {...this.state}
            actionCompleted={(e) => this.actionCompleted(e)}
            handleChange={(e) => this.handleChange(e)}
            validateForm = {(e) => this.validateForm(e)}
            handleSubmit = {(e) => this.handleSubmit(e)}
        />
    }
}

export default DeviceContainer;