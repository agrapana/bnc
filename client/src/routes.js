import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import './website/resources/frontend.css';

///////////////////////////////////////////////////////////
////////////////////////// LOGIN //////////////////////////
///////////////////////////////////////////////////////////
import LumisoftLogin from './admin/authentication/routes';

///////////////////////////////////////////////////////////
////////////////////////// ADMIN //////////////////////////
///////////////////////////////////////////////////////////
import MainAdministrator from './admin/lumisoft/routes';

///////////////////////////////////////////////////////////
///////////////////////// WEBSITE /////////////////////////
///////////////////////////////////////////////////////////
import Website from './website/hoc/public';

const Routes = () => {
    return (
        <Switch>
            {/***** Lumibusiness General Login Page *****/}
            <Route path="/auth" component={LumisoftLogin} />

            {/* ******** Lumibusiness Main Administrator Page *********/}
            <Route path="/admin" component={MainAdministrator} />

            {/********* Lumibusiness Website Page *********/}
            <Route path="/" component={Website} />
        </Switch>
    );
}

export default Routes;