import React from 'react';

const SliderTable = (props) => {
    return (
        <tr key={props.index} className="image" onClick={() => props.editData(props.item)}>
            <td>
                <img src={props.item.images[0].url} alt="" />
            </td>
            <td>
                {props.item.name}
            </td>
        </tr>
    );
};

export default SliderTable;