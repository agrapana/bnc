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
import BackDrop from '../../views/layout/backdrop/tablebackdrop';
import moment from 'moment';
import FormField from '../../utils/form/formfield';
import FileUpload from '../../utils/form/fileuploadimages';
import FileUploadSingle from '../../utils/form/fileuploadsingle';
import FileUploadSingleToLocal from '../../utils/form/fileuploadsingletolocal';
import { update, validate, generateData, isFormValid } from '../../utils/form/formactions';
import {
    updateLeague,
    clearUpdateLeague,
    addTeam,
    clearAddTeam,
    getTeams,
    updateLeagueTeam,
    clearUpdateLeagueTeam,
    updateLeagueSchedule,
    clearUpdateLeagueSchedule
} from '../../../store/actions/league_action';
import {
    getServers
} from '../../../store/actions/server_action';
import { useWindowSize } from '../../../widget/windowsize';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faKey, faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faSortAlphaDown, faAlignLeft, faFont, faChevronLeft, faSortNumericDown, faImage, faFile, faBarcode, faPlus, faCubes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import {
    faAddressCard
} from '@fortawesome/free-regular-svg-icons';

library.add(faKey, faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faAddressCard, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faHandshake, faAlignLeft)



const MasterEditLeagueTable = (props) => {
    const { getalldata, getallservers } = useSelector(state => ({
        getalldata: state.league,
        getallservers: state.servers
    }))
    const size = useWindowSize();
    const isMobile = size.width <= 767.98;
    const useOutsideAlerter = (ref) => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                searchmodeHandler(false);
                teamleftHandler(false);
                teamrightHandler(false);
                chooseserverHandler(false);
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
    const { dataselected, editformdatastatus } = props;
    const [temporarydataselected] = useState(dataselected);
    const dispatch = useDispatch();
    /////////////////////////////////////////////////// FORM DEFAULT ERROR AND MESSAGE HANDLER
    const [formError, formErrorHandler] = useState(false);
    const [formSuccess, formSuccessHandler] = useState(false);
    const [errorMessage, errorMessageHandler] = useState('DATA INVALID, PLEASE RECHECK!');
    /////////////////////////////////////////////////// FORM DEFAULT ERROR AND MESSAGE HANDLER

    const [additionalformError, additionalformErrorHandler] = useState(false);
    const [additionalformSuccess, additionalformSuccessHandler] = useState(false);
    /////////////////////////////////////////////////// TEAM ERROR AND MESSAGE HANDLER
    const [formTeamError, formTeamErrorHandler] = useState(false);
    const [formTeamSuccess, formTeamSuccessHandler] = useState(false);
    const [teamErrorMessage, teamErrorMessageHandler] = useState('TRY AGAIN!!');
    /////////////////////////////////////////////////// TEAM ERROR AND MESSAGE HANDLER

    /////////////////////////////////////////////////// SCHEDULE DEFAULT ERROR AND MESSAGE HANDLER
    const [scheduleformError, scheduleformErrorHandler] = useState(false);
    const [scheduleformSuccess, scheduleformSuccessHandler] = useState(false);
    const [scheduleerrorMessage, scheduleerrorMessageHandler] = useState('DATA INVALID!');
    /////////////////////////////////////////////////// SCHEDULE DEFAULT ERROR AND MESSAGE HANDLER

    const [formdata, formdataHandler] = useState({
        name: {
            element: 'input',
            title: 'Name',
            value: temporarydataselected && temporarydataselected.name,
            config: {
                name: 'nameInput',
                type: 'text',
                placeholder: 'Enter league name'
            },
            validation: {
                required: false
            },
            valid: true,
            touched: true,
            validationMessage: ''
        },
        info: {
            element: 'input',
            title: 'Info',
            value: temporarydataselected && temporarydataselected.info,
            config: {
                name: 'infoInput',
                type: 'text',
                placeholder: 'Enter league information'
            },
            validation: {
                required: false
            },
            valid: true,
            touched: true,
            validationMessage: ''
        },
        rules: {
            element: 'input',
            title: 'Rules',
            value: temporarydataselected && temporarydataselected.rules,
            config: {
                name: 'rulesInput',
                type: 'text',
                placeholder: 'Enter league rules'
            },
            validation: {
                required: false
            },
            valid: true,
            touched: true,
            validationMessage: ''
        },
        start: {
            element: 'input',
            title: 'Start date',
            value: moment(temporarydataselected && temporarydataselected.start, 'x').format('DD MMMM YYYY, HH:mm'),
            config: {
                name: 'startInput',
                type: 'text',
                placeholder: 'Choose date'
            },
            validation: {
                required: false
            },
            valid: true,
            touched: true,
            validationMessage: ''
        },
        accountnumber: {
            element: 'input',
            title: 'Account Number',
            value: temporarydataselected && temporarydataselected.accountnumber,
            config: {
                name: 'accountnumberInput',
                type: 'text',
                placeholder: 'Enter your account number'
            },
            validation: {
                required: false
            },
            valid: true,
            touched: true,
            validationMessage: ''
        },
        accountname: {
            element: 'input',
            title: 'Account Name',
            value: temporarydataselected && temporarydataselected.accountname,
            config: {
                name: 'accountnameInput',
                type: 'text',
                placeholder: 'Enter your account name'
            },
            validation: {
                required: false
            },
            valid: true,
            touched: true,
            validationMessage: ''
        },
        amount: {
            element: 'input',
            title: 'Amount',
            value: temporarydataselected && temporarydataselected.amount,
            config: {
                name: 'amountInput',
                type: 'text',
                placeholder: 'Enter amount'
            },
            validation: {
                required: false
            },
            valid: true,
            touched: true,
            validationMessage: ''
        },
        bank: {
            element: 'input',
            title: 'Bank',
            value: temporarydataselected && temporarydataselected.bank,
            config: {
                name: 'bankInput',
                type: 'text',
                placeholder: 'Enter bank'
            },
            validation: {
                required: false
            },
            valid: true,
            touched: true,
            validationMessage: ''
        },
        teams: {
            element: 'select',
            title: 'Team Name',
            selectedValue: '',
            value: editformdatastatus ? temporarydataselected && dataselected.teams : [],
            config: {
                name: 'teamnameInput',
                options: [],
                placeholder: 'Choose Team'
            },
            validation: {
                required: false
            },
            valid: true,
            touched: true,
            validationMessage: ''
        },
        schedule: {
            element: 'select',
            title: 'League schedule',
            selectedValue: '',
            value: editformdatastatus ? temporarydataselected && dataselected.schedule : [],
            config: {
                name: 'scheduleInput',
                options: [],
                placeholder: 'Choose Schedule'
            },
            validation: {
                required: false
            },
            valid: true,
            touched: true,
            validationMessage: ''
        },
    });
    const [temporaryselectedTeams, temporaryselectedTeamsHandler] = useState({
        teams: {
            element: 'select',
            title: 'Team Name',
            selectedValue: '',
            value: '',
            config: {
                name: 'temporaryteamInput',
                options: [],
                placeholder: 'Choose Team'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        }
    });

    const [formaddteam, formaddteamHandler] = useState({
        name: {
            element: 'input',
            title: 'Team',
            value: '',
            config: {
                name: 'teamInput',
                type: 'text',
                placeholder: 'Enter Team'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        }
    });
    const [formschedule, formscheduleHandler] = useState({
        currentserver: {
            element: 'select',
            title: 'Server',
            value: '',
            config: {
                name: 'serverInput',
                options: [],
                placeholder: 'Choose Server'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        teamleft: {
            element: 'select',
            title: 'Team Left',
            value: '',
            config: {
                name: 'teamleftInput',
                options: [],
                placeholder: 'Choose Team Left'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        teamright: {
            element: 'select',
            title: 'Team Right',
            value: '',
            config: {
                name: 'teamrightInput',
                options: [],
                placeholder: 'Choose Team Right'
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
            title: 'Start Schedule date',
            value: 'Choose date',
            config: {
                name: 'startscheduleInput',
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
    });
    const [alldata, alldataHandler] = useState([]);
    const [allserver, allserverHandler] = useState([]);
    const [searchresult, searchresultHandler] = useState([]);
    const [dontblur, dontblurHandler] = useState(false);
    const [searchmode, searchmodeHandler] = useState(false);
    const [addteams, addteamsHandler] = useState(false);

    const [teamleft, teamleftHandler] = useState(false);
    const [dontblurteamleft, dontblurteamleftHandler] = useState(false);

    const [teamright, teamrightHandler] = useState(false);
    const [dontblurteamright, dontblurteamrightHandler] = useState(false);

    const [chooseserver, chooseserverHandler] = useState(false);
    const [dontblurchooseserver, dontblurchooseserverHandler] = useState(false);

    const [searchteam, searchteamHandler] = useState("");

    useEffect(() => {
        dispatch(getTeams());
        dispatch(getServers());
    }, [dispatch])
    useEffect(() => {
        if (getalldata.getTeams && getalldata.getTeams.success) {
            let totaldata = getalldata.getTeams.teams.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            alldataHandler(totaldata);
            searchresultHandler(totaldata);
        }
        if (getallservers.getServers && getallservers.getServers.success) {
            let totalserver = getallservers.getServers.servers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            allserverHandler(totalserver);
        }
    }, [getalldata, getallservers])
    useEffect(() => {
        if (alldata) {
            const results = alldata.filter(result =>
                result.name.toLowerCase().includes(searchteam.toLowerCase())
            );
            searchresultHandler(results);
        }

    }, [alldata, searchteam]);

    const updateForm = (element) => {
        const newFormdata = update(element, formdata, 'league');
        formErrorHandler(false);
        formdataHandler(newFormdata);
    }
    const additionalUpdateForm = (element) => {
        const newFormdata = update(element, formaddteam, 'additionalcategory');
        additionalformErrorHandler(false);
        formaddteamHandler(newFormdata);
    }

    const datehandleChange = (newDate) => {
        formErrorHandler(false);
        errorMessageHandler('');

        let rightnow = new Date();
        var newFormdata = formschedule;

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
            formscheduleHandler(temporaryFormdata);
        } else {
            formErrorHandler(true);
            errorMessageHandler('Please input greater date')
        }

    }
    /////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////TEAM//////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
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
    const handleChange = (event) => {
        searchteamHandler(event.target.value);
    }
    /////////////////////////////////////////////////////////////////////////////

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
        var newFormdata = formschedule;
        const temporaryFormdata = {
            ...newFormdata
        }

        const newElement = {
            ...temporaryFormdata[whichdata]
        }

        newElement.value = data._id;
        newElement.selectedValue = `${data.name.replace(/^\w/, c => c.toUpperCase())} ${data.ipaddress}`;
        let validData = validate(newElement, newFormdata);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
        temporaryFormdata[whichdata] = newElement;
        formscheduleHandler(temporaryFormdata);
        formErrorHandler(false);
        chooseserverHandler(false);
        dontblurchooseserverHandler(false);
    }

    const selectedItemTeamRight = (data, whichdata) => {
        var newFormdata = formschedule;
        const temporaryFormdata = {
            ...newFormdata
        }

        const newElement = {
            ...temporaryFormdata[whichdata]
        }

        newElement.value = data._id;
        newElement.selectedValue = data.name.replace(/^\w/, c => c.toUpperCase());
        let validData = validate(newElement, newFormdata);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
        temporaryFormdata[whichdata] = newElement;
        formscheduleHandler(temporaryFormdata);
        formErrorHandler(false);
        teamrightHandler(false);
        dontblurteamrightHandler(false);
    }

    const selectedItemTeamLeft = (data, whichdata) => {
        var newFormdata = formschedule;
        const temporaryFormdata = {
            ...newFormdata
        }

        const newElement = {
            ...temporaryFormdata[whichdata]
        }

        newElement.value = data._id;
        newElement.selectedValue = data.name.replace(/^\w/, c => c.toUpperCase());
        let validData = validate(newElement, newFormdata);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
        temporaryFormdata[whichdata] = newElement;
        formscheduleHandler(temporaryFormdata);
        formErrorHandler(false);
        teamleftHandler(false);
        dontblurteamleftHandler(false);
    }

    const selectedItem = (data, whichdata) => {
        var newFormdata = temporaryselectedTeams;
        const temporaryFormdata = {
            ...newFormdata
        }

        const newElement = {
            ...temporaryFormdata[whichdata]
        }

        newElement.value = data._id;
        newElement.selectedValue = data.name.replace(/^\w/, c => c.toUpperCase());
        let validData = validate(newElement, newFormdata);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
        temporaryFormdata[whichdata] = newElement;
        temporaryselectedTeamsHandler(temporaryFormdata);
        searchteamHandler("");
        formErrorHandler(false);
        searchmodeHandler(false);
        dontblurHandler(false);
    }
    const goBackToTable = () => {
        props.history.push('/admin/master/league');
    }

    const AddTeamBackdrop = () => {
        addteamsHandler(true);
        formErrorHandler(false);
    }

    const backdropClickHandler = () => {
        document.body.style.overflow = 'overlay';
        var newFormdata = formaddteam;
        const temporaryFormdata = {
            ...newFormdata
        }

        const newElement = {
            ...temporaryFormdata['name']
        }

        newElement.value = "";
        newElement.valid = false;
        newElement.touched = false;

        temporaryFormdata['name'] = newElement;

        formaddteamHandler(temporaryFormdata);
        addteamsHandler(false);
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

    const AddTeamToLeague = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(temporaryselectedTeams, 'league');
        let formIsValid = isFormValid(temporaryselectedTeams, 'league');

        let totaldatatosubmit = {
            ...dataToSubmit,
            _id: dataselected._id
        }

        if (formIsValid) {
            dispatch(updateLeagueTeam(totaldatatosubmit)).then(response => {
                if (response.payload.success) {
                    dispatch(clearUpdateLeagueTeam());
                    formSuccessHandler(true);
                    props.history.push('/admin/master/league')
                } else {
                    formErrorHandler(true);
                    props.loadingtableHandler(false);
                    errorMessageHandler(response.payload.message);
                }
            })
        } else {

        }
    }

    const AddScheduleToLeague = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit = generateData(formschedule, 'leagueschedule');
        let formIsValid = isFormValid(formschedule, 'leagueschedule');
        
        let totaldatatosubmit = {
            ...dataToSubmit,
            _id: dataselected._id
        }

        if (formIsValid) {
            dispatch(updateLeagueSchedule(totaldatatosubmit)).then(response => {
                if (response.payload.success) {
                    dispatch(clearUpdateLeagueSchedule());
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

    const submitData = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit = generateData(formdata, 'league');
        let formIsValid = isFormValid(formdata, 'league');

        if (formIsValid) {
            dispatch(updateLeague(dataToSubmit)).then(response => {
                if (response.payload.success) {
                    dispatch(clearUpdateLeague());
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

    const submitTeams = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit = generateData(formaddteam, 'league');
        let formIsValid = isFormValid(formaddteam, 'league');

        if (formIsValid) {
            dispatch(addTeam(dataToSubmit)).then(response => {
                if (response.payload.success) {
                    dispatch(clearAddTeam());
                    formSuccessHandler(true);
                    props.history.push({
                        pathname: '/admin/master/league/editdata',
                        state: {
                            dataselected: dataselected,
                            editformdata: true
                        }
                    })
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
        <div>
            <div className="card">
                <div className="cardTitle verticalCenter">
                    <span>{props.pageTitle}</span>
                </div>
                <div className="cardBody formstyle">
                    <div className="row pb10" id="dropzoneforiconposition">
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
                                        myclass={'form-control disabled'}
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
                                        myclass={'form-control disabled'}
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
                                        myclass={'form-control disabled'}
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
                                        className="disabled"
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
                                        myclass={'form-control disabled'}
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
                                        myclass={'form-control disabled'}
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
                                        myclass={'form-control disabled'}
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
                                        myclass={'form-control disabled'}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 col-xs-12 pb25">
                                <label className="col-md-2 col-xs-12 colFormLabel p0">{formaddteam.name.title}</label>
                                <div className="col-md-9 col-xs-8 paddingRight pl0">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faSortAlphaDown}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    {
                                        searchmode ?
                                            <div>
                                                <div
                                                    onBlur={dontblur ? null : hideprofilemenu}
                                                    tabIndex={0}
                                                >
                                                    <input
                                                        autoCapitalize="none"
                                                        autoComplete="off"
                                                        autoCorrect="off"
                                                        className="tableSearch"
                                                        type="text"
                                                        name={formaddteam.name.title}
                                                        placeholder={formaddteam.name.title}
                                                        title={formaddteam.name.config.placeholder}
                                                        value={searchteam}
                                                        onChange={(event) => handleChange(event)}
                                                        autoFocus={true}
                                                    />

                                                </div>
                                                <ul
                                                    className="dropdownmenu listgroup profilemenu"
                                                    onMouseEnter={onMouseEnter}
                                                    onMouseLeave={onMouseLeave}
                                                >
                                                    {showLinks(searchresult, 'teams', selectedItem)}
                                                </ul>
                                            </div>


                                            :
                                            <FormField
                                                id={'teams'}
                                                formdata={temporaryselectedTeams.teams}
                                                options={alldata}
                                                change={searchForm}
                                                myclass={`${alldata && alldata.length > 0 ? "inputbutton form-control" : "inputbutton form-control disabled"}`}
                                            />
                                    }


                                </div>
                                <div className="col-md-1 col-xs-4">
                                    <div className="categoryButtonWrapper">
                                        <div
                                            className="categoryButton buttonColor"
                                            style={{ marginRight: '10px' }}
                                            title=""
                                            onClick={(event) => AddTeamToLeague(event)}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                                className="icon agraicon w18px"
                                            />
                                        </div>
                                        <div
                                            className="categoryButton buttonColor"
                                            style={{ marginRight: '0px' }}
                                            title=""
                                            onClick={() => AddTeamBackdrop()}
                                        >
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                className="icon agraicon w18px"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {

                                <div className="col-md-12 col-xs-12 pb25">
                                    <div className="col-md-2"></div>
                                    <div className="col-md-10 col-xs-12 p0">
                                        {
                                            formdata.teams && formdata.teams.value.length > 0 ?
                                                formdata.teams.value.map((item, index) => (
                                                    <span key={index}>{index + 1}. {item.name}<br /></span>
                                                ))
                                                : null
                                        }
                                    </div>
                                </div>
                            }
                            <div className="col-md-12 col-xs-12 pb25">
                                <label className="col-md-2 col-xs-12 colFormLabel p0">{formdata.schedule.title}</label>
                                <div
                                    className="col-md-4 col-xs-12 pl0 pr0"
                                >
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
                                                        name={formschedule.teamleft.title}
                                                        placeholder={formschedule.teamleft.title}
                                                        title={formschedule.teamleft.config.placeholder}
                                                        value={formschedule.teamleft.config.placeholder}
                                                        autoFocus={true}
                                                    />

                                                </div>
                                                <ul
                                                    className="dropdownmenu listgroup profilemenu"
                                                    onMouseEnter={onMouseEnterTeamLeft}
                                                    onMouseLeave={onMouseLeaveTeamLeft}
                                                >
                                                    {showLinks(alldata, 'teamleft', selectedItemTeamLeft)}
                                                </ul>
                                            </div>
                                            :
                                            <FormField
                                                id={'teamleft'}
                                                formdata={formschedule.teamleft}
                                                options={alldata}
                                                change={searchFormTeamLeft}
                                                myclass={`${alldata && alldata.length > 0 ? "inputbutton form-control" : "inputbutton form-control disabled"}`}
                                            />
                                    }
                                </div>
                                <div
                                    className="col-md-1 col-xs-12"
                                    style={{ textAlign: 'center' }}
                                >
                                    vs
                                </div>
                                <div className="col-md-4 col-xs-12 pl0 pr0">
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
                                                        name={formschedule.teamright.title}
                                                        placeholder={formschedule.teamright.title}
                                                        title={formschedule.teamright.config.placeholder}
                                                        value={formschedule.teamright.config.placeholder}
                                                        autoFocus={true}
                                                    />

                                                </div>
                                                <ul
                                                    className="dropdownmenu listgroup profilemenu"
                                                    onMouseEnter={onMouseEnterTeamRight}
                                                    onMouseLeave={onMouseLeaveTeamRight}
                                                >
                                                    {showLinks(alldata, 'teamright', selectedItemTeamRight)}
                                                </ul>
                                            </div>
                                            :
                                            <FormField
                                                id={'teamright'}
                                                formdata={formschedule.teamright}
                                                options={alldata}
                                                change={searchFormTeamRight}
                                                myclass={`${alldata && alldata.length > 0 ? "inputbutton form-control" : "inputbutton form-control disabled"}`}
                                            />
                                    }

                                </div>
                            </div>
                            <div className="col-md-12 col-xs-12 pb25">
                                <label className="col-md-2 col-xs-12 colFormLabel p0"></label>
                                <div className="col-md-4 col-xs-12 pl0 pr0">
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
                                                        name={formschedule.currentserver.title}
                                                        placeholder={formschedule.currentserver.title}
                                                        title={formschedule.currentserver.config.placeholder}
                                                        value={formschedule.currentserver.config.placeholder}
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
                                                formdata={formschedule.currentserver}
                                                options={allserver}
                                                change={searchFormChooseServer}
                                                myclass={`${allserver && allserver.length > 0 ? "inputbutton form-control" : "inputbutton form-control disabled"}`}
                                            />
                                    }

                                </div>
                                <div className={isMobile ? "col-md-3 col-xs-9 p0" : "col-md-3 col-xs-9"}>
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faClock}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    <Datetime
                                        defaultValue={formschedule.start.value}
                                        onChange={datehandleChange}
                                        closeOnSelect={true}
                                    />
                                </div>
                                <div className="col-md-1 col-xs-3">
                                    <div className="categoryButtonWrapper">
                                        <div
                                            className="categoryButton buttonColor"
                                            style={{ marginRight: '10px' }}
                                            title=""
                                            onClick={(event) => AddScheduleToLeague(event)}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                                className="icon agraicon w18px"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {

                                <div className="col-md-12 col-xs-12 pb25">
                                    <div className="col-md-2"></div>
                                    <div className="col-md-10 col-xs-12 p0">
                                        {
                                            formdata.schedule && formdata.schedule.value.length > 0 ?
                                                formdata.schedule.value.map((item, index) => (
                                                    <div key={index} style={{ marginBottom: '10px' }}>{index + 1}. {moment(item.start, 'x').format('LLLL')}<br/>{item.teamleft.name} vs {item.teamright.name}<br/>{item.currentserver.name} {item.currentserver.ipaddress}<br /></div>
                                                ))
                                                : null
                                        }
                                    </div>
                                </div>
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
                                    Submit League
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    addteams &&
                    <BackDrop click={backdropClickHandler} />
                }
            </div>

            <div className={addteams ? "rightSideOption open" : "rightSideOption"}>
                {
                    addteams ?
                        <div className="actionTitle">
                            <div className="actionTitleText">Add Team</div>
                        </div>
                        : null

                }
                {
                    addteams ?
                        <div className="additionalformstyle pb20">
                            <div className="row" style={{
                                padding: "0 15px 25px 15px"
                            }}>
                                <label
                                    className="col-md-12 col-xs-12 colFormLabel"
                                    style={{
                                        paddingBottom: 0
                                    }}
                                >{formaddteam.name.title}</label>
                                <div className="col-md-12 col-xs-12">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faCubes}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    <FormField
                                        id={'name'}
                                        formdata={formaddteam.name}
                                        change={(element) => additionalUpdateForm(element)}
                                        myclass={'form-control'}
                                    />
                                </div>
                            </div>
                        </div>
                        : null
                }
                {
                    addteams ?
                        <div className="additionalformstyle">
                            <div className="row" style={{
                                padding: "0 15px"
                            }}>
                                <div className="col-md-12">
                                    <div className="formSubmitButtonWithBack">
                                        <button
                                            onClick={(event) => submitTeams(event)}
                                            className="formbackButton formsubmitButtonShadow buttonColor"
                                        >
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                className="icon agraicon w18px"
                                            />
                                            &nbsp;Add Team
                                        </button>
                                    </div>
                                </div>
                                {
                                    additionalformError ?
                                        <div className="errorAddCategory">
                                            {errorMessage}
                                        </div>
                                        : additionalformSuccess ?
                                            <div className="successAddCategory">
                                                ADD SUCCESS, PLEASE WAIT!
                                            </div>
                                            : null
                                }
                            </div>
                        </div>
                        : null
                }
            </div>
        </div>
    );
}

export default MasterEditLeagueTable;