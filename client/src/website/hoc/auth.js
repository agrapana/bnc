import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { clientauth } from '../../admin/store/actions/client_action';
import { loading } from '../../admin/store/actions/loading_action';
import Loadingscreen from '../views/loadingscreen';

export default function (ComposedClass, reload, adminRoute) {
    const AuthenticationCheck = (props) => {
        const { clientprops } = useSelector(state => ({
            clientprops: state.client
        }));
        const dispatch = useDispatch();
        const [loadingwebsite, loadingwebsiteHandler] = useState(false);

        useEffect(() => {
            async function authCheck() {
                loadingwebsiteHandler(dispatch(loading(true)))
                let getauth = await dispatch(clientauth());
                let client = getauth.payload;

                if (!client.isAuth) {
                    if (reload) {
                        props.history.push('/login')
                    }
                } else if(client.isAuth && !client.isNamePin) {
                    if (reload) {
                        props.history.push('/namepin', {
                            thisclient: client
                        });
                    }
                } else {
                    if (reload === false) {
                        props.history.push('/')
                    }
                }
                loadingwebsiteHandler(dispatch(loading(false)))
            }
            authCheck();
        }, [dispatch, props.history])

        // useEffect(() => {
        //     let mounted = true;
        //     const abortController = new AbortController();
        //     const authCheck = async () => {
        //         try {
        //             loadingwebsiteHandler(dispatch(loading(true)))
        //             let getauth = await dispatch(clientauth());
        //             let client = getauth.payload;
        //             if (mounted) {
        //                 setTimeout(() => {
        //                     loadingwebsiteHandler(dispatch(loading(false)))
        //                 }, 2000);
                        
        //             }
                    
        //         } catch (error) {
                    
        //         }
                
        //     }
        //     authCheck();
        //     return () => {
        //         mounted = false;
        //         abortController.abort();
        //     }
        // }, [dispatch, props.history]);
        // console.log(loadingwebsite, "<<<<<<loading")
        if (loadingwebsite.status) {
            return (
                <Loadingscreen />
            )
        } else {
            return (
                <ComposedClass {...props} client={clientprops} />
            );
        }
    }
    return AuthenticationCheck;
}

