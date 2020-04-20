import React from 'react';
import moment from 'moment';

const TeamsTable = (props) => {
    return (
        <tr key={props.index} className="image" onClick={() => props.editData(props.item)}>
            <td>
                {props.item.name}
            </td>
            <td>
                {
                    props.item.players && props.item.players.length > 0 ? props.item.players.length
                        : "Players Empty"
                }
            </td>
        </tr>
    );
};

export default TeamsTable;