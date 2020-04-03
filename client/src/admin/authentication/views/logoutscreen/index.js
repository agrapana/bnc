import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Loadingscreen from '../loadingscreen';
import { logoutUser } from '../../../store/actions/user_action';

const LogoutScreen = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        let mounted = true;
        async function Logout() {
            try {
                if (mounted) {
                    let getlogout = await dispatch(logoutUser());
                    if (getlogout.payload.success) {
                        props.history.push('/auth');
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

export default LogoutScreen;