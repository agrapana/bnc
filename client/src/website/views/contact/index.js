import React from 'react';
import { useWindowSize } from '../../widget/windowsize';
import GoogleMap from '../../widget/map';
import { FaFacebookF, FaInstagram, FaRegEnvelope, FaWhatsapp, FaPhone } from "react-icons/fa";


const ContactPage = () => {
    const size = useWindowSize();
    // console.log(size.height,"<")
    const isMobile = size.width <= 767.98;
    const isTablet = size.width >= 767.99 && size.width <= 1025.98;


    return (
        <section id="homepage" style={{ marginBottom: 0, transform: "none" }}>
            <div className="contentwrap" style={{ transform: 'none' }}>
                <div className="section" style={{ marginBottom: isMobile ? '0px' : '60px', marginTop: isMobile ? '30px' : '60px' }}>
                    <div className="container">
                        <div
                            className="headingblock center"
                            style={{
                                maxWidth: `${size.height - ((size.height * 20) / 100)}px`,
                                marginBottom: '60px'
                            }}
                        >
                            <small>Get in touch with us</small>
                            <h2
                                style={{
                                    marginBottom: '10px'
                                }}
                            >
                                CONTACT PAGE
                            </h2>

                        </div>
                        <div className="row">
                            <div
                                className="col-md-8 col-xs-12"
                                style={{
                                    display: "flex",
                                    justifyContent: "center", marginBottom: isMobile ? "30px" : "0px"
                                }}
                            >
                                {/* <section class="gmap" style={{ height: "410px", position: 'relative', overflow: 'hidden', width: '100%' }}></section> */}
                                <GoogleMap
                                    id="myMap"
                                    options={{
                                        center: { lat: 41.0082, lng: 28.9784 },
                                        zoom: 8
                                    }}
                                    onMapLoad={map => {
                                        var marker = new window.google.maps.Marker({
                                            position: { lat: 41.0082, lng: 28.9784 },
                                            map: map,
                                            title: 'Hello Istanbul!'
                                        });
                                    }}
                                    isMobile={isMobile}
                                    size={size}
                                />
                            </div>
                            <div
                                className="col-md-4 col-xs-12"
                                // style={{
                                //     background: `rgba(234, 234, 234, 1) url(/admin/assets/images/maxilum_artboard7.png)`,
                                //     right: "0",
                                //     backgroundSize: 'cover',
                                //     height: size.height - 76,
                                //     backgroundRepeat: 'no-repeat',
                                // }}
                            >
                                <address>
                                    <strong>Address: </strong>
                                    <br />
                                    Ruko Sentra Niaga 5 / 10 no.28
                                <br />
                                    Kota Harapan Indah Bekasi
                                <br />
                                    Jakarta Timur, 17131 Indonesia
                            </address>
                                <br />
                                <abbr title="Phone Number">
                                    <strong>Phone:&nbsp;</strong>
                                </abbr>
                                &nbsp;+6281294127411<br />
                                <abbr title="Email Address">
                                    <strong>Email:&nbsp;</strong>
                                </abbr>
                                &nbsp;admin@maxilum.id<br />
                                {/* <div className="socialiconwrapper">
                                <a className="socialicon facebook" rel="noopener noreferrer" href="https://www.facebook.com/Luminous-Bridal-356056021242785/" target="_blank">
                                    <FaFacebookF />
                                </a>
                                <a className="socialicon instagram" rel="noopener noreferrer" href="https://www.instagram.com/lumisoft.id/" target="_blank">
                                    <FaInstagram />
                                </a>
                                {
                                    isMobile ?
                                        <a className="socialicon whatsapp" rel="noopener noreferrer" href="whatsapp://send?text=hello&phone=+6281294127411" target="_blank">
                                            <FaWhatsapp />
                                        </a>
                                        :
                                        <a className="socialicon whatsapp" rel="noopener noreferrer" href="https://web.whatsapp.com/send?phone=+6281294127411" target="_blank">
                                            <FaWhatsapp />
                                        </a>
                                }

                                <a className="socialicon envelope" rel="noopener noreferrer" href="mailto:admin@maxilum.id" target="_blank">
                                    <FaRegEnvelope />
                                </a>
                                {
                                    isMobile ?
                                        <a className="socialicon phone" rel="noopener noreferrer" href="tel:+6281294127411" target="_blank">
                                            <FaPhone />
                                        </a>
                                        : null
                                }

                            </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;