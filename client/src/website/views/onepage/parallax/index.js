import React from 'react';
import { Parallax } from 'react-parallax';

const ParallaxSection = () => {
    return (
        <div>
            <Parallax 
                bgImage={require('../../../../website/assets/parallax.jpg')} 
                className="parallaxclass"
                strength={500}
            >
                <div className="container quote">
                    <h2 className="parallaxquote">Simplicity is never easy.</h2>
                    <span className="quoteauthor">LUMISOFT&reg;</span>
                </div>
            </Parallax>
        </div>
    );
};

export default ParallaxSection;