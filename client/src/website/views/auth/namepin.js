import React from 'react';
import { useWindowSize } from '../../widget/windowsize';
import FrontNamePinForm from './frontnamepinform';

const FrontNamePinPage = (props) => {
    const size = useWindowSize();

    return (
        <div id="frontloginwrapper">
            <section id="frontlogin" style={{ marginBottom: 0 }}>
                <div className="contentwrap">
                    <div className="section" style={{ height: size.height }}></div>
                    <div className="sectionwrapper" style={{ height: size.height }}>
                        <div className="loginWrapper">
                            <div className="card">
                                <div className="cardBody">
                                    <FrontNamePinForm {...props} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FrontNamePinPage;