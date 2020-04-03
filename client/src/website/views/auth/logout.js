import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Loadingscreen from '../loadingscreen';
import { logoutClient } from '../../../admin/store/actions/client_action';

const FrontLogoutScreen = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        let mounted = true;
        async function Logout() {
            try {
                if (mounted) {
                    let getlogout = await dispatch(logoutClient());
                    if (getlogout.payload.success) {
                        props.history.push('/login');
                    }
                }

            } catch (error) {

            }
        }
        Logout();
        return () => {
            mounted = false;
        }
    }, [dispatch, props.history])

    return (
        <Loadingscreen />
    );

}

export default FrontLogoutScreen;