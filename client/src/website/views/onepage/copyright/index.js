import React from 'react';
import { NavLink } from 'react-router-dom';

const CopyrightSection = () => {
    return (
        <div id="frontcopyright">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-xs-12">
                        <p className="footercopy">
                            © 2019
                        <NavLink
                                to={"/"}
                                exact
                            > Lumisoft
                        </NavLink>. All Rights Reserved
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CopyrightSection;