import React from 'react';
import { Link } from 'react-router';

class LijstView extends React.Component
{
    render()
    {
        let style = {
            "textAlign": "left"
        };
        return(
            <div className = "App">
                <p style={this.props.buttonStyle}>
                    <button className="btn btn-primary d-inline buttonGroup" onClick={(e) => this.props.switchLayout()}>Plattegrond</button>
                </p>
                <div style={this.props.containerStyle}>
                    <ul style={style}>
                        {this.props.hallenSet.map((hal, i) =>
                            <li key={i} className="hallsList">{hal.name}
                                <ul className="hallName">
                                    <li>Oppervlakte: {this.props.oppervlaktes[i]} m²</li>
                                    <li>Aantal apparaten: {this.props.aantalApparaten[i]}</li>
                                    <li>Aantal uit te voeren acties: {this.props.aantalActies[i]}</li>
                                    <li><Link to={'/hall/' + hal.id}>Details</Link></li>
                                </ul>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

export default LijstView;