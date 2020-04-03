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


    const dataShow = (data, condition) => {
        return (
            <div className="col-md-4 col-xs-12 dashboardlink">
                <NavLink
                    to={condition.link}
                    activeClassName="active"
                    exact
                >
                    <div className="bgpattern card">
                        <div className="cardBody">
                            <div className="ministate">
                                <h6 className="ministatetitle">{condition.name}</h6>
                                <FontAwesomeIcon
                                    icon={condition.icon}
                                    className="icon agraicon"
                                />
                            </div>
                            <h5 className="ministatesubtitle">{
                                data.length > 0 ?
                                    data.length :
                                    "Now loading..."
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
                            props.showuser.show && props.userprops.userData && props.userprops.userData.masteradmin > 0 ? dataShow(props.alluser, props.showuser)
                                : null
                        }
                        {
                            props.showapplication.show && props.userprops.userData && props.userprops.userData.masteradmin > 0 ? dataShow(props.allapplication, props.showapplication)
                                : null
                        }
                        {
                            props.showportfolio.show ? dataShow(props.allportfolio, props.showportfolio)
                                : null
                        }
                        {
                            props.showgallery.show ? dataShow(props.allgallery, props.showgallery)
                                : null
                        }
                        {
                            props.showproduct.show ? dataShow(props.allproduct, props.showproduct)
                                : null
                        }
                    </div>
            }

        </div>
    );
};

export default DashboardPanel;