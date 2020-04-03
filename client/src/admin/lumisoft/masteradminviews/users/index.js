import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TableMedia from '../../../widget/tablemedia';
import AdminLayout from '../../views/layout/adminpage';
import PageHeader from '../../../widget/pageheader';
import AdminTable from './adminTable';

import { useWindowSize } from '../../../widget/windowsize';
import { getAdminUser } from '../../../store/actions/user_action';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed } from '@fortawesome/free-solid-svg-icons';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import {
    faAddressCard
} from '@fortawesome/free-regular-svg-icons';

library.add(faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faAddressCard, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faHandshake)


const AdminUserScreen = (props) => {
    const { userprops } = useSelector(state => ({
        userprops: state.user
    }));
    const size = useWindowSize();
    const isMobile = size.width <= 767.98;
    const dispatch = useDispatch();
    const [loadingtable, loadingtableHandler] = useState(false);
    const [pagename] = useState('Admin Lists');
    const [addnew] = useState(true);
    const [refresh] = useState(true);
    const [uploadfile] = useState(true);
    const [downloadfile] = useState(true);
    const [showedit, showeditHandler] = useState(false);
    const [selected, selectedHandler] = useState({});
    const [showsettingmenu, showsettingmenuHandler] = useState(false);
    const [breadcrumb] = useState([
        {
            name: 'Dashboard',
            linkTo: '/admin/dashboard',
            public: true,
            faicons: faHome
        },
        {
            name: 'Master User',
            linkTo: '/admin/master/user',
            public: true
        },
        {
            name: pagename,
            linkTo: '',
            public: true
        }
    ]);

    const [currentPage, currentPageHandler] = useState(1);
    const [pageSize] = useState(5);
    const [dontblur, dontblurHandler] = useState(false);

    const [tablename] = useState('AdminUser');
    const [tablemenu] = useState([
        {
            head: 'Name'
        },
        {
            head: 'Email'
        },
        {
            head: 'Phone'
        },
        {
            head: 'Created'
        },
        {
            head: 'Auth'
        },
        {
            head: 'Active'
        },
    ]);
    const [alldata, alldataHandler] = useState([]);
    const [filterText, filterTextHandler] = useState("");
    const [dataCount, dataCountHandler] = useState("");
    const [mydata, mydataHandler] = useState([]);
    useEffect(() => {
        loadingtableHandler(true);
        dispatch(getAdminUser());
    }, [dispatch])
    useEffect(() => {
        if (userprops && userprops.getUser && userprops.getUser.success) {
            let totaldata = userprops.getUser.users.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            alldataHandler(totaldata);
        }
    }, [userprops])
    useEffect(() => {
        if (alldata && alldata.length > 0) {
            var mydata = [];
            var resultsdata = [];
            var offset = (currentPage - 1) * pageSize;
            resultsdata = alldata.map((item, index) => <AdminTable key={index} item={item} index={index} />)
            mydata = resultsdata.slice(offset, offset + pageSize);
            mydataHandler(mydata);
            dataCountHandler(resultsdata.length);
            loadingtableHandler(false);
        }
    }, [alldata, currentPage, pageSize])

    useEffect(() => {
        var results = [];
        var resultsdata = [];
        var offset = (currentPage - 1) * pageSize;
        if (alldata) {
            results = alldata.filter(data =>
                (data.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
                    || data.email.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
                    || data.phone.toLowerCase().indexOf(filterText.toLowerCase()) !== -1))
            resultsdata = results.map((item, index) => <AdminTable item={item} index={index} key={index} editData={editData} />)
            var semuadata = [...resultsdata];
            var mydatas = semuadata.slice(offset, offset + pageSize);
            mydataHandler(mydatas);
        }

    }, [filterText, currentPage, alldata, pageSize])


    const handleChange = (event) => {
        filterTextHandler(event.target.value);
        currentPageHandler(1)
    }

    const clickHandler = (link) => {
        props.history.push(link);
    }

    const showMenuHandler = () => {
        showsettingmenuHandler(!showsettingmenu);
    }

    const hideMenuHandler = () => {
        showsettingmenuHandler(false);
    }

    const onMouseEnter = () => {
        // console.log("onMouseEnter")
        dontblurHandler(true)
    }

    const onMouseLeave = () => {
        // console.log("onMouseLeave")
        dontblurHandler(false)
    }

    const addNewHandler = () => {
        // console.log("add new handler")
        props.history.push('/admin/master/user/addnew');
    }

    const onRefreshHandler = async () => {
        try {
            loadingtableHandler(true);
            let alldatas = await dispatch(getAdminUser());
            let totaldata = await alldatas.payload.users.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            var mydata = [];
            var resultsdata = [];
            var offset = (currentPage - 1) * pageSize;
            alldataHandler(totaldata);
            resultsdata = totaldata.map((item, index) => <AdminTable key={index} item={item} index={index} />)
            mydata = resultsdata.slice(offset, offset + pageSize);
            mydataHandler(mydata);
            dataCountHandler(resultsdata.length);
            loadingtableHandler(false);
        } catch (error) {

        }
    }

    const pageChanged = (pageNumber, e) => {
        e.preventDefault();
        currentPageHandler(pageNumber)
    }

    const editData = (data) => {
        // console.log(data, "<<<<<<<<<<<<data data dtat")
        showeditHandler(true);
        selectedHandler(data);
    }

    const backdropClickHandler = () => {
        document.body.style.overflow = 'overlay';
        showeditHandler(false)
        selectedHandler({});
    }

    const editDataHandler = () => {
        props.history.push({
            pathname: '/admin/master/user/editdata',
            state: {
                dataselected: selected,
                editformdata: true
            }
        })
    }

    const deleteDataHandler = () => {
        console.log("deletedata")
    }

    return (
        <AdminLayout>
            <div className="masterDashboard">
                <div className="masterDashboardContainer">
                    <div className="containerfluid tableloading">
                        <div className="pagetitlebox">
                            <PageHeader
                                {...props}
                                addnew={addnew}
                                refresh={refresh}
                                uploadfile={uploadfile}
                                downloadfile={downloadfile}
                                pagename={pagename}
                                breadcrumb={breadcrumb}
                                dontblur={dontblur}
                                onMouseEnter={onMouseEnter}
                                onMouseLeave={onMouseLeave}
                                clickHandler={clickHandler}
                                addNewHandler={addNewHandler}
                                showsettingmenu={showsettingmenu}
                                hideMenuHandler={hideMenuHandler}
                                showMenuHandler={showMenuHandler}
                                onRefreshHandler={onRefreshHandler}
                            />
                        </div>
                        <div className="row">
                            <TableMedia
                                userprops={userprops}
                                isMobile={isMobile}
                                loadingtable={loadingtable}
                                filterText={filterText}
                                handleChange={handleChange}
                                currentPage={currentPage}
                                dataCount={dataCount}
                                pageSize={pageSize}
                                tablename={tablename}
                                tablemenu={tablemenu}
                                mydata={mydata}
                                pageChanged={pageChanged}
                                showedit={showedit}
                                editDataHandler={editDataHandler}
                                deleteDataHandler={deleteDataHandler}
                                backdropClickHandler={backdropClickHandler}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AdminUserScreen;