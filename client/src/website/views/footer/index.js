import React from 'react';
import { useWindowSize } from '../../widget/windowsize';
import { FaFacebookF, FaInstagram, FaRegEnvelope, FaWhatsapp, FaPhone } from "react-icons/fa";

const FooterSection = () => {

    const size = useWindowSize();
    const isMobile = size.width <= 767.98;

    var d = new Date();
    var n = d.getFullYear();

    return (
        <footer id="footer">
            <div className="container">
                <div className="footerwrap">
                    <div className="row">
                        <div
                            className="col-md-4 col-xs-12"
                            style={
                                isMobile ?
                                    {
                                        position: 'relative',
                                        minHeight: "1px",
                                        paddingRight: "15px",
                                        paddingLeft: "30px"
                                    }
                                    : null
                            }
                        >
                            {/* <address>
                                <strong>Address: </strong>
                                <br />
                                Jl. Melati Raya No.68, Batuceper, 
                                <br />
                                Tanah Tinggi, Tangerang, 
                                <br />
                                Tangerang, 11430 - Indonesia
                            </address>
                            <br />
                            <abbr title="Phone Number">
                                <strong>Phone:&nbsp;</strong>
                            </abbr>
                            &nbsp;021 - 55770863<br />
                            <abbr title="Fax Number">
                                <strong>Fax:&nbsp;</strong>
                            </abbr>
                            &nbsp;021 - 55770882<br />
                            <abbr title="Fax Number">
                                <strong>Handphone:&nbsp;</strong>
                            </abbr>
                            &nbsp;0812 - 2012 - 2018<br />
                            <abbr title="Email Address">
                                <strong>Email:&nbsp;</strong>
                            </abbr>
                            &nbsp;marketing@aditi.co.id<br /> */}

                        </div>
                        <div className="col-md-4 col-xs-12"></div>
                        <div className="col-md-4 col-xs-12" style={isMobile ? { marginTop: '10px' } : null}>
                            <div className="row">
                                <div
                                    className="socialiconwrapper"
                                    style={
                                        isMobile ?
                                            {
                                                position: 'relative',
                                                minHeight: "1px",
                                                paddingRight: "15px",
                                                paddingLeft: "30px"
                                            } :
                                            {
                                                position: 'relative',
                                                marginTop: '10px'
                                            }
                                    }
                                >
                                    <a className="socialicon facebook" rel="noopener noreferrer" href="https://www.facebook.com/Luminous-Bridal-356056021242785/" target="_blank">
                                        <FaFacebookF />
                                    </a>
                                    <a className="socialicon instagram" rel="noopener noreferrer" href="https://www.instagram.com/lumisoft.id/" target="_blank">
                                        <FaInstagram />
                                    </a>
                                    {
                                        isMobile ?
                                            <a className="socialicon whatsapp" rel="noopener noreferrer" href="whatsapp://send?text=hello&phone=+6281220122018" target="_blank">
                                                <FaWhatsapp />
                                            </a>
                                            :
                                            <a className="socialicon whatsapp" rel="noopener noreferrer" href="https://web.whatsapp.com/send?phone=+6281220122018" target="_blank">
                                                <FaWhatsapp />
                                            </a>
                                    }

                                    <a className="socialicon envelope" rel="noopener noreferrer" href="marketing@aditi.co.id" target="_blank">
                                        <FaRegEnvelope />
                                    </a>
                                    {
                                        isMobile ?
                                            <a className="socialicon phone" rel="noopener noreferrer" href="tel:+622155770863" target="_blank">
                                                <FaPhone />
                                            </a>
                                            : null
                                    }

                                </div>
                            </div>
                            <div className="row">
                                <div
                                    className="copyrights"
                                    style={
                                        isMobile ?
                                            {
                                                position: 'relative',
                                                minHeight: "1px",
                                                paddingRight: "15px",
                                                paddingLeft: "30px",
                                                marginTop: '10px'
                                            } :
                                            {
                                                position: 'relative',
                                                marginTop: '10px'
                                            }
                                    }
                                >
                                    Copyrights &copy; {n}, {isMobile ? <br /> : null}All Rights Reserved by BNC<br />
                                    supported by <a rel="noopener noreferrer" href="https://www.lumisoft.co.id" target="_blank">Lumisoft</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;