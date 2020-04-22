import React from 'react';
import { Switch, Route } from 'react-router-dom';

import '../resources/frontend.css';
import Layout from './layout';
import Auth from './auth';

import LoginPage from '../views/auth/login';
import RegisterPage from '../views/auth/register';
import VerifyPhonePage from '../views/auth/verifyphone';
import NamePinPage from '../views/auth/namepin';
import LogoutPage from '../views/auth/logout';

import LeaguePage from '../views/league';
import LeagueDetailPage from '../views/league/detail';
import NotificationPage from '../views/notification';
import ContactPage from '../views/contact';
import ProfilePage from '../views/profile';
import Home from '../views/home'
import NoMatch from '../views/nomatch';

const PublicLayout = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/login" exact component={Auth(LoginPage, false)} />
                <Route path="/register" exact component={Auth(RegisterPage, false)} />
                <Route path="/verifyphone" exact component={Auth(VerifyPhonePage, false)} />
                <Route path="/namepin" exact component={Auth(NamePinPage, false)} />
                <Route path="/logout" exact component={Auth(LogoutPage, true)} />
                <Route path="/league" exact component={Auth(LeaguePage, true)} />
                <Route path="/league/:id" exact component={Auth(LeagueDetailPage, true)} />
                <Route path="/notification" exact component={Auth(NotificationPage, true)} />
                <Route path="/contact" exact component={Auth(ContactPage, true)} />
                <Route path="/profile" exact component={Auth(ProfilePage, true)} />
                <Route path="/" exact component={Auth(Home, null)} />
                <Route component={NoMatch} />
            </Switch>
        </Layout>
    );
};

export default PublicLayout;