import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import DrawerToggle from '../sidedrawer/drawertoggle';

const HeaderSection = (props) => {
    const { clientprops } = useSelector(state => ({
        clientprops: state.client
    }));
    const history = useHistory();
    const [headerShow, headerShowHandler] = useState(false);

    const [pagelist] = useState([
        {
            name: 'Home',
            linkTo: '/',
            public: false
        },
        {
            name: 'Profile',
            linkTo: '/profile',
            public: false
        },
        // {
        //     name: 'Notification',
        //     linkTo: '/notification',
        //     public: false
        // },
        // {
        //     name: 'Contact',
        //     linkTo: '/contact',
        //     public: false
        // }
    ]);
    const [account] = useState([
        {
            name: 'Login',
            linkTo: '/login',
            public: true
        },
        {
            name: 'Logout',
            linkTo: '/logout',
            public: false
        }
    ]);

    const userLink = (item, i) => (
        <li
            key={i}
        >
            <NavLink
                to={item.linkTo}
                activeClassName="active"
                exact
            >
                {item.name}
            </NavLink>
        </li>
    )

    const showLinks = (type) => {
        let list = [];

        if(clientprops && clientprops.clientData){
            type.forEach((item) => {
                if(!clientprops.clientData.isAuth){
                    if (item.public === true) {
                        list.push(item)
                    }
                } else {
                    if (item.public === false) {
                        list.push(item)
                    }
                }
            })
        }
        
        return list.map((item, i) => {
            return userLink(item, i)
        })
    }

    const handleScroll = useCallback(() => {
        let nowscrolling = window.scrollY;
        let isScrolling = nowscrolling > 10;
        if (isScrolling) {
            headerShowHandler(true)
        } else {
            headerShowHandler(false)
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll])

    return (
        <header className={headerShow ? "frontendwebsite topBar after" : "frontendwebsite topBar transparent"}>
            <div className="container">
                <div style={{
                    display: 'flex',
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <div className="topBarLeft">
                        {/* <div className="toggleButton white">
                            <DrawerToggle click={props.drawerClickHandler} />
                        </div> */}
                        <div className="logo">
                            <a href="/">
                                <img className="logo_img mobileHidden" src={headerShow ? window.location.origin + "/admin/assets/images/bnclogo_white2.png" : window.location.origin + "/admin/assets/images/bnclogo_white2.png"} alt="" width="160" />
                                <img className="logo_img pcHidden" src={headerShow ? window.location.origin + "/admin/assets/images/bnclogo_white2.png" : window.location.origin + "/admin/assets/images/bnclogo_white2.png"} alt="" width="160" />
                            </a>
                        </div>
                    </div>
                    <div className="topBarRight">
                        <div className="clear"></div>
                        <div className={headerShow ? "navigation_items" : "navigation_items white"}>
                            <ul>
                                <span className="mobileDisplayNone">{showLinks(pagelist)}</span>
                                <span className="mobileDisplayNone">{showLinks(account)}</span>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderSection;