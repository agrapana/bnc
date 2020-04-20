import React, {
    useState,
    // useRef,
    // useEffect
} from 'react';
import {
    useDispatch
} from 'react-redux';

import FormField from '../../utils/form/formfield';
import { update, validate, generateData, isFormValid } from '../../utils/form/formactions';
import {
    addLeague,
    clearLeague
} from '../../../store/actions/league_action';
// import { useWindowSize } from '../../../widget/windowsize';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faSortAlphaDown, faAlignLeft, faFont, faChevronLeft, faSortNumericDown, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import {
    faAddressCard
} from '@fortawesome/free-regular-svg-icons';

library.add(faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faAddressCard, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faHandshake, faAlignLeft)


const MasterLeagueTable = (props) => {
    // const size = useWindowSize();
    // const useOutsideAlerter = (ref) => {
    //     /**
    //      * Alert if clicked on outside of element
    //      */
    //     function handleClickOutside(event) {
    //         if (ref.current && !ref.current.contains(event.target)) {
    //             searchmodeHandler(false)
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
                placeholder: 'Enter league name'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        info: {
            element: 'input',
            title: 'Info',
            value: '',
            config: {
                name: 'infoInput',
                type: 'text',
                placeholder: 'Enter league information'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        rules: {
            element: 'input',
            title: 'Rules',
            value: '',
            config: {
                name: 'rulesInput',
                type: 'text',
                placeholder: 'Enter league rules'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        start: {
            element: 'input',
            title: 'Start date',
            value: new Date(),
            config: {
                name: 'startInput',
                type: 'text',
                placeholder: 'Choose date'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        accountnumber: {
            element: 'input',
            title: 'Account Number',
            value: '',
            config: {
                name: 'accountnumberInput',
                type: 'text',
                placeholder: 'Enter your account number'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        accountname: {
            element: 'input',
            title: 'Account Name',
            value: '',
            config: {
                name: 'accountnameInput',
                type: 'text',
                placeholder: 'Enter your account name'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        amount: {
            element: 'input',
            title: 'Amount',
            value: '',
            config: {
                name: 'amountInput',
                type: 'text',
                placeholder: 'Enter amount'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        bank: {
            element: 'input',
            title: 'Bank',
            value: '',
            config: {
                name: 'bankInput',
                type: 'text',
                placeholder: 'Enter bank'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        }
    });
    // const [dontblur, dontblurHandler] = useState(false);
    // const [searchmode, searchmodeHandler] = useState(false);

    const updateForm = (element) => {
        const newFormdata = update(element, formdata, 'league');
        formErrorHandler(false);
        formdataHandler(newFormdata);
    }

    const datehandleChange = (newDate) => {
        formErrorHandler(false);
        errorMessageHandler('');

        let rightnow = new Date();
        var newFormdata = formdata;
        
        const temporaryFormdata = {
            ...newFormdata
        }

        const newElement = {
            ...temporaryFormdata['start']
        }

        if (rightnow < newDate._d.valueOf().toString()) {
            newElement.value = newDate._d.valueOf().toString();

            let validData = validate(newElement, formdata);
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1];
            newElement.touched = true;
            temporaryFormdata['start'] = newElement;
            formdataHandler(temporaryFormdata);
        } else {
            formErrorHandler(true);
            errorMessageHandler('Please input greater date')
        }
        
    }

    // const searchForm = () => {
    //     searchmodeHandler(true)
    // }
    // const onMouseEnter = () => {
    //     dontblurHandler(true)
    // }
    // const onMouseLeave = () => {
    //     dontblurHandler(false)
    // }
    // const hideprofilemenu = () => {
    //     searchmodeHandler(false)
    // }

    const goBackToTable = () => {
        props.history.push('/admin/master/league');
    }

    // const selectedItem = (data, whichdata) => {
    //     var newFormdata = formdata;
    //     const temporaryFormdata = {
    //         ...newFormdata
    //     }

    //     const newElement = {
    //         ...temporaryFormdata[whichdata]
    //     }
    //     newElement.value = data.value;
    //     newElement.selectedValue = data.name;
    //     temporaryFormdata[whichdata] = newElement;
    //     formdataHandler(temporaryFormdata);
    //     formErrorHandler(false);
    //     if (whichdata === 'private') {
    //         searchmodeHandler(false);
    //         dontblurHandler(false);
    //     }
    // }

    // const showLinks = (type, whichdata) => {
    //     let list = [];

    //     if (type && type.length > 0) {
    //         type.forEach((item) => {
    //             list.push(item)
    //         });
    //     }

    //     return list.map((item, i) => (
    //         <li
    //             key={i}
    //             onClick={() => selectedItem(item, whichdata)}
    //             className="listgroupitem"
    //         >
    //             <span className="memberHeaderLink">
    //                 {item.name.replace(/^\w/, c => c.toUpperCase())}
    //             </span>

    //         </li>
    //     ))
    // }

    const submitData = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit = generateData(formdata, 'league');
        let formIsValid = isFormValid(formdata, 'league');

        if (formIsValid) {
            dispatch(addLeague(dataToSubmit)).then(response => {
                if (response.payload.success) {
                    dispatch(clearLeague());
                    formSuccessHandler(true);
                    props.history.push('/admin/master/league/');
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
                                <label className="col-md-2 col-xs-12 colFormLabel p0">{formdata.info.title}</label>
                                <div className="col-md-10 col-xs-12 p0">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faListUl}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    <FormField
                                        id={'info'}
                                        formdata={formdata.info}
                                        change={(element) => updateForm(element)}
                                        myclass={'form-control'}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 col-xs-12 pb25">
                                <label className="col-md-2 col-xs-12 colFormLabel p0">{formdata.rules.title}</label>
                                <div className="col-md-10 col-xs-12 p0">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faKey}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    <FormField
                                        id={'rules'}
                                        formdata={formdata.rules}
                                        change={(element) => updateForm(element)}
                                        myclass={'form-control'}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 col-xs-12 pb25">
                                <label className="col-md-2 col-xs-12 colFormLabel p0">{formdata.start.title}</label>
                                <div className="col-md-10 col-xs-12 p0">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faAlignLeft}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    <Datetime
                                        defaultValue={formdata.start.value}
                                        onChange={datehandleChange}
                                        closeOnSelect={true}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 col-xs-12 pb25">
                                <label className="col-md-2 col-xs-12 colFormLabel p0">{formdata.accountnumber.title}</label>
                                <div className="col-md-10 col-xs-12 p0">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faFont}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    <FormField
                                        id={'accountnumber'}
                                        formdata={formdata.accountnumber}
                                        change={(element) => updateForm(element)}
                                        myclass={'form-control'}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 col-xs-12 pb25">
                                <label className="col-md-2 col-xs-12 colFormLabel p0">{formdata.accountname.title}</label>
                                <div className="col-md-10 col-xs-12 p0">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faFont}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    <FormField
                                        id={'accountname'}
                                        formdata={formdata.accountname}
                                        change={(element) => updateForm(element)}
                                        myclass={'form-control'}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 col-xs-12 pb25">
                                <label className="col-md-2 col-xs-12 colFormLabel p0">{formdata.bank.title}</label>
                                <div className="col-md-10 col-xs-12 p0">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faFont}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    <FormField
                                        id={'bank'}
                                        formdata={formdata.bank}
                                        change={(element) => updateForm(element)}
                                        myclass={'form-control'}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 col-xs-12 pb25">
                                <label className="col-md-2 col-xs-12 colFormLabel p0">{formdata.amount.title}</label>
                                <div className="col-md-10 col-xs-12 p0">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faFont}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    <FormField
                                        id={'amount'}
                                        formdata={formdata.amount}
                                        change={(element) => updateForm(element)}
                                        myclass={'form-control'}
                                    />
                                </div>
                            </div>
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
                                    Submit League
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MasterLeagueTable;