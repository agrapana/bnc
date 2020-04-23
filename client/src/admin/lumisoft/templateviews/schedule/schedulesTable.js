import React from 'react';
import moment from 'moment';

const SchedulesTable = (props) => {
    return (
        <tr key={props.index} className="image" onClick={() => props.editData(props.item)}>
            <td>
                {moment(props.item.start, 'x').format('LLLL')}
            </td>
            <td>
                {props.item.teamleft && props.item.teamleft.name}
            </td>
            <td>
                {props.item.teamright && props.item.teamright.name}
            </td>
            <td>
                {props.item.currentserver && props.item.currentserver.name}
            </td>
            <td>
                {props.item.currentserver && props.item.currentserver.ipaddress}
            </td>
        </tr>
    );
};

export default SchedulesTable;