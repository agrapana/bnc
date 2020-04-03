import React from 'react';
// import { NavLink, Link } from 'react-router-dom';
import { useWindowSize } from '../../../widget/windowsize';
import {
    // FaFacebookSquare, 
    // FaTwitterSquare, 
    FaInstagram,
    // FaGoogle, 
    FaChrome
} from 'react-icons/fa'

const FooterSection = () => {
    const size = useWindowSize();
    const isMobile = size.width <= 767.98;
    return (
        <div id="frontfooter">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-xs-12">
                        <div className="frontwidget">
                            <img src={window.location.origin + "/admin/assets/images/lumisoft_side_white.png"} alt="Lumisoft footer logo" className="footerlogo" height="40" />
                            <p><strong>"Quality</strong> in all our works."</p>
                            <div
                                style={{
                                    background: `url(admin/assets/images/worldmap.png) no-repeat center center`,
                                    backgroundSize: "100%"
                                }}
                            >
                                <address className="mb30">
                                    <strong>Offices: </strong>
                                    <br />
                                    Jl. Daan Mogot Raya No.47
                                                <br />
                                    Grogol - Petamburan, Jakarta Barat
                                                <br />
                                </address>
                                <abbr title="Phone Number">
                                    <strong>Phone: </strong>
                                </abbr>
                                {
                                    isMobile ? <a href="tel:02173661009">+6221 7366 1009</a>
                                        : `+6221 7366 1009`
                                }

                                <br />
                                <abbr title="Email Address">
                                    <strong>Email: </strong>
                                </abbr>
                                {
                                    isMobile ?
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href="mailto:contact@lumisoft.co.id?subject=From website lumisoft!"
                                        >
                                            contact@lumisoft.co.id
                                        </a>
                                        : `contact@lumisoft.co.id`
                                }

                                <br />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-xs-12">

                        {/* <div className="frontwidget">
                            <h4>Download App</h4>
                            <div className="frontfooterdownloadbutton">
                                <NavLink to={"/"}><img src={window.location.origin + "/admin/assets/images/appstore.png"} alt="App Link" height="50" /></NavLink>
                                <NavLink to={"/"}><img style={{ marginTop: "1rem" }} src={window.location.origin + "/admin/assets/images/googleplay.png"} alt="App Link" height="50" /></NavLink>
                            </div>
                        </div> */}

                    </div>
                    <div className="col-md-4 col-xs-12">
                        <aside className="footersocial">
                            <div className="mb10">
                                <h3>Follow Us</h3>
                            </div>
                            <ul className="list">
                                {/* <li>
                                    <NavLink
                                        to={"/"}
                                        exact
                                    >
                                        <FaFacebookSquare />
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to={"/"}
                                        exact
                                    >
                                        <FaTwitterSquare />
                                    </NavLink>
                                </li> */}
                                <li>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://www.instagram.com/lumisoft.id/"
                                    >
                                        <FaInstagram />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://posts.gle/ts3V7"

                                    >
                                        <FaChrome />
                                    </a>
                                </li>
                            </ul>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterSection;