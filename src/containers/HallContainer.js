import React , {Component} from 'react';
import * as HallenService from "../service/HallenService";
import Hall from '../layouts/HallView';

class HallContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            hallInfo: {},
            apparaten: [],
            categorien: [],
            style: {},
            imgSrc: [],
            positions: []
        }
    }

    componentDidMount()
    {
        HallenService.getHallFromBackend(this.props.params.hallId)
            .then((hal) => {
                this.setState({hallInfo: hal});
                return hal;
            })
            .then((hal) => {
                this.setStyle(hal);
                return hal;
            })
            .then((hal) => this.setApparaten(hal))
            .then(() => this.setCategorien())
            .then(() => this.setPositions());
            //.then(() => console.log(this.state));
    }

    setStyle(hal)
    {
        let style = {
            width: hal.width,
            height: hal.height,
            border: "1px solid black",
            position: "relative",
            margin: "0 auto"
        };
        this.setState({style: style});
    }

    setCategorien()
    {
        this.state.apparaten.forEach((apparaat) =>
        {
            if (apparaat.categorie === 'machine')
            {
                this.setState((prevState, props) => {this.state.imgSrc.push('../../assets/icons/conveyor.png')});
                //console.log(this.state.imgSrc);
            }
            else if (apparaat.categorie === 'band')
            {
                this.setState((prevState, props) => {this.state.imgSrc.push('../../assets/icons/assembly-line.png')})
            }
            else if (apparaat.categorie === 'lamp')
            {
                this.setState((prevState, props) => {this.state.imgSrc.push('../../assets/icons/small-light-bulb.png')})
            }
        });
        console.log(this.state.imgSrc);
    }

    setApparaten(hal)
    {
        hal.apparaten.forEach((apparaat) =>
        {
            this.setState((prevState, props) => {this.state.apparaten.push(apparaat)});
        });
    }

    setPositions()
    {

        this.state.apparaten.forEach((apparaat) =>
        {
            let postion = {
                left: apparaat.x,
                top: apparaat.y,
                position: "absolute"
            };
            this.setState((prevState, props) => {this.state.positions.push(postion)});
        });
    }

    render()
    {
        return(
          <Hall {...this.state}/>
        );
    }
}

export default HallContainer;
