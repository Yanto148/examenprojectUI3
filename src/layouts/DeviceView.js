import React from 'react';

class DeviceView extends React.Component{

    componentDidMount()
    {
        console.log(this.props.device)
    }

    render()
    {
    return(
        <div className="App" style={this.props.style}>
            <ul>
                <li>Id: {this.props.device.id}</li>
                <li>Categorie: {this.props.device.categorie}</li>
                <li>Naam: {this.props.device.naam}</li>
                <li>Omschrijving: {this.props.device.omschrijving}</li>
                <li>Laatst uitgevoerde actie:
                    <ul>
                        <li>Datum: {this.props.laatstUitgevoerdeActie.datum}</li>
                        <li>Type: {this.props.laatstUitgevoerdeActie.type}</li>
                        <li>Omschrijving: {this.props.laatstUitgevoerdeActie.omschrijving}</li>
                    </ul>
                </li>
                <li>Eerstvolgende actie:
                    <ul>
                        <li>Datum: {this.props.eerstVolgendeActie.datum}</li>
                        <li>Type: {this.props.eerstVolgendeActie.type}</li>
                        <li>Omschrijving: {this.props.eerstVolgendeActie.omschrijving}</li>
                    </ul>
                </li>
            </ul>
        </div>
    )}
}

export default DeviceView