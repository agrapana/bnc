import React from 'react';

import { NavLink } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faSearch, faEdit, faTimesCircle, faLockOpen, faImages } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import {
    // faEnvelope, 
    // faListAlt, 
    faAddressCard
} from '@fortawesome/free-regular-svg-icons';

library.add(faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faSearch, faEdit, faTimesCircle, faLockOpen, faAddressCard, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faHandshake, faImages)


const DashboardPanel = (props) => {

    const templateShow = (data, index) => {
        return (
            <div className="col-md-4 col-xs-12 dashboardlink">
                <NavLink
                    to={data.link}
                    activeClassName="active"
                    exact
                >
                    <div className="bgpattern card">
                        <div className="cardBody">
                            <div className="ministate">
                                <h6 className="ministatetitle">{data.name}</h6>
                                <FontAwesomeIcon
                                    icon={data.faicons}
                                    className="icon agraicon"
                                />
                            </div>
                            <h5 className="ministatesubtitle">{
                                data.name === "Portfolio" ?
                                    props.allportfolio && props.allportfolio.length > 0 ? props.allportfolio.length : "0"
                                    : data.name === "Gallery" ?
                                        props.allgallery && props.allgallery.length > 0 ? props.allgallery.length : "0"
                                        : data.name === "Slider" ?
                                            props.allslider && props.allslider.length > 0 ? props.allslider.length : "0"
                                            : data.name === "Product" ?
                                                props.allproduct && props.allproduct.length > 0 ? props.allproduct.length : "0"
                                                :
                                                data.name === "Servers" ?
                                                    props.allservers && props.allservers.length > 0 ? props.allservers.length : "0"
                                                    : null
                            }</h5>
                        </div>
                    </div>
                </NavLink>
            </div>
        )
    }

    return (
        <div id="dashboardpanelcss" className="col-md-12 p0">
            {
                props.loadingtable ?
                    <div className="lds-ripple"><div></div><div></div></div>
                    :
                    <div>
                        {
                            props.showtemplatepath ?
                                props.showtemplatepath.map((data, index) => (
                                    templateShow(data, index)
                                ))
                                : null
                        }
                    </div>
            }

        </div>
    );
};

export default DashboardPanel;