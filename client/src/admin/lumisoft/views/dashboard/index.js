import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AdminLayout from '../layout/adminpage';
import PageHeader from '../../../widget/pageheader';
import DashboardPanel from './panel';

import { useWindowSize } from '../../../widget/windowsize';

import { getAdminUser } from '../../../store/actions/user_action';
import { getApplication } from '../../../store/actions/application_action';
import { getPortfolio } from '../../../store/actions/portfolio_action';
import { getGallery } from '../../../store/actions/gallery_action';
import { getProduct } from '../../../store/actions/product_action';

import { faHome, faUsers, faImages, faBoxes, faMobile } from '@fortawesome/free-solid-svg-icons';

const DashboardScreen = (props) => {
    const { userprops, getgallery, getportfolio, getproduct, getapplication } = useSelector(state => ({
        userprops: state.user,
        getapplication: state.application,
        getgallery: state.gallery,
        getportfolio: state.portfolio,
        getproduct: state.product
    }));
    const size = useWindowSize();
    const isMobile = size.width <= 767.98;
    const dispatch = useDispatch();
    const [loadingtable, loadingtableHandler] = useState(false);
    const [pagename] = useState('My Dashboard');
    const [addnew] = useState(false);
    const [refresh] = useState(true);
    const [uploadfile] = useState(false);
    const [downloadfile] = useState(false);
    const [showsettingmenu, showsettingmenuHandler] = useState(false);
    const [breadcrumb] = useState([
        {
            name: 'Dashboard',
            linkTo: '/admin/dashboard',
            public: true,
            faicons: faHome
        },
        {
            name: pagename,
            linkTo: '',
            public: true
        }
    ]);
    const [dontblur, dontblurHandler] = useState(false);

    const [showuser] = useState({
        show: true,
        name: 'Users',
        link: '/admin/master/user',
        icon: faUsers
    });
    const [showapplication] = useState({
        show: true,
        name: 'Applications',
        link: '/admin/master/application',
        icon: faMobile
    });
    const [showgallery] = useState({
        show: true,
        name: 'Gallery',
        link: '/admin/gallery',
        icon: faImages
    });
    const [showportfolio] = useState({
        show: true,
        name: 'Portfolio',
        link: '/admin/portfolio',
        icon: faImages
    });
    const [showproduct] = useState({
        show: true,
        name: 'Product',
        link: '/admin/product',
        icon: faBoxes
    });

    const [alluser, alluserHandler] = useState([]);
    const [allapplication, allapplicationHandler] = useState([]);
    const [allgallery, allgalleryHandler] = useState([]);
    const [allportfolio, allportfolioHandler] = useState([]);
    const [allproduct, allproductHandler] = useState([]);

    useEffect(() => {
        loadingtableHandler(true);
        dispatch(getAdminUser());
        dispatch(getApplication());
        dispatch(getPortfolio());
        dispatch(getGallery());
        dispatch(getProduct(100, 'desc', "createdAt"));
    }, [dispatch])
    useEffect(() => {
        if (userprops && userprops.getUser && userprops.getUser.success) {
            let totaluser = userprops.getUser.users.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            alluserHandler(totaluser);
        }
        if (getapplication && getapplication.getApplication && getapplication.getApplication.success) {
            let totalapplication = getapplication.getApplication.applications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            allgalleryHandler(totalapplication);
        }
        if (getgallery && getgallery.getGallery && getgallery.getGallery.success) {
            let totalgallery = getgallery.getGallery.galleries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            allgalleryHandler(totalgallery);
        }
        if (getportfolio && getportfolio.getPortfolio && getportfolio.getPortfolio.success) {
            let totalportfolio = getportfolio.getPortfolio.portfolios.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            allportfolioHandler(totalportfolio);
        }
        if (getproduct && getproduct.getProduct && getproduct.getProduct.success) {
            let totalproduct = getproduct.getProduct.product.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            allproductHandler(totalproduct);
        }
        loadingtableHandler(false);
    }, [userprops, getgallery, getportfolio, getproduct])

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
        props.history.push('/admin/portfolio/addnew');
    }

    const onRefreshHandler = async () => {
        try {
            loadingtableHandler(true);
            let alluser = await dispatch(getAdminUser());
            let totaluser = await alluser.payload.users.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            let allapplication = await dispatch(getApplication());
            let totalapplication = await allapplication.payload.applications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            let allgallery = await dispatch(getPortfolio());
            let totalgallery = await allgallery.payload.galleries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            let allportfolio = await dispatch(getPortfolio());
            let totalportfolio = await allportfolio.payload.portfolios.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            let allproduct = await dispatch(getProduct());
            let totalproduct = await allproduct.payload.product.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            alluserHandler(totaluser);
            allapplicationHandler(totalapplication);
            allgalleryHandler(totalgallery);
            allportfolioHandler(totalportfolio);
            allproductHandler(totalproduct);
            loadingtableHandler(false);
        } catch (error) {

        }
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
                            <DashboardPanel
                                userprops={userprops}
                                isMobile={isMobile}
                                loadingtable={loadingtable}
                                showuser={showuser}
                                showgallery={showgallery}
                                showportfolio={showportfolio}
                                showproduct={showproduct}
                                showapplication={showapplication}
                                alluser={alluser}
                                allgallery={allgallery}
                                allportfolio={allportfolio}
                                allproduct={allproduct}
                                allapplication={allapplication}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default DashboardScreen;