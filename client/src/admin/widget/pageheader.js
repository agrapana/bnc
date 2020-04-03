import React from 'react';
import { NavLink } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faAngleRight, faCog, faPlus, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import { 
    // faEnvelope, 
    // faListAlt, 
    faAddressCard 
} from '@fortawesome/free-regular-svg-icons';

library.add(faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faAddressCard, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faHandshake)


const PageHeader = (props) => {
    return (
        <div className="alignitemscenter row">
            <div className="col-md-6 col-sm-5 col-xs-12">
                <h4 className="pageTitle">{props.pagename}</h4>
                <ol className="breadcrumb">
                    {
                        props.breadcrumb.map((item, i) => (
                            <li className="breadcrumbitem" key={i}>
                                {
                                    item.name !== 'Dashboard' && item.linkTo === "" ?
                                        <div>
                                            <div className="itemContent">
                                                <div className="itemInner">
                                                    <span className="currentpagetitle">{item.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        item.name !== "Dashboard" && item.linkTo !== "" ?
                                            <div className="breadcrumbcontainer">
                                                <NavLink
                                                    to={item.linkTo}
                                                    onClick={() => props.clickHandler(item.linkTo)}
                                                >
                                                    <div className="itemContent">
                                                        <div className="itemInner">
                                                            <span className="title">{item.name}</span>
                                                        </div>
                                                    </div>
                                                </NavLink>
                                                <FontAwesomeIcon
                                                    icon={faAngleRight}
                                                    className="icon breadcrumbicon"
                                                />
                                            </div>

                                            :
                                            <div className="breadcrumbcontainer">
                                                <NavLink
                                                    to={item.linkTo}
                                                    onClick={() => props.clickHandler(item.linkTo)}
                                                >
                                                    <div className="itemContent">
                                                        <div className="itemIcon">
                                                            <FontAwesomeIcon
                                                                icon={item.faicons}
                                                                className="icon breadcrumbhome"
                                                            />
                                                        </div>
                                                    </div>
                                                </NavLink>
                                                <FontAwesomeIcon
                                                    icon={faAngleRight}
                                                    className="icon breadcrumbicon"
                                                />
                                            </div>


                                }
                            </li>
                        ))
                    }
                </ol>
            </div>
            <div className="col-md-6 col-sm-7 col-xs-12">
                <div className="pagetitlebutton">
                    {
                        props.refresh ?
                            <div
                                className="pagetitlethebutton waveseffect mr20"
                                onClick={() => props.onRefreshHandler()}
                            >
                                <FontAwesomeIcon
                                    icon={faRedoAlt}
                                    className="icon breadcrumbicon"
                                />
                                <span className="pagetitlebuttontext">Refresh</span>
                            </div>
                            : null
                    }
                    {
                        props.addnew ?
                            <div
                                className="pagetitlethebutton waveseffect mr20"
                                onClick={() => props.addNewHandler()}
                            >
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className="icon breadcrumbicon"
                                />
                                <span className="pagetitlebuttontext">Add New</span>
                            </div>
                            : null
                    }
                    {
                        props.uploadfile || props.downloadfile ?
                            <div className="pagetitledropdown">
                                <div
                                    className="pagetitlethebutton waveseffect"
                                    onClick={() => props.showMenuHandler()}
                                    onBlur={props.dontblur ? null : props.hideMenuHandler}
                                    tabIndex={0}
                                >
                                    <FontAwesomeIcon
                                        icon={faCog}
                                        className="icon breadcrumbicon"
                                    />
                                    <span className="pagetitlebuttontext">Settings</span>
                                </div>
                                <div
                                    className={props.showsettingmenu ? "dropdownsettingmenu show" : "dropdownsettingmenu"}
                                    onMouseEnter={props.onMouseEnter}
                                    onMouseLeave={props.onMouseLeave}
                                >
                                    {
                                        props.uploadfile ?
                                            <div className="dropdownitem">Upload file</div>
                                            : null
                                    }
                                    {
                                        props.downloadfile ?
                                            <div className="dropdownitem">Download Excel</div>
                                            : null
                                    }

                                </div>
                            </div>
                            : null
                    }
                </div>
            </div>
        </div>
    );
};

export default PageHeader;