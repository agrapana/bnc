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
    updateTeam, clearUpdateTeam
} from '../../../store/actions/league_action';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faAlignLeft, faFont, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import {
    faAddressCard
} from '@fortawesome/free-regular-svg-icons';

library.add(faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faAddressCard, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faHandshake)


const TeamsTableScreen = (props) => {
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
        }
    });
    const updateForm = (element) => {
        const newFormdata = update(element, formdata, 'leagueteams');
        formErrorHandler(false)
        formdataHandler(newFormdata)
    }

    const goBackToTable = () => {
        props.history.push('/admin/master/teams');
    }

    const submitEditData = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit2 = generateData(formdata, 'leagueteams');
        let formIsValid2 = isFormValid(formdata, 'leagueteams');

        const totaldataToSubmit = {
            ...dataToSubmit2,
            _id: dataselected._id,
        }

        if (formIsValid2) {
            dispatch(updateTeam(totaldataToSubmit)).then(response => {
                if (response.payload.success) {
                    dispatch(clearUpdateTeam());
                    formSuccessHandler(true);
                    props.history.push('/admin/master/teams')
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
                <label className="col-md-12 col-xs-12 colFormLabel">Players</label>
                <div className="col-md-12 col-xs-12">
                    {
                        dataselected && dataselected.players && dataselected.players.length > 0 ?
                            dataselected.players.map((item, index) => (
                                <div key={index}>{item.name}</div>
                            ))
                        : <div>Empty</div>
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
                                EDIT DATA SUCCESS, PLEASE WAIT!
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
                            onClick={(event) => submitEditData(event)}
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

export default TeamsTableScreen;