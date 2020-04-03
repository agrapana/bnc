import React, { useState } from 'react';
import {
    useSelector
    // useDispatch
} from 'react-redux';
import {
    Link,
    withRouter
} from 'react-router-dom';

import DrawerToggle from '../sidedrawer/drawertoggle';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faHome,
    faSignInAlt,
    faListUl,
    faCartArrowDown,
    faUser,
    faHeart,
    faCogs,
    faSearch,
    faChevronDown,
    faEnvelope,
    faChevronUp,
    faCog,
    faCalendar,
    faQuestion,
    faSignOutAlt,
    faShoppingBag,
    faDesktop,
    faBoxes,
    faShippingFast,
    faUsers,
    faCheckDouble
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(
    faHome,
    faSignInAlt,
    faListUl,
    faCartArrowDown,
    faUser,
    faHeart,
    faCogs,
    faSearch,
    faChevronDown,
    faEnvelope,
    faChevronUp,
    faCog,
    faCalendar,
    faQuestion,
    faSignOutAlt,
    faShoppingBag,
    faDesktop,
    faBoxes,
    faShippingFast,
    faUsers,
    faCheckDouble
)

const AdminHeader = (props) => {
    const { userprops } = useSelector(state => ({
        userprops: state.user.userData
    }));
    // const dispatch = useDispatch();
    const [profilemenu, profilemenuHandling] = useState(false);
    const [dontblur, dontblurHandling] = useState(false);
    const [account] = useState([
        {
            name: 'Profile',
            linkTo: '/admin/profile',
            faicons: faUser
        },
        {
            name: 'Settings',
            linkTo: '/admin/settings',
            faicons: faCog
        },
        {
            name: 'My Calendar',
            linkTo: '/admin/calendar',
            faicons: faCalendar
        }
    ]);
    const [accountbottom] = useState([
        {
            name: 'Help',
            linkTo: '/admin/help',
            faicons: faQuestion
        },
        {
            name: 'Logout',
            linkTo: '/auth/logout',
            faicons: faSignOutAlt
        }
    ]);

    const profilemenutoggle = () => {
        // console.log("profilemenutoggle")
        profilemenuHandling(!profilemenu)
    }

    // const showprofilemenu = () => {
    //     console.log("showprofilemenu")
    //     profilemenuHandling(true)
    // }

    const hideprofilemenu = () => {
        // console.log("hideprofilemenu")
        profilemenuHandling(false)
    }

    const onMouseEnter = () => {
        // console.log("onMouseEnter")
        dontblurHandling(true)
    }

    const onMouseLeave = () => {
        // console.log("onMouseLeave")
        dontblurHandling(false)
    }

    const logoutLink = (link) => {
        props.history.push(link)
    }

    const showLinks = (type) => {
        let list = [];

        if (userprops) {
            type.forEach((item) => {
                list.push(item)
            });
        }

        return list.map((item, i) => (
            <li
                key={i}
                // onMouseDown={e => e.preventDefault()}
                // onMouseUp={() => this.logoutLink(item.linkTo)}
                onClick={() => logoutLink(item.linkTo)}
                className="listgroupitem"
            >
                <span className="memberHeaderLink">
                    {item.name}
                    <FontAwesomeIcon
                        icon={item.faicons}
                        className="icon"
                    />
                </span>

            </li>
        ))
    }

    return (
        <div id="#main">
            <header className="navbar navbarfixedtop">

                <div className="navbarlogowrapper">
                    <Link
                        to="/admin/dashboard"
                        className="navbarlogoimage"
                    >
                        <img className="logo_img mobileHidden" src={window.location.origin + "/admin/assets/images/lumisoft_side_white.png"} alt="" />
                    </Link>
                </div>
                <div className="memberToggleButton">
                    <DrawerToggle click={props.drawerClickHandler} />
                </div>
                <ul className="nav navbarnav navbarright">
                    <li className={profilemenu ? "dropdown dropdownfuse open" : "dropdown dropdownfuse"}>
                        <div
                            className="dropdowntoggle ml0 memberDiv"
                            onClick={() => profilemenutoggle()}
                            // onMouseDown={e => e.preventDefault()}
                            // onClick={(e) => {
                            //     e.preventDefault()
                            //     e.stopPropagation()
                            //     this.userprofilemenuStatus()
                            // }}
                            // onBlur={() => this.userprofilemenuOnBlur()}
                            onBlur={dontblur ? null : hideprofilemenu}
                            // onFocus={showprofilemenu}
                            // ref={dropdown => this.dropdown = dropdown}
                            tabIndex={0}
                        >
                            <span className="hiddenXs hiddenSm">
                                <span className="name">{userprops ? userprops.name : null}</span>
                            </span>
                            <span className="hiddenXs hiddenSm arrow">
                                {
                                    profilemenu ?
                                        <FontAwesomeIcon
                                            icon={faChevronUp}
                                            className="icon"
                                        />
                                        :
                                        <FontAwesomeIcon
                                            icon={faChevronDown}
                                            className="icon"
                                        />
                                }
                            </span>
                            <span className="profile-online">
                                <img src={window.location.origin + "/admin/assets/images/demonix18.jpg"} alt="avatar" />
                            </span>

                        </div>
                        {
                            profilemenu &&
                            <ul
                                className="dropdownmenu listgroup profilemenu"
                                onMouseEnter={onMouseEnter}
                                onMouseLeave={onMouseLeave}
                            >
                                {showLinks(account)}
                                <li className="divider"></li>
                                {showLinks(accountbottom)}
                            </ul>
                        }
                    </li>
                </ul>
            </header>
        </div>
    );
}

export default withRouter(AdminHeader);