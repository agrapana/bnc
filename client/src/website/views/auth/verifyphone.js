import React from 'react';
import { useWindowSize } from '../../widget/windowsize';
import FrontVerifyPhoneForm from './frontverifyphone';

const FrontVerifyPhonePage = (props) => {
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
                                    <FrontVerifyPhoneForm {...props} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FrontVerifyPhonePage;