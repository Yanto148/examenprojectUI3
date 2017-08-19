import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import * as HallenService from "../service/HallenService";
import Plattegrond from '../layouts/PlattegrondView';
import Lijst from '../layouts/LijstView';

class PlattegrondContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            hallenSet: [],
            styles: [],
            oppervlaktes: [],
            aantalApparaten: [],
            aantalActies: [],
            activePage: 'Plattegrond',
            containerStyle : {
                position: "relative",
                width: "1000px",
                margin: "20px auto"
            }
        }
    }

    componentDidMount()
    {
        HallenService.getHallenFromBackend()
            .then(hallen => {this.setState({hallenSet: hallen})})
            .then(() => this.setStyles(this.state.hallenSet))
            .then(() => this.setOppervlaktes(this.state.hallenSet))
            .then(() => this.setAantalApparaten(this.state.hallenSet))
            .then(() => this.setAantalActies(this.state.hallenSet));
    }

    setOppervlaktes(hallen)
    {
        hallen.forEach((hal) => {
            let width = hal.width.split("px");
            let height = hal.height.split("px");
            let oppervlakte = (width[0] * height[0]) / 100;
            this.setState((prevSate, props) => {this.state.oppervlaktes.push(oppervlakte)});
        });
    }

    setAantalApparaten(hallen)
    {
        hallen.forEach((hal) => {
            let aantalApparaten = hal.apparaten.length;
            this.setState((prevSatet, props) => this.state.aantalApparaten.push(aantalApparaten));
        });
    }

    setAantalActies(hallen)
    {
        let aantal = 0;
        hallen.forEach((hal) => {
            aantal = 0;
            hal.apparaten.forEach((apparaat) => {
                let datumStrings = apparaat.eerstVolgendeActie.datum.split('/');
                let eerstVolgendeActieDatum = new Date(datumStrings[2], datumStrings[1] - 1, datumStrings[0]);
                let currentDay = new Date();

                let eerstVolgendeActieDatumSec = eerstVolgendeActieDatum.getTime();
                let currentDaySec = currentDay.getTime();

                let daysBetween = (eerstVolgendeActieDatumSec - currentDaySec) / 86400000;

                if ((daysBetween) < 2)
                {
                    aantal++;
                }
            });
            this.setState((prevSate, props) => {this.state.aantalActies.push(aantal)});
        });
    }

    setStyles(hallen)
    {
        hallen.forEach((hal) => {
            let style = {
                left: hal.x,
                top: hal.y,
                width: hal.width,
                height: hal.height,
                border: "1px solid black",
                position: "absolute"
            };
            this.setState((prevState, props) => {this.state.styles.push(style)})
        });
    }

    switchLayout()
    {
        if (this.state.activePage === 'Plattegrond')
        {
            this.setState({activePage : 'Lijst'});
        }
        else if (this.state.activePage === 'Lijst')
        {
            this.setState({activePage : 'Plattegrond'});
        }
    }

    render() {
        let partial;
        if(this.state.activePage === 'Plattegrond')
        {
            partial = <Plattegrond {...this.state} switchLayout={() => this.switchLayout()}/>;
        }
        else if (this.state.activePage === 'Lijst')
        {
            partial = <Lijst {...this.state} switchLayout={() => this.switchLayout()}/>;
        }
        return (
            <div>
                {partial}
            </div>
        );
    }
}

export default PlattegrondContainer;