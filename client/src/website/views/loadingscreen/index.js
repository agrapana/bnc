import React from 'react';

const loadingscreen = () => {
    return (
        <div className="loader">
            <span className="circle">
                <img
                    className="logo_img mobileHidden"
                    src={window.location.origin + "/admin/assets/images/bnclogo_black.png"}
                    alt=""
                    style={{
                        padding: '15px'
                    }}
                />
                <div className="scircle"></div>
                <div className="scircle"></div>
            </span>
        </div>
    );
};

export default loadingscreen;