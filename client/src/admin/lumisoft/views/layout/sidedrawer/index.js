import React, { useState } from 'react';
import {
    useSelector
    // useDispatch 
} from 'react-redux';

import path from '../../../allroutes';

import { NavLink } from 'react-router-dom';
// import { logoutUser } from '../../../../../store/actions/user_action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SideDrawer = (props) => {
    const { userprops } = useSelector(state => ({
        userprops: state.user.userData
    }));
    // const dispatch = useDispatch();
    const [publicnav] = useState(path.mainpath);
    const [templatenav] = useState(path.templatepath);
    const [adminnav] = useState(path.adminpath);

    // const logoutHandler = () => {
    //     dispatch(logoutUser()).then(response => {
    //         if (response.payload.success) {
    //             // console.log(response.payload);
    //             props.click()
    //             props.history.push('/');
    //         }
    //     })
    // }

    const publicLink = (items) => (
        userprops ?
            items.map((item, i) => (
                <li key={i}>
                    <NavLink
                        to={item.link}
                        activeClassName="active"
                        onClick={() => props.click()}
                        exact
                    >
                        <div className="itemContent">
                            <div className="itemIcon">
                                <FontAwesomeIcon
                                    icon={item.faicons}
                                    className="icon"
                                />
                            </div>
                            <div className="itemInner">
                                <span className="title">{item.name}</span>
                            </div>
                        </div>
                    </NavLink>
                </li>
            ))
            : null

    )

    const templateLink = (items) => (
        userprops ?
            items.map((item, i) => (
                <li key={i}>
                    <NavLink
                        to={item.link}
                        activeClassName="active"
                        onClick={() => props.click()}
                        exact
                    >
                        <div className="itemContent">
                            <div className="itemIcon">
                                <FontAwesomeIcon
                                    icon={item.faicons}
                                    className="icon"
                                />
                            </div>
                            <div className="itemInner">
                                <span className="title">{item.name}</span>
                            </div>
                        </div>
                    </NavLink>
                </li>
            ))
            : null
    )

    const adminLink = (items) => (
        userprops ?
            items.map((item, i) => (
                <li key={i}>
                    <NavLink
                        to={item.link}
                        activeClassName="active"
                        onClick={() => props.click()}
                        exact
                    >
                        <div className="itemContent">
                            <div className="itemIcon">
                                <FontAwesomeIcon
                                    icon={item.faicons}
                                    className="icon"
                                />
                            </div>
                            <div className="itemInner">
                                <span className="title">{item.name}</span>
                            </div>
                        </div>
                    </NavLink>
                </li>
            ))
            : null
    )

    const className = `sideDrawer ${props.show ? 'open' : ''}`;
    //const className = drawerClasses.join(' ');
    // console.log(this.props)
    return (
        <nav className={className}>
            <div className="sideDrawerLogo">
                <img className="logo_img" src={window.location.origin + "/admin/assets/images/lumisoft_side_white.png"} alt="" />
            </div>
            <ul>
                <li className="sidenavTitle">Main Area</li>
                {publicLink(publicnav)}
                <li className="sidenavTitle">Media Area</li>
                {templateLink(templatenav)}
                {
                    userprops ?
                        userprops.masteradmin > 0 ?
                            <li className="sidenavTitle">Masteradmin Area</li>
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
        </nav >
    );
};

export default SideDrawer;