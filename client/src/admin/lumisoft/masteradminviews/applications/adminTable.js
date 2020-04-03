import React from 'react';
// import moment from 'moment';

const AdminTable = (props) => {
    return (
        <tr key={props.index} className="image" onClick={() => props.editData(props.item)}>
            <td>
                {props.item.name}
            </td>
            <td>
                {props.item.description}
            </td>
            <td>
                {props.item.private ? "Yes" : "No"}
            </td>
            <td>
                No
            </td>
        </tr>
    );
};

export default AdminTable;