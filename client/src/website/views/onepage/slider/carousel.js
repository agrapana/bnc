import React from 'react';
import Slider from 'react-slick';
import { useWindowSize } from '../../../widget/windowsize';

const CarouselPage = (props) => {
    const size = useWindowSize();

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500
    }

    const formica1 = props.isMobile ? "/admin/assets/images/lumisoft1mobile.jpg" : "/admin/assets/images/lumisoft1.jpg";
    // const formica2 = props.isMobile ? "/admin/assets/images/lumisoft2mobile.jpg" : "/admin/assets/images/lumisoft2.jpg";
    // const formica3 = props.isMobile ? "/admin/assets/images/lumisoft3mobile.jpg" : "/admin/assets/images/lumisoft3.jpg";
    return (
        <div
            className="slidercontainer"
            style={
                {
                    height: props.isMobile ? '306.5px' : props.isTablet ? '432px' : `${size.height}px`,
                    overflow: "hidden"
                }
            }
        >
            <Slider {...settings}>
                <div className="carouselimage">
                    <img src={window.location.origin + formica1} alt="" />
                </div>
                {/* <div className="carouselimage">
                    <img src={window.location.origin + formica2} alt="" />
                </div>
                <div className="carouselimage">
                    <img src={window.location.origin + formica3} alt="" />
                </div> */}
            </Slider>
        </div>
    );
};

export default CarouselPage;