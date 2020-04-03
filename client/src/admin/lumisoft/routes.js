import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import '../adminresources/styles.css';
import path from './allroutes';

import MainPage from './hoc/layout';
import Auth from './hoc/auth';

// import MainCustomers from '../components/customers';
// import MainQuotations from '../components/quotations';
// import MainUsers from '../components/users';
// import MainProducts from '../components/products';
import NoMatch from './views/nomatch';


const MainLayout = () => {
    const [routepath] = useState(path.mainpath);
    const [templateroutepath] = useState(path.templatepath);
    const [subtemplateroutepath] = useState(path.subtemplatepath);
    const [adminroutepath] = useState(path.adminpath);
    const [subadminroutepath] = useState(path.subadminpath);
    return (
        <MainPage routepath={routepath} templateroutepath={templateroutepath} >
            <Switch>
                {
                    routepath
                    .filter(route => route.show === true)
                    .map((route, index) => <Route key={index} path={route.link} exact={route.exact} component={Auth(route.component, route.public)} />)
                }
                {
                    templateroutepath
                    .filter(route => route.show === true)
                    .map((route, index) => <Route key={index} path={route.link} exact={route.exact} component={Auth(route.component, route.public)} />)
                }
                {
                    subtemplateroutepath
                    .filter(route => route.show === true)
                    .map((route, index) => <Route key={index} path={route.link} exact={route.exact} component={Auth(route.component, route.public)} />)
                }
                {
                    adminroutepath
                    .filter(route => route.show === true)
                    .map((route, index) => <Route key={index} path={route.link} exact={route.exact} component={Auth(route.component, route.public)} />)
                }
                {
                    subadminroutepath
                    .filter(route => route.show === true)
                    .map((route, index) => <Route key={index} path={route.link} exact={route.exact} component={Auth(route.component, route.public)} />)
                }
                {/* <Route path="/admin/dashboard" exact component={Auth(MainDashboard, true)} />
                <Route path="/admin/email" exact component={Auth(EmailScreen, true)} />
                <Route path="/admin/portfolio" exact component={Auth(PortfolioScreen, true)} />
                <Route path="/admin/portfolio/addnew" exact component={Auth(PortfolioAddNewScreen, true)} /> */}
                {/* <Route path="/admin/gallery" exact component={Auth(GalleryScreen, true)} />
                <Route path="/admin/couple" exact component={Auth(CoupleScreen, true)} /> */}
                {/* <Route path="/admin/customers" exact component={Auth(MainCustomers, true)} />
                <Route path="/admin/quotations" exact component={Auth(MainQuotations, true)} />
                <Route path="/admin/users" exact component={Auth(MainUsers, true, true)} />
                <Route path="/admin/products" exact component={Auth(MainProducts, true)} /> */}
                <Route component={Auth(NoMatch)} />
            </Switch>
        </MainPage>
    );
}

export default MainLayout;