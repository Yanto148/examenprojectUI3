import React from 'react';
import { Link } from 'react-router';

class HallView extends React.Component{
    render()
    {
        return(
            <div className="App">
                <p style={this.props.buttonStyle}><button onClick={() => this.props.slaAlarm()}>{this.props.alarm ? 'Zet alarm uit' : 'Sla alarm!'}</button></p>
                <div style={this.props.style}>
                    {this.props.hallInfo.name}
                    {this.props.apparaten.map(apparaat => {
                        let style = {
                            left: apparaat.x,
                            top: apparaat.y,
                            position: "absolute"
                        };
                        return (
                            <div key={apparaat.id} style={style}>
                                <Link to={'/hall/' + this.props.hallInfo.id + '/apparaat/' + apparaat.id}><img src={apparaat.imageSrc} alt=""/></Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

}

export default HallView;