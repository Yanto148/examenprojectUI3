// import React from 'react';
//
// class DeviceView extends React.Component
// {
//     render()
//     {
//     return(
//         <div className="App">
//             <form>
//                 <p>Id: {this.props.deviceId}</p>
//                 <p>Categorie: {this.props.categorie}</p>
//                 <label>Naam:</label> <input id="naam" name="naam" type="text" value={this.props.naam} onChange={(e) => this.props.handleChange(e)}/>
//                 <p>{this.props.naamMsg}</p>
//                 <h2>Laatst uitgevoerde actie:</h2>
//                 <p><label>Datum:</label> <input id="laatstUitgevoerdeActieDatum" name="laatstUitgevoerdeActieDatum" type="text" value={this.props.laatstUitgevoerdeActieDatum} onChange={(e) => this.props.handleChange(e)}/></p>
//                 <p>{this.props.datumMsgLaatsteActie}</p>
//                 <p><label>Type:</label>
//                     <select value={this.props.laatstUitgevoerdeActieType} name="laatstUitgevoerdeActieType" onChange={(e) => this.props.handleChange(e)}>
//                         <option value="vervanging">Vervanging</option>
//                         <option value="nazicht">Nazicht</option>
//                     </select>
//                 </p>
//                 <p>{this.props.typeMsgLaatsteActie}</p>
//                 <p><label>Omschrijving:</label> <input id="laatstUitgevoerdeActieOmschrijving" name="laatstUitgevoerdeActieOmschrijving" type="text" value={this.props.laatstUitgevoerdeActieOmschrijving} onChange={(e) => this.props.handleChange(e)}/></p>
//                 <h2>Eerstvolgende actie:</h2>
//                 <p><label>Datum:</label> <input id="eerstVolgendeActieDatum" name="eerstVolgendeActieDatum" type="text" value={this.props.eerstVolgendeActieDatum} onChange={(e) => this.props.handleChange(e)}/></p>
//                 <p>{this.props.datumMsgEersteActie}</p>
//                 <p><label>Type:</label>
//                     <select value={this.props.eerstVolgendeActieType} name="eerstVolgendeActieType" onChange={(e) => this.props.handleChange(e)}>
//                         <option value="vervanging">Vervanging</option>
//                         <option value="nazicht">Nazicht</option>
//                     </select>
//                 </p>
//                 <p>{this.props.typeMsgEersteActie}</p>
//                 <p><label>Omschrijving:</label> <input id="eerstVolgendeActieOmschrijving" name="eerstVolgendeActieOmschrijving" type="text" value={this.props.eerstVolgendeActieOmschrijving} onChange={(e) => this.props.handleChange(e)}/></p>
//                 <button onClick={(e) => this.props.actionCompleted(e)}>Actie uitgevoerd</button>
//                 <button type="button" onClick={(e) => this.props.validateForm(e)}>Verzenden</button>
//             </form>
//         </div>
//     )}
// }
//
// export default DeviceView;

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class DeviceView extends Component {
    render() {
        const { handleSubmit } = this.props;
        const { actionCompleted } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="naam">Naam:</label>
                    <Field id="naam" name="naam" component="input" type="text"/>
                </div>
                <h2>Laatst uitgevoerde actie:</h2>
                <div>
                    <label htmlFor="laatstUitgevoerdeActieDatum">Datum:</label>
                    <Field id="laatstUitgevoerdeActieDatum" name="laatstUitgevoerdeActieDatum" component="input"
                           type="text"/>
                </div>
                <div>
                    <label htmlFor="laatstUitgevoerdeActieType">Type:</label>
                    <Field id="laatstUitgevoerdeActieType" component="select" name="laatstUitgevoerdeActieType">
                        <option value="vervanging">Vervanging</option>
                        <option value="nazicht">Nazicht</option>
                    </Field>
                </div>
                <div>
                    <label htmlFor="laatstUitgevoerdeActieOmschrijving">Omschrijving:</label>
                    <Field id="laatstUitgevoerdeActieOmschrijving" name="laatstUitgevoerdeActieOmschrijving"
                           component="input" type="text"/>
                </div>
                <h2>Eerstvolgende actie:</h2>
                <div>
                    <label htmlFor="eerstVolgendeActieDatum">Datum:</label>
                    <Field id="eerstVolgendeActieDatum" name="eerstVolgendeActieDatum" component="input" type="text"/>
                </div>
                <div>
                    <label htmlFor="eerstVolgendeActieType">Type:</label>
                    <Field id="eerstVolgendeActieType" component="select" name="eerstVolgendeActieType">
                        <option value="vervanging">Vervanging</option>
                        <option value="nazicht">Nazicht</option>
                    </Field>
                </div>
                <div>
                    <label htmlFor="eerstVolgendeActieOmschrijving">Omschrijving:</label>
                    <Field id="eerstVolgendeActieOmschrijving" name="eerstVolgendeActieOmschrijving"
                           component="input" type="text"/>
                </div>
                <button onClick={ actionCompleted }>Actie uitgevoerd</button>
                <button type="submit">Submit</button>
            </form>
        )
    }
}

DeviceView = reduxForm({
    form: 'device' // a unique name for this form
})(DeviceView);

export default DeviceView;