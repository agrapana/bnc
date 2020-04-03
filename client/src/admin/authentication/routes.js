import React from 'react';
import { Switch, Route } from 'react-router-dom';

import '../adminresources/styles.css';

import AuthLayout from './hoc/layout';
import Auth from './hoc/auth';
import InitialAuth from './hoc/initialauth';

import AuthLogin from './views/loginscreen';
import AuthLogout from './views/logoutscreen';
import InitialInstallation from './views/initialinstallation';
import NoMatch from './views/nomatch';

const AuthLoginLayout = () => {
    // console.log(props)
    return (
        <AuthLayout>
            <Switch>
                <Route path="/auth/initialinstallation" exact component={InitialInstallation} />
                <Route path="/auth/logout" exact component={Auth(AuthLogout, true)} />
                <Route path="/auth" exact component={InitialAuth(AuthLogin, false)} />
                <Route component={Auth(NoMatch)} />
            </Switch>
        </AuthLayout>
    );
};

export default AuthLoginLayout;