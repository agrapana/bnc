import React from 'react';

const ServersTable = (props) => {
    return (
        <tr key={props.index} className="image" onClick={() => props.editData(props.item)}>
            <td>
                {props.item.name}
            </td>
            <td>
                {props.item.subname}
            </td>
            <td>
                {props.item.ipaddress}
            </td>
            <td>
                {props.item.players && props.item.players.length > 0 ? props.item.players.length : "Empty"}
            </td>
        </tr>
    );
};

export default ServersTable;