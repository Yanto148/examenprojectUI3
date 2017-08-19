import React from 'react';
import { Link } from 'react-router';

class PlattegrondView extends React.Component
{
    render() {
        return(
            <div className="App">
                <div style={this.props.containerStyle}>
                    {this.props.hallenSet.map((hal, i) =>
                    <div key={i} style={this.props.styles[i]}>
                        <p>{hal.name}</p>
                        <p>Oppervlakte: {this.props.oppervlaktes[i]} m²</p>
                        <p>Aantal apparaten: {this.props.aantalApparaten[i]}</p>
                        <p>Aantal uit te voeren acties: {this.props.aantalActies[i]}</p>
                    </div>
                )}
                </div>
                <p><button onClick={(e) => this.props.switchLayout()}>Lijst</button></p>
            </div>
        )
    }
}

export default PlattegrondView;