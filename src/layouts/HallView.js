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
                {this.props.apparaten.map((apparaat, i) =>
                <div style={this.props.positions[i]}>
                    <img key={i} src={this.props.imgSrc[i]}></img>
                </div>
                )}
            </div>
        );
    }

}

export default HallView;