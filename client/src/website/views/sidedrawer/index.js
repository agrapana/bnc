import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
const SidedrawerSection = (props) => {
    const history = useHistory();

    const [pagelist] = useState([
        {
            name: 'Home',
            linkTo: '/',
            public: true
        },
        {
            name: 'Showcase',
            linkTo: '/profile',
            public: true
        },
        {
            name: 'Contact',
            linkTo: '/contact',
            public: true
        }
    ])

    const publicLink = (items) => (
        items.map((item, i) => (
            <li key={i}>
                <NavLink
                    to={item.linkTo}
                    activeClassName="active"
                    exact
                    onClick={() => props.click()}
                >
                    <div className="itemContent">
                        <div className="itemInner">
                            <span className="title">{item.name}</span>
                        </div>
                    </div>
                </NavLink>
            </li>
        ))
    )

    const className = `sideDrawer ${props.show ? 'open' : ''}`;

    return (
        <nav className={className}>
            <div className="sideDrawerLogo">
                <img className="logo_img" src={window.location.origin + "/admin/assets/images/maxilumlogo.png"} alt="" />
            </div>
            <ul>
                {publicLink(pagelist)}
            </ul>
        </nav >
    );
};

export default SidedrawerSection;