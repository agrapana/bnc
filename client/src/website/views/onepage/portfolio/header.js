import React, { useState, useEffect, useCallback } from 'react';
// import { scroller } from 'react-scroll';

const PortfolioHeader = (props) => {
    const [headerShow, headerShowHandler] = useState(false);
    const [pagelist] = useState([
        {
            name: 'Back',
            linkTo: '/',
            public: true
        },
    ])

    const scrollToElement = (element) => {
        props.history.push(element)
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
                        <div className="logo">
                            <a href="/">
                                <img className="logo_img mobileHidden" src={headerShow ? window.location.origin + "/admin/assets/images/lumisoft_side_white.png" : window.location.origin + "/admin/assets/images/lumisoft_side_white.png"} alt="" width="160" />
                                <img className="logo_img pcHidden" src={headerShow ? window.location.origin + "/admin/assets/images/lumisoft_side_white.png" : window.location.origin + "/admin/assets/images/lumisoft_side_white.png"} alt="" width="160" />
                            </a>
                        </div>
                    </div>
                    <div className="topBarRight">
                        <div className="clear"></div>
                        <div className={headerShow ? "navigation_items" : "navigation_items white"}>
                            <ul>
                                <span>{showLinks(pagelist)}</span>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default PortfolioHeader;