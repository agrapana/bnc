import React, {
    // useState,
    // useEffect
} from 'react';
import {
    useSelector,
    // useDispatch
} from 'react-redux';
import moment from 'moment';
// import MyButton from '../../../admin/lumisoft/utils/button';
// import Lightbox from 'react-image-lightbox';
// import 'react-image-lightbox/style.css';
// import { useWindowSize } from '../../widget/windowsize';
// import { steamAuth } from '../../../admin/store/actions/client_action';
// import { getPortfolio } from '../../../admin/store/actions/portfolio_action';
// import { loading } from '../../../admin/store/actions/loading_action';
// import { FaWhatsapp } from "react-icons/fa";

const ProfilePage = (props) => {
    const { clientprops } = useSelector(state => ({
        clientprops: state.client
    }));
    // const size = useWindowSize();
    // const dispatch = useDispatch();
    // const isMobile = size.width <= 767.98;
    const URL = 'https://bnc.web.id/api/steam/auth';
    // const defaultURL = 'https://google.com';

    // const isTablet = size.width >= 767.99 && size.width <= 1025.98;

    // useEffect(() => {
    //     let mounted = true;
    //     const abortController = new AbortController();

    //     const getAllData = async () => {
    //         try {
    //             dispatch(loading(true));
    //             let alldatas = await dispatch(getPortfolio(), { signal: abortController.signal });
    //             if (mounted) {
    //                 allportfolioHandler(alldatas.payload.portfolios);
    //                 dispatch(loading(false));
    //             }

    //         } catch (error) {

    //         }
    //     }
    //     getAllData();
    //     return () => {
    //         mounted = false;
    //         abortController.abort();
    //     }
    // }, [dispatch])

    // console.log(clientprops, "<<<<<<<<!<!<!<!<")

    return (
        <section id="profilecontent">
            <div className="pagetitlewrap">
                <div className="container">
                    <h1>{clientprops && clientprops.clientData ? clientprops.clientData.name : null}</h1>
                    <span>{clientprops && clientprops.clientData ? "+62" + clientprops.clientData.phone : null}</span>
                    <p>{clientprops && clientprops.clientData ? moment(clientprops.clientData.createdAt).format('DD MMM YYYY') : null}</p>
                </div>
            </div>
            <div className="contentwrap">
                <div className="container">
                    {
                        clientprops && clientprops.clientData && clientprops.clientData.isConnected ?
                            <div className="row">

                                <div className="col-md-12 col-xs-12">
                                    <img className="imgthumbnail" src={clientprops.clientData.steamavatar} alt="" />
                                    <div className="headingblock">
                                        <h3>{clientprops.clientData.steamname}</h3>
                                        <span>you are connected</span>
                                    </div>
                                </div>
                                {/* <div className="col-md-3">

                                </div> */}
                            </div>
                            :
                            <div className="row">
                                <div className="col-md-12 col-xs-12">
                                    <div className="formActions">
                                        <a href={URL} rel="noopener noreferrer" target="_blank">
                                            <div className="submitButton submitButtonShadow buttonColor">
                                                CONNECT TO STEAM
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </section>
    );
};

export default ProfilePage;