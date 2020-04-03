import React from 'react';
// import MyButton from '../../utils';

const NoMatch = () => {
    return (
        <div className="row lumisoftnomatch">
            <div className="col-md-12 col-xs-12">
                <div className="lumisoftnomatchwrapper">
                    <h1 className="lumisoftnomatchtitle">404</h1>
                    <h3 className="textUppercase">Page not found!</h3>
                    <p className="lead">Seems you're looking for something that doesn't exist. </p>
                </div>
            </div>
        </div>
    );
}

export default NoMatch;