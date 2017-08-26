import React from 'react';

function ActionsView(props) {
    return(
        <div>
            <aside>
                <form>
                    <label>Sorteer: </label>
                    <select onChange={(e) => props.sort(e)}>
                        <option>Hal</option>
                        <option>Type</option>
                        <option>Datum</option>
                    </select>

                </form>
            </aside>

            <table>
                <thead>
                <tr>
                    <th>Hall</th>
                    <th>Datum</th>
                    <th>Type</th>
                    <th>Omschrijving</th>
                </tr>
                </thead>
                <tbody>
                {props.actions.map((action, i) =>
                        <tr key={i}>
                            <td>{action.hall}</td>
                            <td>{action.datum}</td>
                            <td>{action.type}</td>
                            <td>{action.omschrijving}</td>
                        </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default ActionsView;