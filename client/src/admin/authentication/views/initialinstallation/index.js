import React, {
    useEffect
} from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { getAdminUser, adminInstallation } from '../../../store/actions/user_action';
import Loadingscreen from '../../views/loadingscreen';

const InitialInstallation = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        let mounted = true;
        const abortController = new AbortController();

        const getAllData = async () => {
            try {

                let getadminuser = await dispatch(getAdminUser());
                let admin = getadminuser.payload;

                if (mounted && admin.success) {
                    if (admin && admin.users.length > 0) {
                        props.history.push('/auth')
                    } else {
                        let initial = await dispatch(adminInstallation());
                        let getresult = initial.payload;
                        if(getresult.success){
                            props.history.push('/auth')
                        } else {

                        }
                    }
                } else {

                }
            } catch (error) {

            }
        }
        getAllData();
        return () => {
            mounted = false;
            abortController.abort();
        }
    }, [dispatch])

    return (
        <Loadingscreen />
    )

}

export default InitialInstallation;