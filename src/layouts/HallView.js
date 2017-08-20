import React from 'react';

class HallView extends React.Component{

    constructor(props)
    {
        super(props);
    }

    componentDidMount()
    {
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
                            <img src={apparaat.imageSrc}/>
                        </div>
                    );
                })}
            </div>
        );
    }

}

export default HallView;