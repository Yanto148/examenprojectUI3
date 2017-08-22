import React from 'react';
import * as HallenService from "../service/HallService";
import Plattegrond from '../layouts/BlueprintView';
import Lijst from '../layouts/ListView';
import * as Utils from '../service/Utils';
import { Link } from 'react-router';

class PlattegrondContainer extends React.Component
{
    // TODO implement redux to keep state between blueprint hall alarm and detail view alarm: https://css-tricks.com/learning-react-redux/



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
            },
            buttonStyle: {
                textAlign: "center"
            },
            alarm: false,
            backgroundSwitcher: false
        }
    }

    componentDidMount()
    {
        HallenService.getHallenFromBackend()
            .then(hallen => {this.setState({hallenSet: hallen})})
            .then(() => this.setStyles(this.state.hallenSet, 'white'))
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
                if (Utils.checkIfNextActionIn24Hours(apparaat))
                {
                    aantal++;
                }
            });
            this.setState((prevSate, props) => {this.state.aantalActies.push(aantal)});
        });
    }

    setStyles(hallen, backgroundColor)
    {
        let styles = [];
        this.setState({styles: styles}, function () {   // Zie https://stackoverflow.com/questions/34800893/reactjs-need-to-click-twice-to-set-state-and-run-function
            hallen.forEach((hal) => {
                let style = {
                    left: hal.x,
                    top: hal.y,
                    width: hal.width,
                    height: hal.height,
                    border: "1px solid black",
                    position: "absolute",
                    textAlign: "center",
                    backgroundColor: backgroundColor
                };
                this.setState((prevState, props) => {this.state.styles.push(style)});
            });
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

    slaAlarm()
    {
        let backgroundColor = '';

        clearInterval(this.interval);
        this.setState({alarm: !this.state.alarm}, function () {
            if (this.state.alarm)
            {
                this.interval = setInterval(() => {
                    if (this.state.backgroundSwitcher)
                        backgroundColor = 'white';
                    else
                        backgroundColor = 'red';
                    this.setState({backgroundSwitcher: !this.state.backgroundSwitcher});
                    this.setStyles(this.state.hallenSet, backgroundColor);
                    console.log(this.state);
                }, 1000);
            }
            else
            {
                this.setStyles(this.state.hallenSet, 'white');
            }
        });
    }

    render() {
        let partial;
        if(this.state.activePage === 'Plattegrond')
        {
            partial = <Plattegrond {...this.state} switchLayout={() => this.switchLayout()} slaAlarm={() => this.slaAlarm()}/>;
        }
        else if (this.state.activePage === 'Lijst')
        {
            partial = <Lijst {...this.state} switchLayout={() => this.switchLayout()} slaAlarm={() => this.slaAlarm()}/>;
        }

        return (
            <div>
                {partial}
            </div>
        );
    }
}

export default PlattegrondContainer;