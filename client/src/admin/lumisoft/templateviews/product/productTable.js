import React from 'react';

const ProductTable = (props) => {
    return (
        <tr key={props.index} className="image" onClick={() => props.editData(props.item)}>
            {
                props.item.images[0] && props.item.images[0].url ?
                    <td>
                        <img src={props.item.images[0].url} alt="" />
                    </td>
                    : 
                    <td>
                        <img src={window.location.origin + "/admin/assets/images/notavailable2.jpg"} alt="" />
                    </td>
            }
            <td>
                {props.item.name}
            </td>
            <td>
                {props.item.brand.name}
            </td>
            <td>
                {
                    props.item.category.map((data, index) => (
                        <span key={index}>{data.name}, </span>
                    ))
                }
            </td>
        </tr>
    );
};

export default ProductTable;