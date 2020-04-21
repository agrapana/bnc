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
import { NamePin } from '../../../admin/store/actions/client_action';


library.add(faLock, faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faEnvelope, faChevronLeft)

const FrontNamePinForm = (props) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [formError, formErrorHandling] = useState(false);
    const [formSuccess, formSuccessHandling] = useState(false);
    const [errorMessage, errorMessageHandling] = useState('');
    const [formdata, formdataHandling] = useState({
        name: {
            element: 'input',
            value: '',
            config: {
                name: 'nameInput',
                type: 'text',
                placeholder: 'Enter your name'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        pin: {
            element: 'input',
            value: '',
            config: {
                name: 'pinInput',
                type: 'password',
                placeholder: 'Enter your 6 digit pin'
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

    useEffect(() => {
        let mounted = true;
        const abortController = new AbortController();

        const getAllData = async () => {
            try {
                if (mounted && location.state && location.state.thisclient) {
                    thisclientHandler(location.state.thisclient);
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
        const newFormdata = update(element, formdata, 'NamePin');
        formErrorHandling(false)
        formdataHandling(newFormdata)
    }

    const submitForm = (event) => {
        event.preventDefault();
        event.stopPropagation();

        let dataToSubmit = generateData(formdata, 'NamePin');
        let formIsValid = isFormValid(formdata, 'NamePin');

        if (formIsValid) {
            // console.log(dataToSubmit)
            dispatch(NamePin(dataToSubmit, thisclient.token)).then(response => {
                if (response.payload.success) {
                    formSuccessHandling(true);
                    setTimeout(() => {
                        props.history.push('/login');
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
                    <label className="controlLabel">NAME</label>
                    <div className="formWrapper">
                        <div className="iconPosition">
                            <FontAwesomeIcon
                                icon={faLock}
                                className="icon agraicon"
                            />
                        </div>
                        <FormField
                            id={'name'}
                            formdata={formdata.name}
                            change={(element) => updateForm(element)}
                            myclass={'form-control'}
                        />
                    </div>
                </div>
                <div className="formGroup">
                    <label className="controlLabel">PIN</label>
                    <div className="formWrapper">
                        <div className="iconPosition">
                            <FontAwesomeIcon
                                icon={faLock}
                                className="icon agraicon"
                            />
                        </div>
                        <FormField
                            id={'pin'}
                            formdata={formdata.pin}
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
                        title="SUBMIT"
                    />
                </div>
            </form>
        </div>
    );
}

export default FrontNamePinForm;