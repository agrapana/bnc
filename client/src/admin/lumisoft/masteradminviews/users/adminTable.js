import React from 'react';
import moment from 'moment';

const AdminTable = (props) => {
    return (
        <tr key={props.index} className="image" onClick={() => props.editData(props.item)}>
            <td>
                {props.item.name}
            </td>
            <td>
                {props.item.email}
            </td>
            <td>
                {props.item.phone}
            </td>
            <td>
                {moment(props.item.createdAt).format('DD MMM YYYY')}
            </td>
            <td>
                {props.item.isAuth ? "Yes" : "No"}
            </td>
            <td>
                {props.item.isActive ? "Yes" : "No"}
            </td>
        </tr>
    );
};

export default AdminTable;