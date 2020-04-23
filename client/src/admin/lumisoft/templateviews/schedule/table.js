import React, {
    useState,
    useRef,
    useEffect
} from 'react';
import {
    useSelector,
    useDispatch
} from 'react-redux';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css'
import FormField from '../../utils/form/formfield';
import moment from 'moment';
import { update, validate, generateData, isFormValid } from '../../utils/form/formactions';
import {
    getTeams,
    getSchedules,
    updateSchedule,
    clearUpdateSchedule
} from '../../../store/actions/league_action';
import {
    getServers
} from '../../../store/actions/server_action';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faAlignLeft, faFont, faChevronLeft, faSortAlphaDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import {
    faAddressCard
} from '@fortawesome/free-regular-svg-icons';

library.add(faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faAddressCard, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faHandshake)


const SchedulesTableScreen = (props) => {
    const { getalldata, getallservers } = useSelector(state => ({
        getalldata: state.league,
        getallservers: state.servers
    }))
    const { dataselected, editformdatastatus } = props;
    const [temporarydataselected] = useState(dataselected);
    const dispatch = useDispatch();
    const [formError, formErrorHandler] = useState(false);
    const [formSuccess, formSuccessHandler] = useState(false);
    const [errorMessage, errorMessageHandler] = useState('DATA INVALID, PLEASE RECHECK!');
    const [formdata, formdataHandler] = useState({
        currentserver: {
            element: 'select',
            title: 'Server',
            value: editformdatastatus ? temporarydataselected.currentserver._id : '',
            config: {
                name: 'serverInput',
                options: [],
                placeholder: editformdatastatus ? `${temporarydataselected.currentserver.name} ${temporarydataselected.currentserver.ipaddress}` : 'Choose Server'
            },
            validation: {
                required: true
            },
            valid: editformdatastatus ? true : false,
            touched: editformdatastatus ? true : false,
            validationMessage: ''
        },
        teamleft: {
            element: 'select',
            title: 'Team Left',
            value: editformdatastatus ? temporarydataselected.teamleft._id : '',
            config: {
                name: 'teamleftInput',
                options: [],
                placeholder: editformdatastatus ? temporarydataselected.teamleft.name : 'Choose Team Left',
            },
            validation: {
                required: true
            },
            valid: editformdatastatus ? true : false,
            touched: editformdatastatus ? true : false,
            validationMessage: ''
        },
        teamright: {
            element: 'select',
            title: 'Team Right',
            value: editformdatastatus ? temporarydataselected.teamright._id : '',
            config: {
                name: 'teamrightInput',
                options: [],
                placeholder: editformdatastatus ? temporarydataselected.teamright.name : 'Choose Team Right'
            },
            validation: {
                required: true
            },
            valid: editformdatastatus ? true : false,
            touched: editformdatastatus ? true : false,
            validationMessage: ''
        },
        start: {
            element: 'input',
            title: 'Start Schedule date',
            value: editformdatastatus ? moment(temporarydataselected.start, 'x').format('LLLL') : 'Choose date',
            config: {
                name: 'startscheduleInput',
                type: 'text',
                placeholder: 'Choose date'
            },
            validation: {
                required: true
            },
            valid: editformdatastatus ? true : false,
            touched: editformdatastatus ? true : false,
            validationMessage: ''
        },
    });
    const [alldata, alldataHandler] = useState([]);
    const [allteam, allteamHandler] = useState([]);
    const [allserver, allserverHandler] = useState([]);
    const [schedulesearchresult, schedulesearchresultHandler] = useState([]);
    const [teamsearchresult, teamsearchresultHandler] = useState([]);

    const [scheduledontblur, scheduledontblurHandler] = useState(false);
    const [schedulesearchmode, schedulesearchmodeHandler] = useState(false);

    const [teamleft, teamleftHandler] = useState(false);
    const [dontblurteamleft, dontblurteamleftHandler] = useState(false);

    const [teamright, teamrightHandler] = useState(false);
    const [dontblurteamright, dontblurteamrightHandler] = useState(false);

    const [chooseserver, chooseserverHandler] = useState(false);
    const [dontblurchooseserver, dontblurchooseserverHandler] = useState(false);

    const [searchteam, searchteamHandler] = useState("");

    useEffect(() => {
        dispatch(getSchedules());
        dispatch(getTeams());
        dispatch(getServers());
    }, [dispatch])
    useEffect(() => {
        if (getalldata.getSchedules && getalldata.getSchedules.success) {
            let totaldata = getalldata.getSchedules.schedules.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            alldataHandler(totaldata);
            schedulesearchresultHandler(totaldata);
        }
        if (getalldata.getTeams && getalldata.getTeams.success) {
            let totaldata = getalldata.getTeams.teams.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            allteamHandler(totaldata);
            teamsearchresultHandler(totaldata);
        }
        if (getallservers.getServers && getallservers.getServers.success) {
            let totalserver = getallservers.getServers.servers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            allserverHandler(totalserver);
        }
    }, [getalldata, getallservers])
    useEffect(() => {
        if (allteam) {
            const results = allteam.filter(result =>
                result.name.toLowerCase().includes(searchteam.toLowerCase())
            );
            teamsearchresultHandler(results);
        }

    }, [allteam, searchteam]);

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

        newElement.value = newDate._d.valueOf().toString();

        let validData = validate(newElement, formdata);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
        newElement.touched = true;
        temporaryFormdata['start'] = newElement;
        formdataHandler(temporaryFormdata);
    }

    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////TEAM LEFT///////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    const searchFormTeamLeft = () => {
        teamleftHandler(true);
    }
    const onMouseEnterTeamLeft = () => {
        dontblurteamleftHandler(true)
    }
    const onMouseLeaveTeamLeft = () => {
        dontblurteamleftHandler(false)
    }
    const hideprofilemenuteamleft = () => {
        teamleftHandler(false)
    }
    // const handleChange = (event) => {
    //     searchteamHandler(event.target.value);
    // }
    /////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////TEAM RIGHT//////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    const searchFormTeamRight = () => {
        teamrightHandler(true);
    }
    const onMouseEnterTeamRight = () => {
        dontblurteamrightHandler(true)
    }
    const onMouseLeaveTeamRight = () => {
        dontblurteamrightHandler(false)
    }
    const hideprofilemenuteamright = () => {
        teamrightHandler(false)
    }
    // const handleChange = (event) => {
    //     searchteamHandler(event.target.value);
    // }
    /////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////SERVER////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    const searchFormChooseServer = () => {
        chooseserverHandler(true);
    }
    const onMouseEnterChooseServer = () => {
        dontblurchooseserverHandler(true)
    }
    const onMouseLeaveChooseServer = () => {
        dontblurchooseserverHandler(false)
    }
    const hideprofilemenuchooseserver = () => {
        chooseserverHandler(false)
    }
    // const handleChange = (event) => {
    //     searchteamHandler(event.target.value);
    // }
    /////////////////////////////////////////////////////////////////////////////

    const selectedItemChooseServer = (data, whichdata) => {
        var newFormdata = formdata;
        const temporaryFormdata = {
            ...newFormdata
        }

        const newElement = {
            ...temporaryFormdata[whichdata]
        }

        newElement.value = data._id;
        newElement.config.placeholder = `${data.name} ${data.ipaddress}`;
        newElement.selectedValue = `${data.name.replace(/^\w/, c => c.toUpperCase())} ${data.ipaddress}`;
        let validData = validate(newElement, newFormdata);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
        temporaryFormdata[whichdata] = newElement;
        formdataHandler(temporaryFormdata);
        formErrorHandler(false);
        chooseserverHandler(false);
        dontblurchooseserverHandler(false);
    }

    const selectedItemTeamRight = (data, whichdata) => {
        var newFormdata = formdata;
        const temporaryFormdata = {
            ...newFormdata
        }

        const newElement = {
            ...temporaryFormdata[whichdata]
        }

        newElement.value = data._id;
        newElement.config.placeholder = data.name;
        newElement.selectedValue = data.name.replace(/^\w/, c => c.toUpperCase());
        let validData = validate(newElement, newFormdata);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
        temporaryFormdata[whichdata] = newElement;
        formdataHandler(temporaryFormdata);
        formErrorHandler(false);
        teamrightHandler(false);
        dontblurteamrightHandler(false);
    }

    const selectedItemTeamLeft = (data, whichdata) => {
        var newFormdata = formdata;
        const temporaryFormdata = {
            ...newFormdata
        }

        const newElement = {
            ...temporaryFormdata[whichdata]
        }

        newElement.value = data._id;
        newElement.config.placeholder = data.name;
        newElement.selectedValue = data.name.replace(/^\w/, c => c.toUpperCase());
        let validData = validate(newElement, newFormdata);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
        temporaryFormdata[whichdata] = newElement;
        formdataHandler(temporaryFormdata);
        formErrorHandler(false);
        teamleftHandler(false);
        dontblurteamleftHandler(false);
    }

    const showLinks = (type, whichdata, whichfunction) => {
        let list = [];

        if (type && type.length > 0) {
            type.forEach((item) => {
                list.push(item)
            });
        }

        return list.map((item, i) => (
            <li
                key={i}
                onClick={() => whichfunction(item, whichdata)}
                className="listgroupitem"
            >
                <span className="memberHeaderLink">
                    {item.name.replace(/^\w/, c => c.toUpperCase())} {item.ipaddress ? item.ipaddress : null}
                </span>

            </li>
        ))
    }

    const updateForm = (element) => {
        const newFormdata = update(element, formdata, 'leagueteams');
        formErrorHandler(false)
        formdataHandler(newFormdata)
    }

    const goBackToTable = () => {
        props.history.push('/admin/master/schedules');
    }

    const submitEditData = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit2 = generateData(formdata, 'leagueteams');
        let formIsValid2 = isFormValid(formdata, 'leagueteams');

        if (formIsValid2) {
            dispatch(updateSchedule(dataToSubmit2, dataselected._id)).then(response => {
                if (response.payload.success) {
                    dispatch(clearUpdateSchedule());
                    formSuccessHandler(true);
                    props.history.push('/admin/master/schedules')
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
                <label className="col-md-2 col-xs-12 colFormLabel">{formdata.teamleft.title}</label>
                <div className="col-md-10 col-xs-12">
                    <div className="iconPosition">
                        <FontAwesomeIcon
                            icon={faSortAlphaDown}
                            className="icon agraicon"
                        />
                    </div>
                    {
                        teamleft ?
                            <div>
                                <div
                                    onBlur={dontblurteamleft ? null : hideprofilemenuteamleft}
                                    tabIndex={0}
                                >
                                    <input
                                        autoCapitalize="none"
                                        autoComplete="off"
                                        autoCorrect="off"
                                        className="tableSearch"
                                        type="text"
                                        name={formdata.teamleft.title}
                                        placeholder={formdata.teamleft.title}
                                        title={formdata.teamleft.config.placeholder}
                                        value={formdata.teamleft.config.placeholder}
                                        autoFocus={true}
                                    />

                                </div>
                                <ul
                                    className="dropdownmenu listgroup profilemenu"
                                    onMouseEnter={onMouseEnterTeamLeft}
                                    onMouseLeave={onMouseLeaveTeamLeft}
                                >
                                    {showLinks(allteam, 'teamleft', selectedItemTeamLeft)}
                                </ul>
                            </div>
                            :
                            <FormField
                                id={'teamleft'}
                                formdata={formdata.teamleft}
                                options={allteam}
                                change={searchFormTeamLeft}
                                myclass={`${allteam && allteam.length > 0 ? "inputbutton form-control" : "inputbutton form-control disabled"}`}
                            />
                    }
                </div>
            </div>
            <div className="row pb25">
                <label className="col-md-2 col-xs-12 colFormLabel">{formdata.teamright.title}</label>
                <div className="col-md-10 col-xs-12">
                    <div className="iconPosition">
                        <FontAwesomeIcon
                            icon={faSortAlphaDown}
                            className="icon agraicon"
                        />
                    </div>
                    {
                        teamright ?
                            <div>
                                <div
                                    onBlur={dontblurteamright ? null : hideprofilemenuteamright}
                                    tabIndex={0}
                                >
                                    <input
                                        autoCapitalize="none"
                                        autoComplete="off"
                                        autoCorrect="off"
                                        className="tableSearch"
                                        type="text"
                                        name={formdata.teamright.title}
                                        placeholder={formdata.teamright.title}
                                        title={formdata.teamright.config.placeholder}
                                        value={formdata.teamright.config.placeholder}
                                        autoFocus={true}
                                    />

                                </div>
                                <ul
                                    className="dropdownmenu listgroup profilemenu"
                                    onMouseEnter={onMouseEnterTeamRight}
                                    onMouseLeave={onMouseLeaveTeamRight}
                                >
                                    {showLinks(allteam, 'teamright', selectedItemTeamRight)}
                                </ul>
                            </div>
                            :
                            <FormField
                                id={'teamright'}
                                formdata={formdata.teamright}
                                options={allteam}
                                change={searchFormTeamRight}
                                myclass={`${allteam && allteam.length > 0 ? "inputbutton form-control" : "inputbutton form-control disabled"}`}
                            />
                    }
                </div>
            </div>
            <div className="row pb25">
                <label className="col-md-2 col-xs-12 colFormLabel">{formdata.currentserver.title}</label>
                <div className="col-md-10 col-xs-12">
                    <div className="iconPosition">
                        <FontAwesomeIcon
                            icon={faSortAlphaDown}
                            className="icon agraicon"
                        />
                    </div>
                    {
                        chooseserver ?
                            <div>
                                <div
                                    onBlur={dontblurchooseserver ? null : hideprofilemenuchooseserver}
                                    tabIndex={0}
                                >
                                    <input
                                        autoCapitalize="none"
                                        autoComplete="off"
                                        autoCorrect="off"
                                        className="tableSearch"
                                        type="text"
                                        name={formdata.currentserver.title}
                                        placeholder={formdata.currentserver.title}
                                        title={formdata.currentserver.config.placeholder}
                                        value={formdata.currentserver.config.placeholder}
                                        autoFocus={true}
                                    />

                                </div>
                                <ul
                                    className="dropdownmenu listgroup profilemenu"
                                    onMouseEnter={onMouseEnterChooseServer}
                                    onMouseLeave={onMouseLeaveChooseServer}
                                >
                                    {showLinks(allserver, 'currentserver', selectedItemChooseServer)}
                                </ul>
                            </div>
                            :
                            <FormField
                                id={'currentserver'}
                                formdata={formdata.currentserver}
                                options={allserver}
                                change={searchFormChooseServer}
                                myclass={`${allserver && allserver.length > 0 ? "inputbutton form-control" : "inputbutton form-control disabled"}`}
                            />
                    }
                </div>
            </div>
            <div className="row pb25" id="dropzoneforiconposition">
                <label className="col-md-2 col-xs-12 colFormLabel">{formdata.start.title}</label>
                <div className="col-md-10 col-xs-12">
                    <div className="iconPosition" style={{ top: '42%' }}>
                        <FontAwesomeIcon
                            icon={faClock}
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

export default SchedulesTableScreen;