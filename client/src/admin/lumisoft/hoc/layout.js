import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Header from '../views/layout/header';
import SideDrawer from '../views/layout/sidedrawer';
import BackDrop from '../views/layout/backdrop';

const MainPage = (props) => {
    const { loadingprops } = useSelector(state => ({
        loadingprops: state.loading.isLoading
    }));

    const [sideDrawerOpen, sideDrawerOpenHandler] = useState(false);
    const drawerToggleClickHandler = () => {
        sideDrawerOpenHandler(!sideDrawerOpen)
    };

    const backdropClickHandler = () => {
        document.body.style.overflow = 'overlay';
        sideDrawerOpenHandler(false)
    }

    return (
        <div id="lumisoftmaster" style={{ height: '100%' }}>
            {
                loadingprops ? null :
                    <div id="lumisoftadmin">
                        <Header drawerClickHandler={drawerToggleClickHandler} />
                        <SideDrawer show={sideDrawerOpen} click={backdropClickHandler} />
                        {
                            sideDrawerOpen &&
                            <BackDrop click={backdropClickHandler} />
                        }
                    </div>
            }
            <div className="page_container" style={{ paddingTop: 56 }}>
                {props.children}
            </div>

        </div>
    );

}

export default MainPage;