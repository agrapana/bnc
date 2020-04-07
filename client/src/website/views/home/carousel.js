import React from 'react';
import Slider from 'react-slick';

const CarouselPage = (props) => {

    const settings = {
        className: "center",
        autoplay: true,
        fade: false,
        dots: false,
        arrows: false,
        centerMode: true,
        draggable: true,
        centerPadding: '0',
        infinite: true,
        speed: 100,
        slidesToShow: 1,
        slidesToScroll: 1,
        // fullscreen: true,
        autoplaySpeed: 5000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1599,
                settings: {
                    // centerPadding: '10%',
                    arrows: false,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slideToShow: 1,
                    dots: false,
                    arrows: false,
                    centerMode: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slideToShow: 1,
                    dots: false,
                    arrows: false,
                    centerMode: false,
                }
            }
        ]
    }

    // const generateSlides = (data) => (
    //     data ?
    //         data.map((item, index) => (
    //             <div key={index}>
    //                 <div
    //                     className="featuredBg featuredBgImage"
    //                     style={{
    //                         background: `url(${item.img})`,
    //                         height: props.height
    //                     }}
    //                 >
    //                     <div className="container">
    //                         <div className="row">
    //                             <div className="col-md-12">
    //                                 <div className="contentInner">
    //                                     <div className="featuredAction">
    //                                         <h1 className="tag title" style={{
    //                                             marginBottom: 0
    //                                         }}>{item.lineOne}</h1>
    //                                         <div className="tag lowTitle">{item.lineTwo}</div>
    //                                     </div>
    //                                     {/* <div>
    //                                         <MyButton
    //                                             name="button"
    //                                             type="button"
    //                                             title={item.linkTitle}
    //                                             linkTo={item.linkTo}
    //                                             addStyles={{
    //                                                 margin: '10px 0 0 0'
    //                                             }}
    //                                         />
    //                                     </div> */}
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         ))
    //         : null
    // )

    const showImage = (images) => {
        if (images && images.length > 0) {
            return (
                images.map((item, index) => (
                    <div key={index}>
                        <div
                            className="featuredBg featuredBgImage"
                            style={{
                                background: `url(${item.images[0].url})`,
                                height: props.height
                            }}
                        >
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="contentInner">
                                            <div className="featuredAction">
                                                <h1 className="tag title" style={{
                                                    marginBottom: 0
                                                }}>{item.lineOne}</h1>
                                                <div className="tag lowTitle">{item.lineTwo}</div>
                                            </div>
                                            {/* <div>
                                            <MyButton
                                                name="button"
                                                type="button"
                                                title={item.linkTitle}
                                                linkTo={item.linkTo}
                                                addStyles={{
                                                    margin: '10px 0 0 0'
                                                }}
                                            />
                                        </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )
        } else {
            return (
                props.data.map((item, index) => (
                    <div key={index}>
                        <div
                            className="featuredBg featuredBgImage"
                            style={{
                                background: `url(/admin/assets/images/slider/slider${index + 1}.png)`,
                                height: props.height
                            }}
                        >
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="contentInner">
                                            <div className="featuredAction">
                                                <h1 className="tag title" style={{
                                                    marginBottom: 0
                                                }}>{item.lineOne}</h1>
                                                <div className="tag lowTitle">{item.lineTwo}</div>
                                            </div>
                                            {/* <div>
                                            <MyButton
                                                name="button"
                                                type="button"
                                                title={item.linkTitle}
                                                linkTo={item.linkTo}
                                                addStyles={{
                                                    margin: '10px 0 0 0'
                                                }}
                                            />
                                        </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )
        }
    }

    return (
        <div className="featuredslider" style={{ maxWidth: props.width }}>
            <Slider {...settings}>
                {
                    showImage(props.slider)
                }
            </Slider>
        </div>
    );
};

export default CarouselPage;