import React, { useState, useEffect } from 'react';
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
    faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FormField from '../../utils/form/formfield';
import MyButton from '../../utils/button';
import { update, generateData, isFormValid } from '../../utils/form/formactions';
import { loginUser } from '../../../store/actions/user_action';


library.add(faLock, faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faEnvelope, faChevronLeft)

const LoginForm = (props) => {
    const dispatch = useDispatch();
    const [formError, formErrorHandling] = useState(false);
    const [formSuccess, formSuccessHandling] = useState(false);
    const [errorMessage, errorMessageHandling] = useState('');
    const [formdata, formdataHandling] = useState({
        email: {
            element: 'input',
            value: '',
            config: {
                name: 'emailInput',
                type: 'email',
                placeholder: 'Enter your email'
            },
            validation: {
                required: true,
                email: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        password: {
            element: 'input',
            value: '',
            config: {
                name: 'passwordInput',
                type: 'password',
                placeholder: 'Enter your password'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        }
    });
    const [isDone, isDoneHandler] = useState(false);
    useEffect(() => {
        if(isDone) {
            props.history.push('/admin/dashboard');
        }
    }, [isDone, props.history])

    const updateForm = (element) => {
        const newFormdata = update(element, formdata, 'login');
        formErrorHandling(false)
        formdataHandling(newFormdata)
    }

    const submitForm = (event) => {
        event.preventDefault();
        event.stopPropagation();

        let dataToSubmit = generateData(formdata, 'login');
        let formIsValid = isFormValid(formdata, 'login');

        if (formIsValid) {
            // console.log(dataToSubmit)
            dispatch(loginUser(dataToSubmit)).then(response => {
                if (response.payload.success) {
                    isDoneHandler(true);
                    formSuccessHandling(true);
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
                    <label className="controlLabel">Email</label>
                    <div className="formWrapper">
                        <div className="iconPosition">
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="icon agraicon"
                            />
                        </div>
                        <FormField
                            id={'email'}
                            formdata={formdata.email}
                            change={(element) => updateForm(element)}
                            myclass={'form-control'}
                        />
                    </div>
                </div>
                <div className="formGroup">
                    <label className="controlLabel">Password</label>
                    <div className="formWrapper">
                        <div className="iconPosition">
                            <FontAwesomeIcon
                                icon={faLock}
                                className="icon agraicon"
                            />
                        </div>
                        <FormField
                            id={'password'}
                            formdata={formdata.password}
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
                        title="LOGIN"
                    />
                </div>
            </form>
        </div>
    );
}

export default LoginForm;