import React from 'react';
import { useWindowSize } from '../../../widget/windowsize';
import path from '../../../lumisoft/allroutes';
import LoginForm from './loginform';

const LoginScreen = (props) => {
    const size = useWindowSize();

    return (
        <div
            className="loginWrapper"
            style={{
                backgroundImage: 'url(/admin/assets/images/dark-material-bg.jpg)'
            }}
        >
            <div className="loginAuthContainer">
                <div className="loginFlexDirectionRow" style={{ minHeight: size.height }}>
                    <div className="loginAuthWelcome">
                        <div className="loginAuthTitle">
                            <div className="authLoginTitle">
                                <p>Welcome to Lumisoft !</p>
                            </div>
                            <div className="authLoginDescription">
                                <p>"Providing realiable and trustworthy services"</p>
                            </div>
                        </div>
                        <div className="loginCopyright">
                            <div className="copyright">
                                <p>
                                    © 2019 Lumisoft ( {path.version} )
					            </p>
                            </div>
                            <div className="privacyLegal">
                                <p className="mr20">Privacy</p>
                                <p className="mr20">Legal</p>
                                <p className="mr20">Contact</p>
                            </div>
                        </div>
                    </div>

                    <div className="loginFormWrapper loginFormWrapperOpen">
                        <div className="loginFormInner">
                            <div className="authLoginFormLogo">
                                <img
                                    className="loginLogoImg pcHidden"
                                    src={window.location.origin + "/admin/assets/images/logowhite.png"}
                                    alt=""
                                    width="190px"
                                />
                            </div>
                            <div className="authLoginFormTitle mb30">LOGIN TO ADMIN PANEL</div>

                            <LoginForm {...props} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;