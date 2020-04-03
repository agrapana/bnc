import React, {
    useState
    // useEffect, 
    // useReducer 
} from 'react';

import { useWindowSize } from '../../../widget/windowsize';

import AdminLayout from '../../views/layout/adminpage';
import PageHeader from '../../../widget/pageheader';
import Table from './table';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import {
    // faEnvelope, 
    // faListAlt, 
    faAddressCard
} from '@fortawesome/free-regular-svg-icons';

library.add(faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faAddressCard, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faHandshake)


const ProductAddNewScreen = (props) => {
    const size = useWindowSize();
    const isMobile = size.width <= 767.98;
    const [pagename] = useState('Add New');
    const [pageTitle] = useState('Please fill all information below');
    const [loadingtable, loadingtableHandler] = useState(false);
    const [addMainCategory] = useState(false);
    const [addCategory] = useState(true);
    const [addnew] = useState(false);
    const [refresh] = useState(false);
    const [uploadfile] = useState(false);
    const [downloadfile] = useState(false);
    const [breadcrumb] = useState([
        {
            name: 'Dashboard',
            linkTo: '/admin/dashboard',
            public: true,
            faicons: faHome
        },
        {
            name: 'Product',
            linkTo: '/admin/product',
            public: true
        },
        {
            name: pagename,
            linkTo: '',
            public: true
        }
    ]);

    const [dataselected] = useState({})
    const [editformdatastatus] = useState(false);

    const clickHandler = (link) => {
        props.history.push(link);
    }

    return (
        <AdminLayout>
            <div className="masterDashboard">
                <div className="masterDashboardContainer">
                    <div className="containerfluid">
                        <div className="pagetitlebox">
                            <PageHeader
                                {...props}
                                addnew={addnew}
                                refresh={refresh}
                                uploadfile={uploadfile}
                                downloadfile={downloadfile}
                                pagename={pagename}
                                breadcrumb={breadcrumb}
                                clickHandler={clickHandler}
                            />
                        </div>
                        <div className="row">
                            <div className="col-md-12 p0">
                                {
                                    loadingtable ?
                                        <div className="tableloading">
                                            <div className="lds-ripple"><div></div><div></div></div>
                                        </div>
                                        :
                                        <Table
                                            {...props}
                                            dataselected={dataselected}
                                            editformdatastatus={editformdatastatus}
                                            loadingtableHandler={loadingtableHandler}
                                            pageTitle={pageTitle}
                                            isMobile={isMobile}
                                            addMainCategory={addMainCategory}
                                            addCategory={addCategory}
                                        />
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default ProductAddNewScreen;