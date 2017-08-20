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
            .then(() => this.setImgSrc())
            .then(() => console.log(this.state))
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

    setApparaten(hal)
    {
        hal.apparaten.forEach((apparaat) =>
        {
            this.setState((prevState, props) => {this.state.apparaten.push(apparaat)});
        });
    }

    setImgSrc()
    {
        this.state.apparaten.map((apparaat, i) => {
            if (apparaat.categorie === 'machine')
            {
                apparaat.imageSrc = "../../public/assets/icons/conveyor.png";
                return apparaat;
            }
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
