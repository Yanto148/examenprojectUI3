import React from 'react';
import { Link } from 'react-router';

class HallView extends React.Component{

    constructor(props)
    {
        super(props);
    }

    componentDidMount()
    {
        console.log('Hallview props:');
        console.log(this.props);
    }

    render()
    {
        return(
            <div className="App" style={this.props.style}>
                {this.props.hallInfo.name}
                {this.props.apparaten.map(apparaat => {
                    let style = {
                        left: apparaat.x,
                        top: apparaat.y,
                        position: "absolute"
                    };
                    return (
                        <div key={apparaat.id} style={style}>
                            <Link to={'/hall/' + this.props.hallInfo.id + '/apparaat/' + apparaat.id}><img src={apparaat.imageSrc}/></Link>
                        </div>
                    );
                })}
            </div>
        );
    }

}

export default HallView;