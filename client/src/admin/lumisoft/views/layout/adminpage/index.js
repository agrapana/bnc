import React, { useState } from 'react';
import {
    useSelector
    // useDispatch 
} from 'react-redux';
import { NavLink } from 'react-router-dom';

import path from '../../../allroutes';

import { useWindowSize } from '../../../../widget/windowsize';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faUser, faEnvelope, faShoppingBag, faCog, faShoppingBasket, faShoppingCart, faStickyNote, faMapMarkerAlt, faGlobe, faAddressBook, faHeart, faChessQueen } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faHome, faUser, faEnvelope, faShoppingBag, faCog, faShoppingBasket, faBell, faShoppingCart, faStickyNote, faMapMarkerAlt, faGlobe, faAddressBook, faHeart, faChessQueen)

const AdminLayout = (props) => {
    const size = useWindowSize();
    const { userprops } = useSelector(state => ({
        userprops: state.user.userData
    }));
    // const dispatch = useDispatch();
    const [height] = useState(size.height);
    const [publicnav] = useState(path.mainpath);
    const [templatenav] = useState(path.templatepath);
    const [adminnav] = useState(path.adminpath);

    const publicLink = (items) => (
        userprops ?
            items.map((item, i) => (
                <li key={i} className="menuItem">
                    <NavLink
                        to={item.link}
                        className="linksEach menuLink"
                        activeClassName="active"
                    >
                        <div
                            className="iconcontainer"
                        >
                            <FontAwesomeIcon
                                icon={item.faicons}
                                className="icon agraicon"
                            />
                        </div>
                        {item.name}
                    </NavLink>
                </li>
            ))
            : null

    )

    const templateLink = (items) => (
        userprops ?
            items.map((item, i) => (
                <li key={i} className="menuItem">
                    <NavLink
                        to={item.link}
                        className="linksEach menuLink"
                        activeClassName="active"
                    >
                        <div
                            className="iconcontainer"
                        >
                            <FontAwesomeIcon
                                icon={item.faicons}
                                className="icon agraicon"
                            />
                        </div>
                        {item.name}
                    </NavLink>
                </li>
            ))
            : null

    )

    const adminLink = (items) => (
        userprops ?
            items.map((item, i) => (
                <li key={i} className="menuItem">
                    <NavLink
                        to={item.link}
                        className="linksEach menuLink"
                        activeClassName="active"
                    >
                        <div
                            className="iconcontainer"
                        >
                            <FontAwesomeIcon
                                icon={item.faicons}
                                className="icon agraicon"
                            />
                        </div>
                        {item.name}
                    </NavLink>
                </li>
            ))
            : null
    )

    const fixedHeight = height - 56;
    return (
        <div className="pageWrapper">
            <div className="memberpageLeftNav">
                <nav className="sidebarNavigation agContainer">
                    <ul className="menu">
                        <li className="navigationHeader">Main Area</li>
                        {publicLink(publicnav)}
                        <li className="navigationHeader">Media Area</li>
                        {templateLink(templatenav)}
                        {
                            userprops ?
                                userprops.masteradmin > 0 ?
                                    <li className="navigationHeader">Masteradmin Area</li>
                                    : null
                                : null
                        }
                        {
                            userprops ?
                                userprops.masteradmin > 0 ?
                                    adminLink(adminnav)
                                    : null
                                : null
                        }
                        <li className="version">{path.version}</li>
                    </ul>
                </nav>
            </div>
            <div className="masterContainer" style={{
                minHeight: fixedHeight
            }}>
                {props.children}
            </div>
        </div>
    );

};

export default AdminLayout;