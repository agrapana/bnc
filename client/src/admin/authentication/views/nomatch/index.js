import React from 'react';
// import MyButton from '../../utils';

const NoMatch = () => {
    return (
        <div className="row wFullscreen hFullscreen noMargin pt10p">
            <div className="col-agmd-12 col-xs-12">
                <div className="mxAuto myCard cardTransparent textCenter">
                    <h1 className="lh1 fs170 mb50">404</h1>
                    <h3 className="textUppercase">Page not found!</h3>
                    <p className="lead">Seems you're looking for something that doesn't exist. </p>
                </div>
            </div>
        </div>
    );
}

export default NoMatch;