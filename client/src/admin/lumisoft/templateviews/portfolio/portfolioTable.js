import React from 'react';

const PortfolioTable = (props) => {
    return (
        <tr key={props.index} className="image" onClick={() => props.editData(props.item)}>
            {
                props.item.images[0] && props.item.images[0].url ?
                    <td>
                        <img src={props.item.images[0].url} alt="" />
                    </td>
                    : 
                    <td>
                        <img src={window.location.origin + "/admin/assets/images/notavailablef.jpg"} alt="" />
                    </td>
            }
            <td>
                {props.item.name}
            </td>
            <td>
                {props.item.subname}
            </td>
            <td>
                {props.item.category.name}
            </td>
        </tr>
    );
};

export default PortfolioTable;