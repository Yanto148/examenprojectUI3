import React, { Component } from 'react';
import { Link } from 'react-router';

class App extends React.Component {

    render() {
        return (
            <div>
                <header>
                    <h1>Fabriek</h1>
                </header>
                <nav>
                    <ul>
                        <li><Link to="/" activeClassName="active">Home</Link></li>
                    </ul>
                </nav>
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    };
}

export default App;