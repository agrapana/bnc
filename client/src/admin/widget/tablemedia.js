import React from 'react';

import BackDrop from '../lumisoft/views/layout/backdrop/tablebackdrop';
import Pagination from './pagination';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faSearch, faEdit, faTimesCircle, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import {
    // faEnvelope, 
    // faListAlt, 
    faAddressCard
} from '@fortawesome/free-regular-svg-icons';

library.add(faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faSearch, faEdit, faTimesCircle, faLockOpen, faAddressCard, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faHandshake)


const TableMedia = (props) => {
    return (
        <div className="col-md-12 p0">
            {
                props.loadingtable ?
                    <div className="lds-ripple"><div></div><div></div></div>
                    :
                    <div className="card withpagination">
                        <div className="cardTitle">
                            <div className="searchContainer">
                                <div className="iconPosition">
                                    <FontAwesomeIcon
                                        icon={faSearch}
                                        className="icon agraicon"
                                    />
                                </div>
                                <input
                                    autoCapitalize="none"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    className="tableSearch"
                                    type="text"
                                    name="Search"
                                    placeholder="Search"
                                    title="Type in a name"
                                    value={props.filterText}
                                    onChange={(event) => props.handleChange(event)}
                                    autoFocus={true}
                                />
                            </div>
                            <div className="pageNumber">{props.currentPage}/{parseInt((props.dataCount / props.pageSize) + ((props.dataCount % props.pageSize) > 0 ? 1 : 0))} Pages</div>
                        </div>
                        <div className="cardBody">
                            <div className="tableResponsiveSm">
                                <table className="table" id={props.tablename}>
                                    <thead>
                                        <tr>
                                            {
                                                props.tablemenu.map((item, index) => (
                                                    <th key={index}>{item.head}</th>
                                                ))
                                            }
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            props.mydata
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <nav className="mt30">
                                <Pagination Size={props.dataCount} pageLimit={props.pageSize} onPageChanged={props.pageChanged} currentPage={props.currentPage} width={props.isMobile} />
                            </nav>
                        </div>
                    </div>
            }
            <div className={props.showedit ? "rightSideOption open" : "rightSideOption"}>
                {
                    props.showedit ?
                        <div className="actionTitle">
                            <div className="actionTitleText">Action options</div>
                        </div>
                        : null

                }
                {
                    props.showedit ?
                        <div className="rightSideButtonWrapper">
                            <div
                                className="rightSideButton mr20"
                                onClick={() => props.editDataHandler()}
                            >
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    className="icon breadcrumbicon"
                                />
                                <span className="rightSideButtonText">Edit</span>
                            </div>
                            {/* <div
                                className="rightSideButton"
                                onClick={() => props.changePasswordHandler()}
                            >
                                <FontAwesomeIcon
                                    icon={faLockOpen}
                                    className="icon breadcrumbicon"
                                />
                                <span className="rightSideButtonText">Password</span>
                            </div> */}
                        </div>
                        : null
                }
                {/* {
                    props.showedit && props.userprops.userData.masteradmin > 0 ?
                        <div className="rightSideButtonWrapper">
                            <div
                                className="rightSideButton mr20"
                                onClick={() => props.editDataHandler()}
                            >
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    className="icon breadcrumbicon"
                                />
                                <span className="rightSideButtonText">Edit</span>
                            </div>
                        </div>
                        : null
                } */}
            </div>
            {
                props.showedit &&
                <BackDrop click={props.backdropClickHandler} />
            }
        </div>
    );
};

export default TableMedia;