import React from 'react';
import CarouselClients from './clients';

const ClientsSection = (props) => {
    return (
        <div style={{ position: 'relative' }}>
            <CarouselClients isMobile={props.isMobile} {...props} />
        </div>
    );
};

export default ClientsSection;