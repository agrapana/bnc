import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faBars)

const drawerToggle = props => (
    <button className="toggle_button" onClick={props.click}>
        <FontAwesomeIcon
            icon={faBars}
            className="icon"
        />
    </button>
);

export default drawerToggle;