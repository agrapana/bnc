import React from 'react';

const LocationSection = () => {
    return (
        <div style={{ position: 'relative' }}>
            <iframe
                src="https://www.google.com/maps/embed/v1/MODE?key=AIzaSyDDjF2tyBEmXSy4ITjawOoVBPQVJy33C3k&parameters"
                width="100%"
                height="500px"
                frameBorder="0"
                // style="border:0;"
                allowFullScreen
            ></iframe>

            <div className="locationtag">
                <div>LOCATION</div>
            </div>
        </div>
    );
};

export default LocationSection;