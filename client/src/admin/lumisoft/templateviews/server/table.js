import React, { 
    useState
    // useEffect 
} from 'react';
import {
    // useSelector,
    useDispatch
} from 'react-redux';

import FormField from '../../utils/form/formfield';
import { update, generateData, isFormValid } from '../../utils/form/formactions';
import {
    addServers,
    clearServers,
    updateServers,
    clearUpdateServers
} from '../../../store/actions/server_action';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faAlignLeft, faFont, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import {
    faAddressCard
} from '@fortawesome/free-regular-svg-icons';

library.add(faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faAddressCard, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faHandshake)


const ServersTableScreen = (props) => {
    // const { getalldata } = useSelector(state => ({
    //     getalldata: state.user
    // }))
    const { dataselected, editformdatastatus } = props;
    const dispatch = useDispatch();
    const [formError, formErrorHandler] = useState(false);
    const [formSuccess, formSuccessHandler] = useState(false);
    const [errorMessage, errorMessageHandler] = useState('DATA INVALID, PLEASE RECHECK!');
    const [formdata, formdataHandler] = useState({
        name: {
            element: 'input',
            title: 'Title',
            value: editformdatastatus ? dataselected.name : '',
            config: {
                name: 'nameInput',
                type: 'text',
                placeholder: 'Enter title'
            },
            validation: {
                required: true
            },
            valid: editformdatastatus ? true : false,
            touched: editformdatastatus ? true : false,
            validationMessage: ''
        },
        subname: {
            element: 'input',
            title: 'Description',
            value: editformdatastatus ? dataselected.subname : '',
            config: {
                name: 'nameInput',
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
        ipaddress: {
            element: 'input',
            title: 'IP Address',
            value: editformdatastatus ? dataselected.ipaddress : '',
            config: {
                name: 'ipaddressInput',
                type: 'text',
                placeholder: 'Enter ipaddress'
            },
            validation: {
                required: false
            },
            valid: true,
            touched: true,
            validationMessage: ''
        },
        gotv: {
            element: 'input',
            title: 'GOTV',
            value: editformdatastatus ? dataselected.gotv : '',
            config: {
                name: 'gotvInput',
                type: 'text',
                placeholder: 'Enter gotv'
            },
            validation: {
                required: false
            },
            valid: true,
            touched: true,
            validationMessage: ''
        },
    });

    const updateForm = (element) => {
        const newFormdata = update(element, formdata, 'Servers');
        formErrorHandler(false)
        formdataHandler(newFormdata)
    }

    const goBackToTable = () => {
        props.history.push('/admin/servers');
    }

    const submitData = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit = generateData(formdata, 'Servers');
        let formIsValid = isFormValid(formdata, 'Servers');

        if (formIsValid) {
            dispatch(addServers(dataToSubmit)).then(response => {
                if (response.payload.success) {
                    dispatch(clearServers());
                    formSuccessHandler(true);
                    props.history.push('/admin/servers');
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

    const submitEditData = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit2 = generateData(formdata, 'Serversedit');
        let formIsValid2 = isFormValid(formdata, 'Serversedit');

        const totaldataToSubmit = {
            ...dataToSubmit2,
            _id: dataselected._id,
        }
        if (formIsValid2) {
            dispatch(updateServers(totaldataToSubmit)).then(response => {
                if (response.payload.success) {
                    dispatch(clearUpdateServers());
                    formSuccessHandler(true);
                    props.history.push('/admin/servers');
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
        
        // let datachange = 0;
        // for (let key1 in dataselected) {
        //     if (key1 === "name" || key1 === "subname" || key1 === "ipaddress" || key1 === "gotv") {
        //         if (dataselected[key1].toString() === dataToSubmit2[key1].toString()) {
        //             datachange = datachange + 1;
        //         }
        //     } else {
        //         if (dataselected[key1] === dataToSubmit2[key1]) {
        //             datachange = datachange + 1;
        //         }
        //     }
        // }
        // if (datachange === 3) {
        //     formErrorHandler(true);
        //     props.loadingtableHandler(false);
        //     errorMessageHandler('CHANGE DATA BEFORE SUBMIT!');
        // } else {
        //     const totaldataToSubmit = {
        //         ...dataToSubmit2,
        //         _id: dataselected._id,
        //     }
        //     if (formIsValid2) {
        //         dispatch(updateServers(totaldataToSubmit)).then(response => {
        //             if (response.payload.success) {
        //                 dispatch(clearUpdateServers());
        //                 formSuccessHandler(true);
        //                 props.history.push('/admin/servers');
        //             } else {
        //                 formErrorHandler(true);
        //                 props.loadingtableHandler(false);
        //                 errorMessageHandler(response.payload.message);
        //             }
        //         })
        //     } else {
        //         formErrorHandler(true);
        //         props.loadingtableHandler(false);
        //         errorMessageHandler('DATA INVALID, PLEASE RECHECK!');
        //     }
        // }
    }
    return (
        <div className="cardBody formstyle">
            <div className="row pb25">
                <label className="col-md-2 col-xs-12 colFormLabel">{formdata.name.title}</label>
                <div className="col-md-10 col-xs-12">
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
            <div className="row pb25">
                <label className="col-md-2 col-xs-12 colFormLabel">{formdata.subname.title}</label>
                <div className="col-md-10 col-xs-12">
                    <div className="iconPosition">
                        <FontAwesomeIcon
                            icon={faAlignLeft}
                            className="icon agraicon"
                        />
                    </div>
                    <FormField
                        id={'subname'}
                        formdata={formdata.subname}
                        change={(element) => updateForm(element)}
                        myclass={'form-control'}
                    />
                </div>
            </div>
            <div className="row pb25">
                <label className="col-md-2 col-xs-12 colFormLabel">{formdata.ipaddress.title}</label>
                <div className="col-md-10 col-xs-12">
                    <div className="iconPosition">
                        <FontAwesomeIcon
                            icon={faAlignLeft}
                            className="icon agraicon"
                        />
                    </div>
                    <FormField
                        id={'ipaddress'}
                        formdata={formdata.ipaddress}
                        change={(element) => updateForm(element)}
                        myclass={'form-control'}
                    />
                </div>
            </div>
            <div className="row pb25">
                <label className="col-md-2 col-xs-12 colFormLabel">{formdata.gotv.title}</label>
                <div className="col-md-10 col-xs-12">
                    <div className="iconPosition">
                        <FontAwesomeIcon
                            icon={faAlignLeft}
                            className="icon agraicon"
                        />
                    </div>
                    <FormField
                        id={'gotv'}
                        formdata={formdata.gotv}
                        change={(element) => updateForm(element)}
                        myclass={'form-control'}
                    />
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
                            onClick={editformdatastatus ? (event) => submitEditData(event) : (event) => submitData(event)}
                            className="formsubmitButton formsubmitButtonShadow buttonColor"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServersTableScreen;