import React from 'react';
import { Link } from 'react-router';
import '../App.css'

function PlattegrondView(props)
{
    return(
        <div className="App">
            <div style={props.buttonStyle}>
                <button className="btn btn-primary d-inline buttonGroup" onClick={() => props.switchLayout()}>Lijst</button>
                 <button id="button" className="btn btn-primary btn-danger d-inline buttonGroup" onClick={() => props.slaAlarm()}>Alarm!</button>
            </div>
            <div style={props.containerStyle}>
                {props.hallenSet.map((hal, i) =>
                    <div className="hall" key={i} style={props.styles[i]}>
                        <p>{hal.name}</p>
                        <p>Oppervlakte: {props.oppervlaktes[i]} m²</p>
                        <p>Aantal apparaten: {props.aantalApparaten[i]}</p>
                        <p>Aantal uit te voeren acties: {props.aantalActies[i]}</p>
                        <p><Link to={'/hall/' + hal.id}>Details</Link></p>
                        <button id="button" className="btn btn-primary btn-danger d-inline buttonGroup" onClick={() => props.slaAlarmHal(i)}>Alarm!</button>
                    </div>
                    )}
                </div>

            </div>
        )
}

export default PlattegrondView;