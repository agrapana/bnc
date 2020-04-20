import React from 'react';
import moment from 'moment';

const LeagueTable = (props) => {
    return (
        <tr key={props.index} className="image" onClick={() => props.editData(props.item)}>
            <td>
                {props.item.name}
            </td>
            <td>
                {moment(props.item.start, 'x').format('DD MMMM YYYY, hh:mm')}
            </td>
            <td>
                {moment(props.item.start, 'x').endOf('day').fromNow()}
            </td>
            <td>
                {
                    props.item.isOpen ? "Open"
                        : props.item.isProcessing ? "Processing"
                            : props.item.isClosed ? "Done"
                                : null
                }
            </td>
        </tr>
    );
};

export default LeagueTable;