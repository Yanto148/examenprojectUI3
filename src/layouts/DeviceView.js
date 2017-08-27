import React from 'react';
import { Link } from 'react-router';

class DeviceView extends React.Component
{
    render()
    {
        return(
            <div className="App">
                <div className="container content">
                    <Link className="btn btn-primary btn-sm" to={'/hall/' + this.props.hallId}>&lt;- Back</Link>
                    <h2 className="formTitle"><img src={this.props.icon} alt=""/> Hal {this.props.hallId} - Apparaat {this.props.id}</h2>
                    <form>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Id:</label>
                            <div className="col-sm-10">
                                <input type="text" id="id" className="form-control readonly" readonly value={this.props.id}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Categorie:</label>
                            <div className="col-sm-10">
                                <input type="text" id="id" className="form-control readonly" readonly value={this.props.categorie}/>
                            </div>
                        </div>
                        <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Naam:</label>
                            <div className="col-sm-10">
                                <input id="naam" name="naam" type="text" className="form-control" value={this.props.naam} onChange={(e) => this.props.handleChange(e)}/>
                            </div>
                        </div>
                        <p className="invalid">{this.props.naamMsg}</p>
                    </form>
                    <h2 className="formTitle">Laatst uitgevoerde actie:</h2>
                    <form>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Datum:</label>
                            <div className="col-sm-10">
                                <input id="laatstUitgevoerdeActieDatum" name="laatstUitgevoerdeActieDatum" type="text" className="form-control" value={this.props.laatstUitgevoerdeActieDatum} onChange={(e) => this.props.handleChange(e)}/>
                            </div>
                        </div>
                        <p className="invalid">{this.props.datumMsgLaatsteActie}</p>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Type:</label>
                            <div className="col-sm-10">
                                <select value={this.props.laatstUitgevoerdeActieType} name="laatstUitgevoerdeActieType" className="form-control" onChange={(e) => this.props.handleChange(e)}>
                                    <option value="vervanging">Vervanging</option>
                                    <option value="nazicht">Nazicht</option>
                                </select>
                            </div>
                        </div>
                        <p className="invalid">{this.props.typeMsgLaatsteActie}</p>
                        <div className="form-group">
                            <label>Omschrijving:</label>
                            <textarea id="laatstUitgevoerdeActieOmschrijving" name="laatstUitgevoerdeActieOmschrijving" className="form-control" value={this.props.laatstUitgevoerdeActieOmschrijving} onChange={(e) => this.props.handleChange(e)}/>
                        </div>
                    </form>
                        <h2 className="formTitle">Eerstvolgende actie:</h2>
                    <form>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Datum:</label>
                            <div className="col-sm-10">
                                <input id="eerstVolgendeActieDatum" name="eerstVolgendeActieDatum" type="text" className="form-control" value={this.props.eerstVolgendeActieDatum} onChange={(e) => this.props.handleChange(e)}/>
                            </div>
                        </div>
                        <p className="invalid">{this.props.datumMsgEersteActie}</p>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Type:</label>
                            <div className="col-sm-10">
                                <select value={this.props.eerstVolgendeActieType} name="eerstVolgendeActieType" className="form-control" onChange={(e) => this.props.handleChange(e)}>
                                    <option value="vervanging">Vervanging</option>
                                    <option value="nazicht">Nazicht</option>
                                </select>
                            </div>
                        </div>
                        <p className="invalid">{this.props.typeMsgEersteActie}</p>
                        <div className="form-group">
                            <label>Omschrijving:</label>
                            <textarea id="eerstVolgendeActieOmschrijving" name="eerstVolgendeActieOmschrijving" className="form-control" value={this.props.eerstVolgendeActieOmschrijving} onChange={(e) => this.props.handleChange(e)}/>
                        </div>
                        <div style={{textAlign: "left"}}>
                            <button className="btn btn-primary d-inline formButton" id="button" onClick={(e) => this.props.actionCompleted(e)}>Actie uitgevoerd</button>
                            <button className="btn btn-primary d-inline formButton" id="button" type="button" onClick={(e) => this.props.validateForm(e)}>Verzenden</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default DeviceView;