import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { auth } from '../../store/actions/user_action';
import { loading } from '../../store/actions/loading_action';
import Loadingscreen from '../views/loadingscreen';

export default function (ComposedClass, reload, adminRoute) {
    const AuthenticationCheck = (props) => {
        const dispatch = useDispatch();
        const [loadingadmin, loadingadminHandler] = useState(false);

        useEffect(() => {
            let mounted = true;
            const abortController = new AbortController();
            const authCheck = async () => {
                // loadingHandler(true);
                try {
                    loadingadminHandler(dispatch(loading(true)))
                    let getauth = await dispatch(auth(), { signal: abortController.signal });
                    let user = getauth.payload;
                    if (mounted) {
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
                        loadingadminHandler(dispatch(loading(false)))
                    }
                    
                } catch (error) {
                    
                }
                
                // loadingHandler(false);
            }
            authCheck();
            return () => {
                mounted = false;
                abortController.abort();
            }
        }, [dispatch, props.history]);

        if (loadingadmin.status) {
            return (
                <Loadingscreen />
            )
        } else {
            return (
                <ComposedClass {...props} />
            );
        }
    }
    return AuthenticationCheck;
}

