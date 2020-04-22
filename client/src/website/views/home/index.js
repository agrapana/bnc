import React, {
    useState,
    useEffect
} from 'react';
import {
    // useSelector,
    useDispatch
} from 'react-redux';
import Carousel from './carousel';
// import { useHistory } from 'react-router';
import { useWindowSize } from '../../widget/windowsize';
import { getSlider } from '../../../admin/store/actions/slider_action';
import { loading } from '../../../admin/store/actions/loading_action';
import { FaAndroid, FaApple, FaDropbox } from "react-icons/fa";

const HomePage = () => {
    // const history = useHistory();
    const size = useWindowSize();
    const dispatch = useDispatch();
    const isMobile = size.width <= 767.98;
    // const isTablet = size.width >= 767.99 && size.width <= 1025.98;

    const [slider, sliderHandler] = useState([]);
    const [
        width,
        // widthHandler
    ] = useState(size.width);
    const [
        height,
        // heightHandler
    ] = useState(size.height);
    const [slides] = useState([
        {
            img: 'admin/assets/images/slider/slider1.png',
            lineOne: 'Title',
            lineTwo: 'Subtitle 1',
            linkTitle: 'Click Here',
            linkTo: '/gallery/dm5gPZU5WUT8avAxz1bm'
        },
        {
            img: 'admin/assets/images/slider/slider2.png',
            lineOne: 'Title',
            lineTwo: 'Subtitle 2',
            linkTitle: 'Click Here',
            linkTo: '/gallery/dDsOXqVoqwhfEGPTOR38'
        },
        {
            img: 'admin/assets/images/slider/slider3.png',
            lineOne: 'Title',
            lineTwo: 'Subtitle 3',
            linkTitle: 'Click Here',
            linkTo: '/gallery/bHp8FEn6cqwQO0Oc4yIo'
        },
        {
            img: 'admin/assets/images/slider/slider4.png',
            lineOne: 'Title',
            lineTwo: 'Subtitle 4',
            linkTitle: 'Click Here',
            linkTo: '/gallery/NAL1tYHDFRXhJ3d3dXWB'
        },
    ])

    // const gotoPage = (link) => {
    //     history.push(link);
    // }

    useEffect(() => {
        let mounted = true;
        const abortController = new AbortController();

        const getAllData = async () => {
            try {
                dispatch(loading(true));
                let alldatas = await dispatch(getSlider(), { signal: abortController.signal });
                if (mounted) {
                    sliderHandler(alldatas.payload.sliders);
                    dispatch(loading(false));
                }

            } catch (error) {

            }
        }
        getAllData();
        return () => {
            mounted = false;
            abortController.abort();
        }
    }, [dispatch])

    return (
        <section id="homepage" style={{ marginBottom: 0, transform: "none" }}>
            <div className="contentwrap" style={{ transform: "none" }}>
                <div className="section" style={{ padding: 0 }}>
                    <div className="slidercontainer">
                        <Carousel
                            isMobile={isMobile}
                            data={slides}
                            slider={slider}
                            height={height}
                            width={width}
                        />
                    </div>
                </div>
                <div className="section" style={{ marginBottom: '0px', marginTop: isMobile ? '0px' : '60px', paddingBottom: '0px', paddingTop: isMobile ? '0px' : '60px' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 col-xs-12">

                            </div>
                            <div
                                className="col-lg-8 col-sm-5 col-xs-12 offset-md-1"
                                style={{
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div className="row">
                                    <div 
                                    className="col-md-6 col-xs-12"
                                    style={{ marginBottom: isMobile ? '50px' : '0px' }}
                                    >
                                        <div style={{ marginTop: '50px', clear: 'both', fontSize: '0', height: '0', lineHeight: '0', width: '100%', overflow: 'hidden', display: 'block' }}></div>
                                        <h3
                                            style={{ color: '#eee', fontSize: '24px', lineHeight: '1.5', margin: '0 0 30px' }}
                                        >Grab it now!!</h3>
                                        <p>
                                            <a
                                                href="https://www.dropbox.com/s/swl6gvt4sbxnubw/bncv4-3-0b2.apk?dl=0"
                                                className="appbutton"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                <FaDropbox />
                                                <div
                                                    style={{ fontSize: '16px', marginLeft: '5px' }}
                                                >
                                                    DROPBOX
                                                </div>
                                            </a>
                                        </p>
                                    </div>
                                    <div className="col-md-6 col-xs-12">
                                        <img src={window.location.origin + "/admin/assets/images/iphone.png"} alt="Mobile" width="300" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomePage;