import React, { useState, useEffect, useCallback } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { scroller } from 'react-scroll';
import DrawerToggle from '../sidedrawer/drawertoggle';

const HeaderSection = (props) => {
    const [headerShow, headerShowHandler] = useState(false);
    const [pagelist] = useState([
        {
            name: 'Home',
            linkTo: 'home',
            public: true
        },
        {
            name: 'Brands',
            linkTo: '#',
            public: true
        },
        {
            name: 'Showcase',
            linkTo: 'showcase',
            public: true
        },
        {
            name: 'Contact',
            linkTo: 'contact',
            public: true
        }
    ])

    const scrollToElement = (element) => {
        scroller.scrollTo(element, {
            duration: 1000,
            delay: 100,
            smooth: true
        });
    }

    const userLink = (item, i) => (
        <li
            key={i}
        >
            <button
                onClick={() => scrollToElement(item.linkTo)}
            >
                <div className="itemContent">
                    <div className="itemInner">
                        <span className="title">
                            {item.name}
                        </span>
                    </div>
                </div>
            </button>
        </li>
    )

    const showLinks = (type) => {
        let list = [];
        type.forEach((item) => {
            if (item.public === true) {
                list.push(item)
            }
        })

        return list.map((item, i) => {
            return userLink(item, i)
        })
    }

    const handleScroll = useCallback(() => {
        let nowscrolling = window.scrollY;
        let isScrolling = nowscrolling > 10;
        if (isScrolling) {
            headerShowHandler(true)
        } else {
            headerShowHandler(false)
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);   
        }
    }, [handleScroll])

    return (
        <header className={headerShow ? "frontendwebsite topBar black" : "frontendwebsite topBar transparent"}>
            <div className="container">
                <div style={{
                    display: 'flex',
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <div className="topBarLeft">
                        <div className="toggleButton white">
                            <DrawerToggle click={props.drawerClickHandler} />
                        </div>
                        <div className="logo">
                            <a href="/">
                                <img className="logo_img mobileHidden" src={headerShow ? window.location.origin + "/admin/assets/images/maxilumlogo.png" : window.location.origin + "/admin/assets/images/maxilumlogo.png"} alt="" width="160" />
                                <img className="logo_img pcHidden" src={headerShow ? window.location.origin + "/admin/assets/images/maxilumlogo.png" : window.location.origin + "/admin/assets/images/maxilumlogo.png"} alt="" width="160" />
                            </a>
                        </div>
                    </div>
                    <div className="topBarRight">
                        <div className="clear"></div>
                        <div className={headerShow ? "navigation_items" : "navigation_items white"}>
                            <ul>
                                <span className="mobileDisplayNone">{showLinks(pagelist)}</span>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );

}

export default HeaderSection;