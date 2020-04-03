import React from 'react';
import Slider from 'react-slick';

const ClientsCarousel = (props) => {

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500
    }

    const luminousbridal = "/admin/assets/images/lumisoft1mobile.jpg";

    return (
        <div
            className="clientslidercontainer"
            style={{
                overflow: "hidden"
            }}
        >
            <Slider {...settings}>
                <div className="clientscarouselimage">
                    <img src={window.location.origin + luminousbridal} alt="" />
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

export default ClientsCarousel;