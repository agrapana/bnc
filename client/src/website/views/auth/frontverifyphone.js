import React, {
    useState,
    useEffect,
    useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faLock,
    faHome,
    faSignInAlt,
    faListUl,
    faCartArrowDown,
    faUser,
    faBell,
    faHeart,
    faEnvelope,
    faChevronLeft,
    faSortAlphaDown
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from "react-router-dom";
import FormField from '../../../admin/lumisoft/utils/form/formfield';
import MyButton from '../../../admin/lumisoft/utils/button';
import { update, generateData, isFormValid } from '../../../admin/lumisoft/utils/form/formactions';
import { confirmPhoneNumber } from '../../../admin/store/actions/client_action';


library.add(faLock, faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faEnvelope, faChevronLeft)

const FrontVerifyPhoneForm = (props) => {
    const location = useLocation();
    // const useOutsideAlerter = (ref) => {
    //     /**
    //      * Alert if clicked on outside of element
    //      */
    //     function handleClickOutside(event) {
    //         if (ref.current && !ref.current.contains(event.target)) {
    //             searchpublishmodeHandler(false)
    //         }
    //     }

    //     useEffect(() => {
    //         // Bind the event listener
    //         document.addEventListener("mousedown", handleClickOutside);
    //         return () => {
    //             // Unbind the event listener on clean up
    //             document.removeEventListener("mousedown", handleClickOutside);
    //         };
    //     });
    // }

    // const wrapperRef = useRef(null);
    // useOutsideAlerter(wrapperRef);

    const dispatch = useDispatch();
    const [formError, formErrorHandling] = useState(false);
    const [formSuccess, formSuccessHandling] = useState(false);
    const [errorMessage, errorMessageHandling] = useState('');
    const [formdata, formdataHandling] = useState({
        code: {
            element: 'input',
            value: '',
            config: {
                name: 'codeInput',
                type: 'password',
                placeholder: 'Enter your 6 digit code'
            },
            validation: {
                required: true,
                number: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        }
    });
    const [thisclient, thisclientHandler] = useState({});
    const [clientToken, clientTokenHandler] = useState({});
    const [thisextension, thisextensionHandler] = useState({});

    // const [isDone, isDoneHandler] = useState(false);

    // useEffect(() => {
    //     if (isDone) {
    //         props.history.push('/profile');
    //     }
    // }, [isDone, props.history])
    useEffect(() => {
        let mounted = true;
        const abortController = new AbortController();

        const getAllData = async () => {
            try {
                if (mounted && location.state && location.state.thisclient && location.state.thisextension && location.state.clientToken) {
                    thisclientHandler(location.state.thisclient);
                    clientTokenHandler(location.state.clientToken);
                    thisextensionHandler(location.state.thisextension);
                } else {
                    props.history.push('/register');
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

    const updateForm = (element) => {
        const newFormdata = update(element, formdata, 'login');
        formErrorHandling(false)
        formdataHandling(newFormdata)
    }

    const submitForm = (event) => {
        event.preventDefault();
        event.stopPropagation();

        let dataToSubmit = generateData(formdata, 'verifyphone');
        let formIsValid = isFormValid(formdata, 'verifyphone');

        let totalDataToSubmit = {
            ...dataToSubmit,
            phone: thisclient,
            extension: thisextension
        }

        if (formIsValid) {
            // console.log(dataToSubmit)
            dispatch(confirmPhoneNumber(totalDataToSubmit, clientToken)).then(response => {
                if (response.payload.success) {
                    let newclient = response.payload.newclient;
                    formSuccessHandling(true);
                    setTimeout(() => {
                        props.history.push('/namepin', {
                            thisclient: newclient
                        });
                    }, 2000)
                    
                } else {
                    formErrorHandling(true);
                    errorMessageHandling(response.payload.message);
                }
            });
        } else {
            formErrorHandling(true);
            errorMessageHandling('PLEASE CHECK YOUR DATA');
        }

    }

    return (
        <div>
            <form onSubmit={(event) => submitForm(event)} className="adminloginform">
                <div className="formGroup">
                    <label className="controlLabel">CODE</label>
                    <div className="formWrapper">
                        <div className="iconPosition">
                            <FontAwesomeIcon
                                icon={faLock}
                                className="icon agraicon"
                            />
                        </div>
                        <FormField
                            id={'code'}
                            formdata={formdata.code}
                            change={(element) => updateForm(element)}
                            myclass={'form-control'}
                        />
                    </div>
                </div>
                {
                    formError ?
                        <div className="errorLabel globalError">
                            {errorMessage}
                        </div>
                        : null
                }
                {
                    formSuccess ?
                        <div className="successLabel globalSuccess">
                            SUCCESS, PLEASE WAIT...
                        </div>
                        : null
                }
                <div className="formActions">
                    <MyButton
                        name="login"
                        classname="submitButton submitButtonShadow buttonColor"
                        type="submit"
                        title="VERIFY"
                    />
                </div>
            </form>
        </div>
    );
}

export default FrontVerifyPhoneForm;