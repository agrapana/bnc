import React from 'react';
import { IoMdTabletPortrait, IoMdMegaphone, IoMdOptions, IoMdContacts, IoMdSettings, IoMdTrendingUp } from "react-icons/io";

const ServicesSection = () => {
    return (
        <div id="frontservices">
            <div className="container frontservicespadding">
                <div className="row">
                    <div className="frontserviceswrapper col-md-4 col-xs-12">
                        <div className="frontservicesinner">
                            <div className="frontservicesicon">
                                <IoMdMegaphone />
                            </div>
                            <h3>Reach out your audience</h3>
                            <p>Don't stand still and wait for your customer to come, but go out there and introduce your business, and be noticed by your audience.</p>
                        </div>
                    </div>
                    <div className="frontserviceswrapper col-md-4 col-xs-12">
                        <div className="frontservicesinner">
                            <div className="frontservicesicon">
                                <IoMdOptions />
                            </div>
                            <h3>Manage your business</h3>
                            <p>Build website, ecommerce, application and company system such as finance, accounting, stock, CRM with ui friendly and responsive functionality that can be adapted to any screen size.</p>
                        </div>

                    </div>
                    <div className="frontserviceswrapper col-md-4 col-xs-12">
                        <div className="frontservicesinner">
                            <div className="frontservicesicon">
                                <IoMdTabletPortrait />
                            </div>
                            <h3>Business in your hand</h3>
                            <p>Control and manage your business, get notifications, get messages, etc. All in your hand with mobile phone application.</p>
                        </div>
                    </div>
                    <div className="clear"></div>
                    <div className="frontserviceswrapper col-md-4 col-xs-12">
                        <div className="frontservicesinner">
                            <div className="frontservicesicon">
                                <IoMdContacts />
                            </div>
                            <h3>Consultant</h3>
                            <p>Specializing in making system, website, ecommerce and applications. we can help solving your business technology problem.</p>
                        </div>
                    </div>
                    <div className="frontserviceswrapper col-md-4 col-xs-12">
                        <div className="frontservicesinner">
                            <div className="frontservicesicon">
                                <IoMdTrendingUp />
                            </div>
                            <h3>SEO</h3>
                            <p>Planning to be noticed by your audience/your target market minimum for 1 (one) year and manage them to grow your business.</p>
                        </div>

                    </div>
                    <div className="frontserviceswrapper col-md-4 col-xs-12">
                        <div className="frontservicesinner">
                            <div className="frontservicesicon">
                                <IoMdSettings />
                            </div>
                            <h3>Maintenance</h3>
                            <p>Run your system with us, using the latest admin page that will be continuously updated from time to time for maximum performance.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;