import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { auth } from '../../store/actions/user_action';
import Loadingscreen from '../views/loadingscreen';

export default function (ComposedClass, reload, adminRoute) {
    const AuthenticationCheck = (props) => {
        const { userprops } = useSelector(state => ({
            userprops: state.user
        }));
        const dispatch = useDispatch();
        const [loading, loadingHandler] = useState(false);

        useEffect(() => {
            async function authCheck() {
                loadingHandler(true);
                let getauth = await dispatch(auth());
                let user = getauth.payload;

                if (!user.isAuth) {
                    if (reload) {
                        props.history.push('/auth')
                    }
                } else {
                    if (reload === false) {
                        props.history.push('/admin/dashboard')
                    } else {
                        if (adminRoute === true) {
                            props.history.push('/admin/dashboard')
                        }
                    }
                }
                loadingHandler(false);
            }
            authCheck();
        }, [dispatch, props.history])

        if (loading) {
            return (
                <Loadingscreen />
            )
        }
        return (
            <ComposedClass {...props} user={userprops} />
        );

    }

    return AuthenticationCheck;
}

