import React from 'react';
import Fade from 'react-reveal/Fade';

const AboutusSection = () => {
    return (
        <section id="frontaboutus">
            <div className="contentwrap">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 col-sm-12 col-xs-12">
                            <div className="headingblock">
                                <h1>Welcome to lumisoft</h1>
                            </div>
                            <p className="lead">Creating ecommerce, company system, website and application. Supported by our up to date and user friendly admin.</p>
                        </div>
                        <div className="col-md-7 col-sm-12 col-xs-12">
                            <Fade delay={500}>
                                <div style={{ position: 'relative', marginBottom: "-60px" }}>
                                    <img src={window.location.origin + "/admin/assets/images/mainfbrowser.png"} style={{ position: 'absolute', top: 0, left: 0 }} alt="Chrome" />
                                    <img src={window.location.origin + "/admin/assets/images/mainfmobile.png"} style={{ position: 'absolute', top: 0, left: 0 }} alt="iPad" />
                                </div>
                            </Fade>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutusSection;