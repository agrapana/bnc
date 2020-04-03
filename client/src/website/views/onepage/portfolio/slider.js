import React from 'react';
import Slider from 'react-slick';

const SliderPortfolio = (props) => {

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500
    }

    return (
        <div
            className="slidercontainer"
            style={
                {
                    overflow: "hidden"
                }
            }
        >
            {
                props.selected.images && props.selected.images.length > 0 ?
                    <Slider {...settings}>
                        {
                            props.selected.images && props.selected.images.length > 0 && props.selected.images.map((item, index) => {
                                return (
                                    <div className="carouselimage" key={index}>
                                        <img src={item.url} alt="" />
                                    </div>
                                )
                            })
                        }
                    </Slider>
                    :
                    <img src={window.location.origin + "/admin/assets/images/notavailablef.jpg"} alt="" />
            }
        </div>
    );

};

export default SliderPortfolio;