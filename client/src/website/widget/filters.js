import React, {
    useState
    // useEffect
} from 'react';

export const FilterList = (props) => {

    // const [checked, checkedHandler] = useState([])
    const [cleardata] = useState(props.cleardata)

    const clearAllData = () => {
        props.loadingHandler(true)
        props.checkedHandler([]);
        props.handleFilters([]);
    }

    const filterLists = () => (
        props.list ?
            props.list.map((item, i) => (
                <li
                    key={item._id}
                >
                    <div
                        className="filterItem"
                        onClick={() => handleToggle(item._id)}
                    >
                        {item.name}
                        {/* <span>(5)</span> */}
                        <input
                            type="radio"
                            className="custom-control-input"
                            id="rememberMe"
                            readOnly
                            // onChange={() => handleToggle(item._id)}
                            checked={props.checked.indexOf(item._id) !== -1}
                        ></input>
                        {/* <Checkbox 
                            onChange={handleToggle(item._id)}
                            
                        /> */}
                    </div>
                </li>
            ))
            : null
    )

    ////////////////////////////////////////////////////////////////////
    /////////////// RADIO
    ////////////////////////////////////////////////////////////////////
    const handleToggle = (value) => {
        props.loadingHandler(true)
        const currentIndex = props.checked.indexOf(value);
        const newChecked = [...props.checked];
        if (newChecked.length > 0) {
            newChecked.splice(currentIndex, 1)
            newChecked.push(value)
        } else {
            if (currentIndex === -1) {
                newChecked.push(value)
            } else {
                newChecked.splice(currentIndex, 1)
            }
        }
        props.checkedHandler(newChecked)
        props.handleFilters(newChecked)
    }

    ////////////////////////////////////////////////////////////////////
    /////////////// CHECKBOX
    ////////////////////////////////////////////////////////////////////
    // const handleToggle = (value) => {
    //     // console.log(value)
    //     // const checked = checked (sama seperti diatas)
    //     const currentIndex = checked.indexOf(value);

    //     const newChecked = [...checked];

    //     if (currentIndex === -1) {
    //         newChecked.push(value)
    //     } else {
    //         newChecked.splice(currentIndex, 1)
    //     }
    //     // console.log(newChecked)
    //     checkedHandler(newChecked)
    //     props.handleFilters(newChecked)

    // }


    return (
        <div className="filterWrapper">
            <div className="filterTitle">
                <h3>{props.title}</h3>
            </div>
            <ul className="filterLists">
                {filterLists()}
                {
                    cleardata ?
                        <li>
                            <div
                                className="filterItem"
                                onClick={() => clearAllData()}
                            >
                                Show all
                            </div>
                        </li>
                        : null
                }
            </ul>
        </div>
    );

}

export default FilterList;