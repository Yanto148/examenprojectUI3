import React from 'react';
import * as HallenService from "../service/HallService";
import Plattegrond from '../layouts/BlueprintView';
import Lijst from '../layouts/ListView';
import * as Utils from '../service/Utils';

class PlattegrondContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            hallenSet: [],
            styles: [],
            alarmsPerHall: [],
            oppervlaktes: [],
            aantalApparaten: [],
            aantalActies: [],
            activePage: 'Plattegrond',
            containerStyle : {
                position: "relative",
                width: "100%",
                maxWidth: "1000px",
                margin: "20px auto"
            },
            buttonStyle: {
                textAlign: "center"
            },
            alarm: false,
            backgroundSwitcher: false,
            windowWidth: 0
        };
    }

    componentDidMount()
    {
        HallenService.getHallsFromBackend()
            .then(hallen => {this.setState({hallenSet: hallen})})
            .then(() => this.setStyles(this.state.hallenSet, '#E1E1E1'))
            .then(() => this.setOppervlaktes(this.state.hallenSet))
            .then(() => this.setAantalApparaten(this.state.hallenSet))
            .then(() => this.setAantalActies(this.state.hallenSet))
            .then(() => this.setAlarmsPerHall(this.state.hallenSet));

        window.addEventListener("resize", (() => {
            this.setState({windowWidth : window.innerWidth});
        }));
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
        this.setState({styles: styles}, function () {
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

    setAlarmsPerHall(hallen)
    {
        for(let i = 0; i < hallen.length; i++)
        {
            let alarm = {
                index: i,
                alarm: false
            };
            this.setState((prevState, props) => {this.state.alarmsPerHall.push(alarm)});
        }
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

    slaAlarmHal(i)
    {
        clearInterval(this.intervalHall);
        const styles = this.state.styles;
        const style = styles[i];

        const alarms = this.state.alarmsPerHall;
        const alarmObject = alarms[i];
        alarmObject.alarm = !alarmObject.alarm;

        if (alarmObject.alarm)
        {
            let backGroundSwitcher = false;
            this.intervalHall = setInterval(() => {
                if (backGroundSwitcher)
                {
                    style.backgroundColor = '#E1E1E1';
                }
                else
                {
                    style.backgroundColor = 'orange';
                }
                this.setState({styles: styles});
                backGroundSwitcher = !backGroundSwitcher;
            }, 1000);
        }
        else
        {
            style.backgroundColor = '#E1E1E1';
            this.setState({alarmsPerHall: alarms, styles: styles});
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
                        backgroundColor = '#E1E1E1';
                    else
                        backgroundColor = 'red';
                    this.setState({backgroundSwitcher: !this.state.backgroundSwitcher});
                    this.setStyles(this.state.hallenSet, backgroundColor);
                    //console.log(this.state);
                }, 1000);
            }
            else
            {
                this.setStyles(this.state.hallenSet, '#E1E1E1');
            }
        });
    }

    render() {
        let partial;
        let width = window.innerWidth;
        const breakpoint = 600;
        if (this.state.activePage === 'Lijst' ||width < breakpoint)
        {
            partial = <Lijst {...this.state} switchLayout={() => this.switchLayout()}/>;
        }
        else if(this.state.activePage === 'Plattegrond')
        {
            partial = <Plattegrond {...this.state} switchLayout={() => this.switchLayout()} slaAlarm={() => this.slaAlarm()} slaAlarmHal = {(i) => this.slaAlarmHal(i)}/>;
        }


        return (
            <div>
                {partial}
            </div>
        );
    }
}

export default PlattegrondContainer;