import React from 'react';
import { Link } from 'react-router';
import * as HallenService from "./service/HallService";
import HallAggregateContainer from './containers/HallContainer';

class App extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            alarmen: [],
            hallen: []
        };
        this.setAlarm = this.setAlarm.bind(this);
    }

    componentDidMount()
    {
        HallenService.getHallenFromBackend()
            .then(hallen => {this.setState({hallen: hallen})})
            .then(() => this.setAlarmen(this.state.hallen));
        //console.log(this.props.children)
    }

    setAlarmen(hallen)
    {
        hallen.forEach((hal) => {
            let alarm = {
                hallId: hal.id,
                alarmHall: false
            };
            this.setState((prevSate, props) => this.state.alarmen.push(alarm));
        })
    }


    setAlarm(hallId)
    {
        // TODO
        //let alarm = this.state.alarmen


    }

    render() {
        const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child,
                {
                setAlarm: this.setAlarm,
                ...this.state
                })
        );
        return (
            <div>
                <header>
                    <h1>Fabriek</h1>
                </header>
                <nav>
                    <ul>
                        <li><Link to="/" activeClassName="active">Home</Link></li>
                    </ul>
                </nav>
                <main>
                    {childrenWithProps}
                    {/*{React.cloneElement(*/}
                        {/*this.props.children,*/}
                        {/*{...this.state},*/}
                        {/*{setAlarm : this.setAlarm()}*/}
                        {/*)*/}
                    {/*}*/}
                </main>
                <footer>
                    <div>Icons made by <a href="https://www.flaticon.com/authors/designmodo" title="Designmodo">Designmodo</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
                </footer>
            </div>
        )
    };
}

export default App;