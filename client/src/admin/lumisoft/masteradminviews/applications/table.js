import React, {
    useState,
    useRef,
    useEffect
} from 'react';
import {
    useDispatch
} from 'react-redux';

import FormField from '../../utils/form/formfield';
import { update, generateData, isFormValid } from '../../utils/form/formactions';
import {
    addApplication,
    clearApplication
} from '../../../store/actions/application_action';
// import { useWindowSize } from '../../../widget/windowsize';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faSortAlphaDown, faAlignLeft, faFont, faChevronLeft, faSortNumericDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import {
    faAddressCard
} from '@fortawesome/free-regular-svg-icons';

library.add(faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faAddressCard, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faHandshake, faAlignLeft)


const MasterApplicationTable = (props) => {
    // const size = useWindowSize();
    const useOutsideAlerter = (ref) => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                searchmodeHandler(false)
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
    const [formError, formErrorHandler] = useState(false);
    const [formSuccess, formSuccessHandler] = useState(false);
    const [errorMessage, errorMessageHandler] = useState('DATA INVALID, PLEASE RECHECK!');
    const [formdata, formdataHandler] = useState({
        name: {
            element: 'input',
            title: 'Name',
            value: '',
            config: {
                name: 'nameInput',
                type: 'text',
                placeholder: 'Enter application name'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        description: {
            element: 'input',
            title: 'Description',
            value: '',
            config: {
                name: 'descriptionInput',
                type: 'text',
                placeholder: 'Enter description'
            },
            validation: {
                required: false
            },
            valid: true,
            touched: true,
            validationMessage: ''
        },
        private: {
            element: 'select',
            title: 'Private',
            selectedValue: "NO",
            value: false,
            config: {
                name: 'privateInput',
                options: [
                    { value: true, name: 'YES' },
                    { value: false, name: 'NO' },
                ],
                placeholder: "NO"
            },
            validation: {
                required: false
            },
            valid: true,
            touched: true,
            validationMessage: ''
        },
        pin: {
            element: 'input',
            title: 'Pin',
            value: '',
            config: {
                name: 'pinInput',
                type: 'text',
                placeholder: 'Enter 6 number pin',
                maxLength: '6'
            },
            validation: {
                required: false,
                number: true
            },
            valid: true,
            touched: true,
            validationMessage: ''
        }
    });
    const [dontblur, dontblurHandler] = useState(false);
    const [searchmode, searchmodeHandler] = useState(false);

    const updateForm = (element) => {
        const newFormdata = update(element, formdata, 'application');
        formErrorHandler(false);
        formdataHandler(newFormdata);
    }
    const searchForm = () => {
        searchmodeHandler(true)
    }
    const onMouseEnter = () => {
        dontblurHandler(true)
    }
    const onMouseLeave = () => {
        dontblurHandler(false)
    }
    const hideprofilemenu = () => {
        searchmodeHandler(false)
    }

    const goBackToTable = () => {
        props.history.push('/admin/master/application');
    }

    const selectedItem = (data, whichdata) => {
        var newFormdata = formdata;
        const temporaryFormdata = {
            ...newFormdata
        }

        const newElement = {
            ...temporaryFormdata[whichdata]
        }
        newElement.value = data.value;
        newElement.selectedValue = data.name;
        temporaryFormdata[whichdata] = newElement;
        formdataHandler(temporaryFormdata);
        formErrorHandler(false);
        if (whichdata === 'private') {
            searchmodeHandler(false);
            dontblurHandler(false);
        }
    }

    const showLinks = (type, whichdata) => {
        let list = [];

        if (type && type.length > 0) {
            type.forEach((item) => {
                list.push(item)
            });
        }

        return list.map((item, i) => (
            <li
                key={i}
                onClick={() => selectedItem(item, whichdata)}
                className="listgroupitem"
            >
                <span className="memberHeaderLink">
                    {item.name.replace(/^\w/, c => c.toUpperCase())}
                </span>

            </li>
        ))
    }

    const submitData = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit = generateData(formdata, 'application');
        let formIsValid = isFormValid(formdata, 'application');

        let totalDataToSubmit = {
            name: dataToSubmit.name,
            description: dataToSubmit.description,
            private: dataToSubmit.private,
            pin: dataToSubmit.pin,
            icons: {
                public_id: "icondefault1011",
                url: `${window.location.origin}/admin/assets/images/icon.png`
            }
        }
        if (formIsValid) {
            dispatch(addApplication(totalDataToSubmit)).then(response => {
                if (response.payload.success) {
                    dispatch(clearApplication());
                    formSuccessHandler(true);
                    props.history.push('/admin/master/application/');
                } else {
                    formErrorHandler(true);
                    props.loadingtableHandler(false);
                    errorMessageHandler(response.payload.message);
                }
            })
        } else {
            formErrorHandler(true);
            props.loadingtableHandler(false);
            errorMessageHandler('DATA INVALID, PLEASE RECHECK!');
        }
    }
    // console.log(formdata, "<!<!<!<!<!<!<!<!<!<! formdata")

    return (
        <div>
            <div className="card">
                <div className="cardTitle verticalCenter">
                    <span>{props.pageTitle}</span>
                </div>
                <div className="cardBody formstyle">
                    <div className="row pb25" id="dropzoneforiconposition">
                        <div
                            className="col-md-12 col-xs-12 p0 mb15"
                            style={{ minHeight: '230px' }}>
                            <div className="col-md-12 col-xs-12 pb25">
                                <label className="col-md-2 col-xs-12 colFormLabel p0">{formdata.name.title}</label>
                                <div className="col-md-10 col-xs-12 p0">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faFont}
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
                            <div className="col-md-12 col-xs-12 pb25">
                                <label className="col-md-2 col-xs-12 colFormLabel p0">{formdata.description.title}</label>
                                <div className="col-md-10 col-xs-12 p0">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faAlignLeft}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    <FormField
                                        id={'description'}
                                        formdata={formdata.description}
                                        change={(element) => updateForm(element)}
                                        myclass={'form-control'}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 col-xs-12 pb25">
                                <label className="col-md-2 col-xs-12 colFormLabel p0">{formdata.private.title}</label>
                                <div className="col-md-10 col-xs-12 p0">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faSortAlphaDown}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    {
                                        searchmode ?
                                            <div ref={wrapperRef}>
                                                <div
                                                    onBlur={dontblur ? null : hideprofilemenu}
                                                    tabIndex={0}
                                                >
                                                    <input
                                                        disabled
                                                        autoCapitalize="none"
                                                        autoComplete="off"
                                                        autoCorrect="off"
                                                        className="tableSearch"
                                                        type="text"
                                                        name={formdata.private.title}
                                                        placeholder={formdata.private.title}
                                                        title={formdata.private.config.placeholder}
                                                        value={formdata.private.value ? "YES" : "NO"}
                                                    // onChange={(event) => handleChange(event)}
                                                    // autoFocus={false}
                                                    />

                                                </div>
                                                <ul
                                                    className="dropdownmenu listgroup profilemenu"
                                                    onMouseEnter={onMouseEnter}
                                                    onMouseLeave={onMouseLeave}
                                                >
                                                    {showLinks(formdata.private.config.options, 'private')}
                                                </ul>
                                            </div>
                                            :
                                            <FormField
                                                id={'private'}
                                                formdata={formdata.private}
                                                options={formdata.private.config.options}
                                                change={searchForm}
                                                myclass="inputbutton form-control"
                                            />
                                    }

                                </div>
                            </div>
                            {
                                formdata.private.value ?
                                    <div className="col-md-12 col-xs-12 pb25">
                                        <label className="col-md-2 col-xs-12 colFormLabel p0">{formdata.pin.title}</label>
                                        <div className="col-md-10 col-xs-12 p0">
                                            <div className="iconPosition">
                                                <FontAwesomeIcon
                                                    icon={faSortNumericDown}
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
                                    : null
                            }
                        </div>
                    </div>
                    <div className="row pb25">
                        {
                            formError ?
                                <div className="errorSubmit">
                                    {errorMessage}
                                </div>
                                : formSuccess ?
                                    <div className="successSubmit">
                                        ADD DATA SUCCESS, PLEASE WAIT!
                                    </div>
                                    : null
                        }
                        <div className="formSubmitButtonWithBack">
                            <div
                                className="formbackButton formsubmitButtonShadow buttonColor"
                                title=""
                                onClick={() => goBackToTable()}
                            >
                                <FontAwesomeIcon
                                    icon={faChevronLeft}
                                    className="icon agraicon w18px"
                                />
                            </div>
                            <div className="doubleButton">
                                <button
                                    onClick={(event) => submitData(event)}
                                    className="formsubmitButton formsubmitButtonShadow buttonColor"
                                >
                                    Submit Application
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MasterApplicationTable;