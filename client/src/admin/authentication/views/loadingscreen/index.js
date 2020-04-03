import React from 'react';

const loadingscreen = () => {
    return (
        <div className="loader">
            <span className="circle">
                <img className="logo_img mobileHidden" src={window.location.origin + "/admin/assets/images/lumisoft.png"} alt="" />
                <div className="scircle"></div>
                <div className="scircle"></div>
            </span>
        </div>
    );
};

export default loadingscreen;