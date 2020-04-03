import React from 'react';
import Carousel from './carousel';
import Fade from 'react-reveal/Fade';

const SliderSection = (props) => {
    return (
        <div id="frontendslider" style={{ position: 'relative' }}>
            <Carousel isMobile={props.isMobile} isTablet={props.isTablet} />
            <div className={props.isMobile ? "hometitlemobile" : "hometitle"}>
                <Fade bottom delay={500}>
                    <h1 className={props.isMobile ? "big_whitemobile" : "big_white"}><span className="element">Improve </span>
                        your business
                    </h1>
                    <div className="hero-copy">Scroll down for more information</div>
                    {/* <span className="btn-holder">
                        <a href="#products" className="hero-btn lm-button">See Our Products</a>
                    </span> */}
                </Fade>
            </div>
        </div>
    );
};

export default SliderSection;