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

import FormField from '../../../admin/lumisoft/utils/form/formfield';
import MyButton from '../../../admin/lumisoft/utils/button';
import { update, generateData, isFormValid } from '../../../admin/lumisoft/utils/form/formactions';
import { verifyPhone } from '../../../admin/store/actions/client_action';
import { loading } from '../../../admin/store/actions/loading_action';
// import Loadingscreen from '../../views/loadingscreen';

library.add(faLock, faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faEnvelope, faChevronLeft)

const FrontRegisterForm = (props) => {
    const useOutsideAlerter = (ref) => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                searchpublishmodeHandler(false)
            }
        }

        useEffect(() => {
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        });
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const dispatch = useDispatch();
    const [formError, formErrorHandling] = useState(false);
    const [formSuccess, formSuccessHandling] = useState(false);
    const [loadingwebsite, loadingwebsiteHandler] = useState(false);
    const [errorMessage, errorMessageHandling] = useState('');
    const [formdata, formdataHandling] = useState({
        phone: {
            element: 'input',
            value: '',
            config: {
                name: 'phoneInput',
                type: 'text',
                placeholder: 'Enter your phone'
            },
            validation: {
                required: true,
                phone: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        }
    });
    const [selectedcountry, selectedcountryHandling] = useState({
        country: {
            element: 'select',
            title: 'Country',
            selectedValue: "INDONESIA",
            value: '+62',
            config: {
                name: 'countryInput',
                options: [
                    { value: "+62", name: 'INDONESIA' },
                    { value: "+61", name: 'AUSTRALIA' },
                    { value: "+65", name: 'SINGAPORE' },
                ],
                placeholder: 'Choose Country'
            },
            validation: {
                required: false
            },
            valid: true,
            touched: true,
            validationMessage: ''
        },
    });
    const [searchpublishmode, searchpublishmodeHandler] = useState(false);
    const [dontblurpublish, dontblurpublishHandler] = useState(false);

    // const [isDone, isDoneHandler] = useState(false);

    // useEffect(() => {
    //     if (isDone) {
    //         props.history.push('/verifyphone');
    //     }
    // }, [isDone, props.history])

    const updateForm = (element) => {
        const newFormdata = update(element, formdata, 'login');
        formErrorHandling(false)
        formdataHandling(newFormdata)
    }

    const searchFormPublish = () => {
        searchpublishmodeHandler(true)
    }
    const onMouseEnterPublish = () => {
        dontblurpublishHandler(true)
    }
    const onMouseLeavePublish = () => {
        dontblurpublishHandler(false)
    }
    const hidepublishmenu = () => {
        searchpublishmodeHandler(false)
    }
    const chooseTrueFalse = (type, whichdata) => {
        let list = [];

        if (type && type.length > 0) {
            type.forEach((item) => {
                list.push(item)
            });
        }

        return list.map((item, i) => (
            <li
                key={i}
                onClick={() => selectedItemPublish(item, whichdata)}
                className="listgroupitem"
            >
                <span className="memberHeaderLink">
                    {item.name.replace(/^\w/, c => c.toUpperCase())}
                </span>

            </li>
        ))
    }

    const selectedItemPublish = (data, whichdata) => {
        var newFormdata = selectedcountry;
        const temporaryFormdata = {
            ...newFormdata
        }

        const newElement = {
            ...temporaryFormdata[whichdata]
        }

        newElement.value = data.value;
        newElement.selectedValue = data.name.replace(/^\w/, c => c.toUpperCase());
        temporaryFormdata[whichdata] = newElement;
        selectedcountryHandling(temporaryFormdata);
        formErrorHandling(false);
        searchpublishmodeHandler(false);
        dontblurpublishHandler(false);
    }

    const submitForm = (event) => {
        event.preventDefault();
        event.stopPropagation();

        let dataToSubmit = generateData(formdata, 'register');
        let formIsValid = isFormValid(formdata, 'register');

        let phonenumber = dataToSubmit.phone.replace(/^0+/, '');

        let totalDataToSubmit = {
            phone: phonenumber,
            extension: selectedcountry.country.value
        }

        if (formIsValid) {
            // console.log(dataToSubmit)
            dispatch(verifyPhone(totalDataToSubmit)).then(response => {
                if (response.payload.success) {
                    // isDoneHandler(true);
                    formSuccessHandling(true);
                    let phone = response.payload.doc.phone;
                    let token = response.payload.tokendoc.token;
                    let extension = response.payload.doc.extension;
                    setTimeout(() => {
                        props.history.push('/verifyphone', {
                            thisclient: phone,
                            clientToken: token,
                            thisextension: extension
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
                    <label className="controlLabel">Phone</label>
                    <div className="formWrapper">
                        <div className="iconPosition">
                            <div
                                className="icon agraicon"
                                style={{
                                    fontSize: '14px'
                                }}
                            >
                                {selectedcountry.country.value}
                            </div>
                        </div>
                        <FormField
                            id={'phone'}
                            formdata={formdata.phone}
                            change={(element) => updateForm(element)}
                            myclass={'form-control'}
                        />
                    </div>
                </div>
                <div className="formGroup">
                    <label className="colFormLabel">{selectedcountry.country.title}</label>
                    <div className="formWrapper">
                        <div className="iconPosition">
                            <FontAwesomeIcon
                                icon={faSortAlphaDown}
                                className="icon agraicon"
                            />
                        </div>
                        {
                            searchpublishmode ?
                                <div ref={wrapperRef}>
                                    <div
                                        onBlur={dontblurpublish ? null : hidepublishmenu}
                                        tabIndex={0}
                                    >
                                        <input
                                            disabled
                                            autoCapitalize="none"
                                            autoComplete="off"
                                            autoCorrect="off"
                                            className="tableSearch"
                                            type="text"
                                            name={selectedcountry.country.title}
                                            placeholder={selectedcountry.country.title}
                                            title={selectedcountry.country.config.placeholder}
                                            value={selectedcountry.country.value === "+62" ? "INDONESIA" : "AUSTRALIA"}
                                        // onChange={(event) => handleChange(event)}
                                        // autoFocus={true}
                                        />

                                    </div>
                                    <ul
                                        className="dropdownmenu listgroup profilemenu"
                                        onMouseEnter={onMouseEnterPublish}
                                        onMouseLeave={onMouseLeavePublish}
                                    >
                                        {chooseTrueFalse(selectedcountry.country.config.options, 'country')}
                                    </ul>
                                </div>


                                :
                                <FormField
                                    id={'country'}
                                    formdata={selectedcountry.country}
                                    options={selectedcountry.country.config.options}
                                    change={searchFormPublish}
                                    myclass="inputbutton form-control"
                                />
                        }
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

export default FrontRegisterForm;