import React, {
    useState
} from 'react';
import AdminLayout from '../../views/layout/adminpage';
import PageHeader from '../../../widget/pageheader';
import Table from './table';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed } from '@fortawesome/free-solid-svg-icons';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import {
    faAddressCard
} from '@fortawesome/free-regular-svg-icons';

library.add(faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faAddressCard, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faHandshake)

const ServersAddNewScreen = (props) => {
    const [pagename] = useState('Add New');
    const [loadingtable, loadingtableHandler] = useState(false);
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
            name: 'Servers',
            linkTo: '/admin/servers',
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
                            <div className="col-md-12">
                                {
                                    loadingtable ?
                                        <div className="tableloading">
                                            <div className="lds-ripple"><div></div><div></div></div>
                                        </div>
                                        :

                                        <div className="card">
                                            <div className="cardTitle verticalCenter">
                                                <span>Please fill all information below</span>
                                            </div>
                                            <Table
                                                {...props}
                                                dataselected={dataselected}
                                                editformdatastatus={editformdatastatus}
                                                loadingtableHandler={loadingtableHandler}
                                            />
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
};

export default ServersAddNewScreen;