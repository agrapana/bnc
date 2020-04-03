import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

import { scroller } from 'react-scroll';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faImages } from '@fortawesome/free-regular-svg-icons';
import { 
    // faEnvelope, 
    // faListAlt, 
    faAddressCard 
} from '@fortawesome/free-regular-svg-icons';

library.add(faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faAddressCard, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faHandshake)

const SideDrawerSection = (props) => {
    const [publicnav] = useState([
        {
            name: 'Home',
            linkTo: 'home',
            public: true,
            faicons: faHome
        },
        {
            name: 'About',
            linkTo: 'about',
            public: true,
            faicons: faListUl
        },
        {
            name: 'Portfolio',
            linkTo: 'portfolio',
            public: true,
            faicons: faImages
        },
        {
            name: 'Contact',
            linkTo: 'contact',
            public: true,
            faicons: faUser
        }
    ])

    const scrollToElement = (element) => {
        scroller.scrollTo(element, {
            duration: 1000,
            delay: 100,
            smooth: true
        });
        props.click();
    }

    const publicLink = (items) => (
        items.map((item, i) => (
            <li key={i}>
                <button
                    onClick={() => scrollToElement(item.linkTo)}
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
                </button>
            </li>
        ))
    )

    const className = `sideDrawer ${props.show ? 'open' : ''}`;
    return (
        <nav id="frontendsidedrawer" className={className}>
            <div className="sideDrawerLogo">
                <img className="logo_img" src={window.location.origin + "/admin/assets/images/lumisoft_side_white.png"} alt="" width="160" />
            </div>

            <ul>
                {publicLink(publicnav)}
            </ul>
        </nav >
    );
};


export default SideDrawerSection;