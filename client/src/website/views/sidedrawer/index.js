import React from 'react';
import {
    useSelector
    // useDispatch
} from 'react-redux';
import { NavLink } from 'react-router-dom';
import { pagelist, account } from '../header/link';

const SidedrawerSection = (props) => {
    const { clientprops } = useSelector(state => ({
        clientprops: state.client
    }));
    const publicLink = (item, i) => (
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
    )

    const showLinks = (type) => {
        let list = [];

        if (clientprops && clientprops.clientData) {
            type.forEach((item) => {
                if (!clientprops.clientData.isAuth) {
                    if (item.public === true) {
                        list.push(item)
                    }
                } else {
                    if (item.public === false) {
                        list.push(item)
                    }
                }
            })
        }

        return list.map((item, i) => {
            return publicLink(item, i)
        })
    }

    const className = `sideDrawer ${props.show ? 'open' : ''}`;

    return (
        <nav className={className}>
            <div className="sideDrawerLogo">
                <img className="logo_img" src={window.location.origin + "/admin/assets/images/bnclogo_white3.png"} alt="" />
            </div>
            <ul>
                {showLinks(pagelist)}
                {showLinks(account)}
            </ul>
        </nav >
    );
};

export default SidedrawerSection;