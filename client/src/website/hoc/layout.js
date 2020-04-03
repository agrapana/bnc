import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useWindowSize } from '../widget/windowsize';

import Header from '../views/header';
import SideDrawer from '../views/sidedrawer';
import BackDrop from '../views/backdrop';
import Footer from '../views/footer';
// import Slider from '../views/onepage/slider';
// import Aboutus from '../views/onepage/aboutus';
// import Services from '../views/onepage/services';
// import ParallaxPage from '../views/onepage/parallax';
// import Portfolio from '../views/onepage/portfolio';
// // import Clients from '../views/onepage/clients';
// // import Contact from '../views/onepage/contact';
// // import Location from '../views/onepage/location';
// import Footer from '../views/onepage/footer';
// import BackDrop from '../views/onepage/backdrop';
// import Copyright from '../views/onepage/copyright';

const WebsiteFrontLayout = (props) => {
    const { loadingprops } = useSelector(state => ({
        loadingprops: state.loading.isLoading
    }));
    const size = useWindowSize();
    const [sideDrawerOpen, sideDrawerOpenHandler] = useState(false);

    const drawerToggleClickHandler = () => {
        sideDrawerOpenHandler(!sideDrawerOpen);
    };

    const backdropClickHandler = () => {
        document.body.style.overflow = 'overlay';
        sideDrawerOpenHandler(false);
    }
    const isMobile = size.width <= 767.98;
    const isTablet = size.width >= 767.99 && size.width <= 1025.98;

    return (
        <div style={{ height: '100%' }} id="frontendwebsite">
            {
                loadingprops ? null :
                    <Header
                        drawerClickHandler={drawerToggleClickHandler}
                        isMobile={isMobile}
                        isTablet={isTablet}
                    />
            }
            {
                loadingprops ? null :
                    <SideDrawer
                        show={sideDrawerOpen}
                        click={backdropClickHandler}
                        isMobile={isMobile}
                        isTablet={isTablet}
                    />
            }

            {
                sideDrawerOpen && !loadingprops &&
                <BackDrop click={backdropClickHandler} />
            }
            {props.children}
            {
                loadingprops ? null :
                    <Footer
                        isMobile={isMobile}
                        isTablet={isTablet}
                    />
            }

        </div>
    );
};

export default WebsiteFrontLayout;