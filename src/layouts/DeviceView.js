import React from 'react';

class DeviceView extends React.Component
{
    // constructor(props)
    // {
    //     //this.state =
    // }

    componentDidMount()
    {
        //console.log(this.props.device)
    }

    render()
    {
    return(
        <div className="App">
            <form>
                <label>Naam:</label> <input id="naam" name="naam" type="text" value={this.props.naam} onChange={(e) => this.props.handleChange(e)}/>
                <p><label>laatstUitgevoerdeActieDatum:</label> <input id="laatstUitgevoerdeActieDatum" name="laatstUitgevoerdeActieDatum" type="text" value={this.props.laatstUitgevoerdeActieDatum} onChange={(e) => this.props.handleChange(e)}/></p>
                <p><label>laatstUitgevoerdeActieType:</label> <input id="laatstUitgevoerdeActieType" name="laatstUitgevoerdeActieType" type="text" value={this.props.laatstUitgevoerdeActieType} onChange={(e) => this.props.handleChange(e)}/></p>
                <p><label>laatstUitgevoerdeActieOmschrijving:</label> <input id="laatstUitgevoerdeActieOmschrijving" name="laatstUitgevoerdeActieOmschrijving" type="text" value={this.props.laatstUitgevoerdeActieOmschrijving} onChange={(e) => this.props.handleChange(e)}/></p>
                <p><label>eerstVolgendeActieDatum:</label> <input id="eerstVolgendeActieDatum" name="eerstVolgendeActieDatum" type="text" value={this.props.eerstVolgendeActieDatum} onChange={(e) => this.props.handleChange(e)}/></p>
                <p><label>eerstVolgendeActieType:</label> <input id="eerstVolgendeActieType" name="eerstVolgendeActieType" type="text" value={this.props.eerstVolgendeActieType} onChange={(e) => this.props.handleChange(e)}/></p>
                <p><label>eerstVolgendeActieOmschrijving:</label> <input id="eerstVolgendeActieOmschrijving" name="eerstVolgendeActieOmschrijving" type="text" value={this.props.eerstVolgendeActieOmschrijving} onChange={(e) => this.props.handleChange(e)}/></p>
                <p><label>Actie uitgevoerd: </label><input type="checkbox" onClick={(e) => this.props.actionCompleted()}/></p>
            </form>

        </div>
    )}
}

export default DeviceView

/*
 <form>
 <ul>
 <li>Id: {this.props.device.id}</li>
 <li>Categorie: {this.props.device.categorie}</li>
 <li><label>Naam:</label> <input id="naam" name="naam" type="text" value={this.props.device.naam} /*onChange={(e) => this.props.handleChange(e)}/></li>
<li><label>Omschrijving:</label> <input id="omschrijving" name="omschrijving" type="text" value={this.props.device.omschrijving} /*onChange={(e) => this.props.handleChange(e)}/></li>
<li>Laatst uitgevoerde actie:
    <ul>
        <li><label>Datum: (dd/mm/yyyy)</label> <input id="datumLaatsteActie" name="datumLaatsteActie" type="text" value={this.props.laatstUitgevoerdeActie.datum} /*onChange={(e) => this.props.handleLaatsteActieChange(e)}/></li>
        <li><label>Type:</label> <input id="typeLaatsteActie" name="typeLaatsteActie" type="text" value={this.props.laatstUitgevoerdeActie.type} /*onChange={(e) => this.props.handleLaatsteActieChange(e)}/></li>
        <li><label>Omschrijving:</label> <input id="omschrijvingLaatsteActie" name="omschrijvingLaatsteActie" type="text" value={this.props.laatstUitgevoerdeActie.omschrijving} /*onChange={(e) => this.props.handleLaatsteActieChange(e)}/></li>
    </ul>
    </li>
    <li>Eerstvolgende actie:
    <ul>
        <li><label>Datum: (dd/mm/yyyy)</label> <input id="datumEerstVolgendeActie" name="datumEerstVolgendeActie" type="text" value={this.props.eerstVolgendeActie.datum} /*onChange={(e) => this.props.handleEerstVolgendeActieChange(e)}/></li>
        <li><label>Type:</label> <input id="typeEerstVolgendeActie" name="typeEerstVolgendeActie" type="text" value={this.props.eerstVolgendeActie.type} /*onChange={(e) => this.props.handleEerstVolgendeActieChange(e)}/></li>
        <li><label>Omschrijving:</label> <input id="omschrijvingEerstVolgendeActie" name="omschrijvingEerstVolgendeActie" type="text" value={this.props.eerstVolgendeActie.omschrijving} /*onChange={(e) => this.props.handleEerstVolgendeActieChange(e)}/></li>
        <li><label>Actie uitgevoerd: </label><input type="checkbox" onClick={(e) => this.props.actionCompleted()}/></li>
    </ul>
    </li>
    </ul>
    <button>Verzenden</button>
    </form>
 */