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
    clearUpdateSchedule,
    addResult,
    clearAddResult,
    updateResult,
    clearUpdateResult
} from '../../../store/actions/league_action';
import {
    getServers
} from '../../../store/actions/server_action';
import BackDrop from '../../views/layout/backdrop/tablebackdrop';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faAlignLeft, faFont, faChevronLeft, faSortAlphaDown, faPlus, faCubes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import {
    faAddressCard
} from '@fortawesome/free-regular-svg-icons';

library.add(faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faAddressCard, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faHandshake, faCubes, faAlignLeft, faFont)


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
            value: editformdatastatus ? temporarydataselected && temporarydataselected.currentserver._id : '',
            config: {
                name: 'serverInput',
                options: [],
                placeholder: editformdatastatus ? `${temporarydataselected && temporarydataselected.currentserver.name} ${temporarydataselected && temporarydataselected.currentserver.ipaddress}` : 'Choose Server'
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
            value: editformdatastatus ? temporarydataselected && temporarydataselected.teamleft._id : '',
            config: {
                name: 'teamleftInput',
                options: [],
                placeholder: editformdatastatus ? temporarydataselected && temporarydataselected.teamleft.name : 'Choose Team Left',
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
            value: editformdatastatus ? temporarydataselected && temporarydataselected.teamright._id : '',
            config: {
                name: 'teamrightInput',
                options: [],
                placeholder: editformdatastatus ? temporarydataselected && temporarydataselected.teamright.name : 'Choose Team Right'
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
            value: editformdatastatus ? moment(temporarydataselected && temporarydataselected.start, 'x').format('LLLL') : 'Choose date',
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

    /////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////RESULT///////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////
    const [formresult, formresultHandler] = useState({
        map: {
            element: 'select',
            title: 'Map',
            value: '',
            config: {
                name: 'mapInput',
                options: [
                    { value: 'DE_DUST2', name: 'DE_DUST2' },
                    { value: 'DE_INFERNO', name: 'DE_INFERNO' },
                    { value: 'DE_MIRAGE', name: 'DE_MIRAGE' },
                    { value: 'DE_CACHE', name: 'DE_CACHE' },
                    { value: 'DE_TRAIN', name: 'DE_TRAIN' },
                    { value: 'DE_OVERPASS', name: 'DE_OVERPASS' },
                    { value: 'DE_VERTIGO', name: 'DE_VERTIGO' },
                    { value: 'DE_NUKE', name: 'DE_NUKE' },
                ],
                placeholder: 'Choose Map'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        teamleftscore: {
            element: 'input',
            title: 'Teamleft Score',
            value: "",
            config: {
                name: 'teamleftscoreInput',
                type: 'text',
                placeholder: 'Final Score'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        teamrightscore: {
            element: 'input',
            title: 'Teamright Score',
            value: "",
            config: {
                name: 'teamrightscoreInput',
                type: 'text',
                placeholder: 'Final Score'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        // teamleftplayers: {
        //     element: 'input',
        //     title: 'Teamleft Players',
        //     value: [],
        //     config: {
        //         name: 'teamleftplayersInput',
        //         type: 'text',
        //         placeholder: 'Teamleft Players'
        //     },
        //     validation: {
        //         required: true
        //     },
        //     valid: false,
        //     touched: false,
        //     validationMessage: ''
        // },
        // teamrightplayers: {
        //     element: 'input',
        //     title: 'Teamright Players',
        //     value: [],
        //     config: {
        //         name: 'teamrightplayersInput',
        //         type: 'text',
        //         placeholder: 'Teamright Players'
        //     },
        //     validation: {
        //         required: true
        //     },
        //     valid: false,
        //     touched: false,
        //     validationMessage: ''
        // },
    });
    /////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////PLAYER///////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////
    const [formplayer, formplayerHandler] = useState({
        kill: {
            element: 'input',
            title: 'Kill',
            value: "",
            config: {
                name: 'killInput',
                type: 'text',
                placeholder: 'Kill'
            },
            validation: {
                required: true,
                number: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        death: {
            element: 'input',
            title: 'Death',
            value: "",
            config: {
                name: 'deathInput',
                type: 'text',
                placeholder: 'Death'
            },
            validation: {
                required: true,
                number: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        assist: {
            element: 'input',
            title: 'Assist',
            value: "",
            config: {
                name: 'assistInput',
                type: 'text',
                placeholder: 'Assist'
            },
            validation: {
                required: true,
                number: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        mvp: {
            element: 'input',
            title: 'MVP',
            value: "",
            config: {
                name: 'mvpInput',
                type: 'text',
                placeholder: 'MVP'
            },
            validation: {
                required: true,
                number: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        score: {
            element: 'input',
            title: 'Score',
            value: "",
            config: {
                name: 'scoreInput',
                type: 'text',
                placeholder: 'Score'
            },
            validation: {
                required: true,
                number: true
            },
            valid: false,
            touched: false,
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

    const [addresult, addresultHandler] = useState(false);
    const [choosemap, choosemapHandler] = useState(false);
    const [dontblurchoosemap, dontblurchoosemapHandler] = useState(false);

    const [teamleft, teamleftHandler] = useState(false);
    const [dontblurteamleft, dontblurteamleftHandler] = useState(false);

    const [teamright, teamrightHandler] = useState(false);
    const [dontblurteamright, dontblurteamrightHandler] = useState(false);

    const [chooseserver, chooseserverHandler] = useState(false);
    const [dontblurchooseserver, dontblurchooseserverHandler] = useState(false);

    const [searchteam, searchteamHandler] = useState("");

    const [additionalformError, additionalformErrorHandler] = useState(false);
    const [additionalformSuccess, additionalformSuccessHandler] = useState(false);

    const [addstatistic, addstatisticHandler] = useState(false);
    const [selectedplayer, selectedplayerHandler] = useState({});
    const [statisticformError, statisticformErrorHandler] = useState(false);
    const [statisticformSuccess, statisticformSuccessHandler] = useState(false);
    const [thisisteamleft, thisisteamleftHandler] = useState(false);
    const [selectedResult, selectedResultHandler] = useState();

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

    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////MAP/////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    const searchFormChooseMap = () => {
        choosemapHandler(true);
    }
    const onMouseEnterChooseMap = () => {
        dontblurchoosemapHandler(true)
    }
    const onMouseLeaveChooseMap = () => {
        dontblurchoosemapHandler(false)
    }
    const hideprofilemenuchoosemap = () => {
        choosemapHandler(false)
    }
    // const handleChange = (event) => {
    //     searchteamHandler(event.target.value);
    // }
    /////////////////////////////////////////////////////////////////////////////

    const selectedItemChooseMap = (data, whichdata) => {
        var newFormdata = formresult;
        const temporaryFormdata = {
            ...newFormdata
        }

        const newElement = {
            ...temporaryFormdata[whichdata]
        }

        newElement.value = data.value;
        newElement.config.placeholder = data.name;
        let validData = validate(newElement, newFormdata);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
        temporaryFormdata[whichdata] = newElement;
        formresultHandler(temporaryFormdata);
        formErrorHandler(false);
        choosemapHandler(false);
        dontblurchoosemapHandler(false);
    }

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

    const fetchingnewData = async (id) => {
        let selected = await dispatch(getSchedules());
        let final = await selected.payload.schedules.find(site => site._id === id);

        props.history.push({
            pathname: '/admin/master/schedules/editdata',
            state: {
                dataselected: final
            }
        })
    }

    const submitEditData = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit2 = generateData(formdata, 'leagueteams');
        let formIsValid2 = isFormValid(formdata, 'leagueteams');
        let dataselectedid = temporarydataselected._id;

        if (formIsValid2) {
            dispatch(updateSchedule(dataToSubmit2, dataselected._id)).then(response => {
                if (response.payload.success) {
                    dispatch(clearUpdateSchedule());
                    formSuccessHandler(true);
                    fetchingnewData(dataselectedid);
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

    const _addResults = () => {
        addresultHandler(true);
        formErrorHandler(false);
        additionalformErrorHandler(false);
    }

    const additionalUpdateForm = (element) => {
        const newFormdata = update(element, formresult, 'additional');
        additionalformErrorHandler(false);
        formresultHandler(newFormdata);
    }

    const statisticUpdateForm = (element) => {
        const newFormdata = update(element, formplayer, 'statistic');
        statisticformErrorHandler(false);
        formplayerHandler(newFormdata);
    }

    const backdropClickHandler = () => {
        document.body.style.overflow = 'overlay';
        var newFormdata = { ...formresult };

        for (let key in newFormdata) {
            if (key === 'map') {
                newFormdata[key].config.placeholder = 'Choose Map';
                newFormdata[key].value = '';
                newFormdata[key].valid = false;
                newFormdata[key].touched = false;
                newFormdata[key].validationMessage = '';
            } else {
                newFormdata[key].value = '';
                newFormdata[key].valid = false;
                newFormdata[key].touched = false;
                newFormdata[key].validationMessage = '';
            }
        }

        formresultHandler(newFormdata);
        addresultHandler(false);
        additionalformErrorHandler(false);
    }

    const backdropStatisticClickHandler = () => {

        document.body.style.overflow = 'overlay';
        var newFormdata = { ...formplayer };

        for (let key in newFormdata) {
            newFormdata[key].value = '';
            newFormdata[key].valid = false;
            newFormdata[key].touched = false;
            newFormdata[key].validationMessage = '';
        }

        formplayerHandler(newFormdata);
        addstatisticHandler(false);
        statisticformErrorHandler(false);
    }

    const submitAdditionalCategory = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit = generateData(formresult, 'matchresult');
        let formIsValid = isFormValid(formresult, 'matchresult');

        let totaldataToSubmit = {
            map: dataToSubmit.map,
            results: {
                teamleft: {
                    _id: dataselected.teamleft._id,
                    name: dataselected.teamleft.name,
                    score: dataToSubmit.teamleftscore,
                    players: []
                },
                teamright: {
                    _id: dataselected.teamright._id,
                    name: dataselected.teamright.name,
                    score: dataToSubmit.teamrightscore,
                    players: []
                },
            }
        }

        if (formIsValid) {
            dispatch(addResult(totaldataToSubmit, dataselected._id)).then(response => {
                if (response.payload.success) {
                    dispatch(clearAddResult());
                    additionalformSuccessHandler(true);
                    props.history.push('/admin/master/schedules')
                } else {
                    additionalformError(true);
                    props.loadingtableHandler(false);
                    errorMessageHandler(response.payload.message);
                }
            })
        } else {
            additionalformError(true);
            props.loadingtableHandler(false);
            errorMessageHandler('DATA INVALID, PLEASE RECHECK!');
        }
    }

    const _inputStatistic = (player, whichresult, booleanvalue) => {
        addstatisticHandler(true);
        selectedResultHandler(whichresult);
        selectedplayerHandler(player);
        thisisteamleftHandler(booleanvalue)
    }

    const submitStatistic = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit = generateData(formplayer, 'formplayer');
        let formIsValid = isFormValid(formplayer, 'formplayer');
        let dataselectedid = temporarydataselected._id;

        let type = thisisteamleft ? "teamleft" : "teamright";

        let totalDataToSubmit = {
            ...dataToSubmit,
            name: selectedplayer.name,
            extension: selectedplayer.extension,
            phone: selectedplayer.phone,
            steamname: selectedplayer.steamname,
            steamid: selectedplayer.steamid,
            steamavatar: selectedplayer.steamavatar,
            _id: selectedplayer._id
        }

        if (formIsValid) {
            dispatch(updateResult(totalDataToSubmit, dataselected._id, type, selectedResult._id)).then(response => {
                if (response.payload.success) {
                    dispatch(clearUpdateResult());
                    statisticformSuccessHandler(true);
                    fetchingnewData(dataselectedid);
                } else {
                    statisticformErrorHandler(true);
                    props.loadingtableHandler(false);
                    errorMessageHandler(response.payload.message);
                }
            })
        } else {
            statisticformErrorHandler(true);
            props.loadingtableHandler(false);
            errorMessageHandler('COMPLETE DATA!');
        }
    }

    return (
        <div>
            <div className="card">
                <div className="cardTitle verticalCenter">
                    <span>Please edit the information below</span>
                </div>
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
                        <label className="col-md-2 col-xs-12 colFormLabel">Add Results</label>
                        <div className="col-md-10 col-xs-12">
                            <div
                                className="categoryButtonWrapper"
                                style={{ left: 15, justifyContent: 'flex-start' }}
                            >
                                <div
                                    className="categoryButton buttonColor"
                                    onClick={() => _addResults()}
                                >
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        className="icon agraicon"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row pb25">
                        <label className="col-md-2 col-xs-12 colFormLabel"></label>
                        <div className="col-md-10 col-xs-12">
                            {
                                dataselected && dataselected.results && dataselected && dataselected.results.length > 0 ?
                                    dataselected && dataselected.results.map((item, index) => (
                                        <div
                                            key={index}
                                            className="mb50"
                                        >
                                            <div className="leaguemap">MAP {index + 1} : {item.map}</div>
                                            <div className="leagueteamleft">
                                                <div className="leagueteam">{item.results[0].teamleft.name}: <span>{item.results[0].teamleft.score}</span></div>
                                                <ul className="scheduleplayerlists">
                                                    {
                                                        temporarydataselected.teamleft && temporarydataselected.teamleft.players.map((player, i) => (
                                                            <li
                                                                className="scheduleplayer"
                                                                onClick={() => _inputStatistic(player, item, true)}
                                                            >
                                                                {player.steamname.substring(0,10)}
                                                            </li>
                                                        ))
                                                    }
                                                </ul>

                                                {
                                                    item.results[0].teamleft.players.length ?
                                                        <div className="tableResponsiveSm">
                                                            <table className="table">
                                                                {
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Name</th>
                                                                            <th>Nickname</th>
                                                                            <th>Kill</th>
                                                                            <th>Assists</th>
                                                                            <th>Death</th>
                                                                            <th>MVP</th>
                                                                            <th>Score</th>
                                                                        </tr>
                                                                    </thead>
                                                                }
                                                                <tbody>
                                                                    {
                                                                        item.results[0].teamleft.players.sort((a, b) => b.score - a.score).map((player, i) => (
                                                                            <tr className="image" key={i}>
                                                                                <td>{player.name}</td>
                                                                                <td>{player.steamname}</td>
                                                                                <td>{player.kill}</td>
                                                                                <td>{player.assist}</td>
                                                                                <td>{player.death}</td>
                                                                                <td>{player.mvp}</td>
                                                                                <td>{player.score}</td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        : null
                                                }
                                            </div>
                                            <div className="leagueteamright">
                                                <div className="leagueteam">{item.results[0].teamright.name}: <span>{item.results[0].teamright.score}</span></div>

                                                <ul className="scheduleplayerlists">
                                                    {
                                                        temporarydataselected.teamright && temporarydataselected.teamright.players.map((player, i) => (
                                                            <li
                                                                className="scheduleplayer"
                                                                onClick={() => _inputStatistic(player, item, false)}
                                                            >
                                                                {player.steamname.substring(0,10)}
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                                {
                                                    item.results[0].teamright.players.length ?
                                                        <div className="tableResponsiveSm">
                                                            <table className="table">
                                                                {
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Name</th>
                                                                            <th>Nickname</th>
                                                                            <th>Kill</th>
                                                                            <th>Assists</th>
                                                                            <th>Death</th>
                                                                            <th>MVP</th>
                                                                            <th>Score</th>
                                                                        </tr>
                                                                    </thead>
                                                                }
                                                                <tbody>
                                                                    {
                                                                        item.results[0].teamright.players.sort((a, b) => b.score - a.score).map((player, i) => (
                                                                            <tr className="image" key={i}>
                                                                                <td>{player.name}</td>
                                                                                <td>{player.steamname}</td>
                                                                                <td>{player.kill}</td>
                                                                                <td>{player.assist}</td>
                                                                                <td>{player.death}</td>
                                                                                <td>{player.mvp}</td>
                                                                                <td>{player.score}</td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        : null
                                                }
                                            </div>
                                        </div>
                                    ))
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
            </div>
            {
                addresult &&
                <BackDrop click={backdropClickHandler} />
            }
            {
                addstatistic &&
                <BackDrop click={backdropStatisticClickHandler} />
            }
            <div className={addresult ? "rightSideOption open" : "rightSideOption"}>
                {
                    addresult ?
                        <div className="actionTitle">
                            <div className="actionTitleText">Add Result</div>
                        </div>
                        : null

                }
                {
                    addresult ?
                        <div className="additionalformstyle pb20">
                            <div className="row" style={{
                                padding: "0 15px 25px 15px"
                            }}>
                                <label
                                    className="col-md-12 col-xs-12 colFormLabel"
                                    style={{
                                        paddingBottom: 0
                                    }}
                                >{formresult.map.title}</label>
                                <div className="col-md-12 col-xs-12">
                                    {
                                        choosemap ?
                                            <div>
                                                <div
                                                    onBlur={dontblurchoosemap ? null : hideprofilemenuchoosemap}
                                                    tabIndex={0}
                                                >
                                                    <input
                                                        autoCapitalize="none"
                                                        autoComplete="off"
                                                        autoCorrect="off"
                                                        className="tableSearch"
                                                        type="text"
                                                        name={formresult.map.title}
                                                        placeholder={formresult.map.title}
                                                        title={formresult.map.config.placeholder}
                                                        value={formresult.map.config.placeholder}
                                                        autoFocus={true}
                                                        readOnly
                                                    />

                                                </div>
                                                <ul
                                                    className="dropdownmenu listgroup profilemenu"
                                                    onMouseEnter={onMouseEnterChooseMap}
                                                    onMouseLeave={onMouseLeaveChooseMap}
                                                >
                                                    {showLinks(formresult.map.config.options, 'map', selectedItemChooseMap)}
                                                </ul>
                                            </div>
                                            :
                                            <FormField
                                                id={'map'}
                                                formdata={formresult.map}
                                                options={formresult.map.config.options}
                                                change={searchFormChooseMap}
                                                myclass={`${formresult.map.config.options && formresult.map.config.options.length > 0 ? "inputbutton form-control" : "inputbutton form-control disabled"}`}
                                            />
                                    }
                                </div>
                            </div>
                        </div>
                        : null
                }
                {
                    addresult ?
                        <div className="additionalformstyle pb20">
                            <div className="row" style={{
                                padding: "0 15px 25px 15px"
                            }}>
                                <label
                                    className="col-md-12 col-xs-12 colFormLabel"
                                    style={{
                                        paddingBottom: 0
                                    }}
                                >{temporarydataselected && temporarydataselected.teamleft.name}</label>
                                <div className="col-md-12 col-xs-12">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faCubes}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    <FormField
                                        id={'teamleftscore'}
                                        formdata={formresult.teamleftscore}
                                        change={(element) => additionalUpdateForm(element)}
                                        myclass={'form-control'}
                                    />
                                </div>
                            </div>
                        </div>
                        : null
                }
                {
                    addresult ?
                        <div className="additionalformstyle pb20">
                            <div className="row" style={{
                                padding: "0 15px 25px 15px"
                            }}>
                                <label
                                    className="col-md-12 col-xs-12 colFormLabel"
                                    style={{
                                        paddingBottom: 0
                                    }}
                                >{temporarydataselected && temporarydataselected.teamright.name}</label>
                                <div className="col-md-12 col-xs-12">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faCubes}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    <FormField
                                        id={'teamrightscore'}
                                        formdata={formresult.teamrightscore}
                                        change={(element) => additionalUpdateForm(element)}
                                        myclass={'form-control'}
                                    />
                                </div>
                            </div>
                        </div>
                        : null
                }
                {
                    addresult ?
                        <div className="additionalformstyle">
                            <div className="row" style={{
                                padding: "0 15px"
                            }}>
                                <div className="col-md-12">
                                    <div className="formSubmitButtonWithBack">
                                        <button
                                            onClick={(event) => submitAdditionalCategory(event)}
                                            className="formbackButton formsubmitButtonShadow buttonColor"
                                        >
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                className="icon agraicon w18px"
                                            />
                                            &nbsp;Match
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
            <div className={addstatistic ? "rightSideOption open" : "rightSideOption"}>
                {
                    addstatistic ?
                        <div className="actionTitle">
                            <div className="actionTitleText">Add Statistic</div>
                        </div>
                        : null

                }
                {
                    addstatistic ?
                        <div className="additionalformstyle pb20">
                            <div className="row" style={{
                                padding: "0 15px 25px 15px"
                            }}>
                                <label
                                    className="col-md-12 col-xs-12 colFormLabel"
                                    style={{
                                        paddingBottom: 0
                                    }}
                                >{formplayer.kill.title}</label>
                                <div className="col-md-12 col-xs-12">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faCubes}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    <FormField
                                        id={'kill'}
                                        formdata={formplayer.kill}
                                        change={(element) => statisticUpdateForm(element)}
                                        myclass={'form-control'}
                                    />
                                </div>
                            </div>
                        </div>
                        : null
                }
                {
                    addstatistic ?
                        <div className="additionalformstyle pb20">
                            <div className="row" style={{
                                padding: "0 15px 25px 15px"
                            }}>
                                <label
                                    className="col-md-12 col-xs-12 colFormLabel"
                                    style={{
                                        paddingBottom: 0
                                    }}
                                >{formplayer.assist.title}</label>
                                <div className="col-md-12 col-xs-12">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faCubes}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    <FormField
                                        id={'assist'}
                                        formdata={formplayer.assist}
                                        change={(element) => statisticUpdateForm(element)}
                                        myclass={'form-control'}
                                    />
                                </div>
                            </div>
                        </div>
                        : null
                }
                {
                    addstatistic ?
                        <div className="additionalformstyle pb20">
                            <div className="row" style={{
                                padding: "0 15px 25px 15px"
                            }}>
                                <label
                                    className="col-md-12 col-xs-12 colFormLabel"
                                    style={{
                                        paddingBottom: 0
                                    }}
                                >{formplayer.death.title}</label>
                                <div className="col-md-12 col-xs-12">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faCubes}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    <FormField
                                        id={'death'}
                                        formdata={formplayer.death}
                                        change={(element) => statisticUpdateForm(element)}
                                        myclass={'form-control'}
                                    />
                                </div>
                            </div>
                        </div>
                        : null
                }
                {
                    addstatistic ?
                        <div className="additionalformstyle pb20">
                            <div className="row" style={{
                                padding: "0 15px 25px 15px"
                            }}>
                                <label
                                    className="col-md-12 col-xs-12 colFormLabel"
                                    style={{
                                        paddingBottom: 0
                                    }}
                                >{formplayer.mvp.title}</label>
                                <div className="col-md-12 col-xs-12">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faCubes}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    <FormField
                                        id={'mvp'}
                                        formdata={formplayer.mvp}
                                        change={(element) => statisticUpdateForm(element)}
                                        myclass={'form-control'}
                                    />
                                </div>
                            </div>
                        </div>
                        : null
                }
                {
                    addstatistic ?
                        <div className="additionalformstyle pb20">
                            <div className="row" style={{
                                padding: "0 15px 25px 15px"
                            }}>
                                <label
                                    className="col-md-12 col-xs-12 colFormLabel"
                                    style={{
                                        paddingBottom: 0
                                    }}
                                >{formplayer.score.title}</label>
                                <div className="col-md-12 col-xs-12">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faCubes}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    <FormField
                                        id={'score'}
                                        formdata={formplayer.score}
                                        change={(element) => statisticUpdateForm(element)}
                                        myclass={'form-control'}
                                    />
                                </div>
                            </div>
                        </div>
                        : null
                }
                {
                    addstatistic ?
                        <div className="additionalformstyle">
                            <div className="row" style={{
                                padding: "0 15px"
                            }}>
                                <div className="col-md-12">
                                    <div className="formSubmitButtonWithBack">
                                        <button
                                            onClick={(event) => submitStatistic(event)}
                                            className="formbackButton formsubmitButtonShadow buttonColor"
                                        >
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                className="icon agraicon w18px"
                                            />
                                            &nbsp;SEND
                                        </button>
                                    </div>
                                </div>
                                {
                                    statisticformError ?
                                        <div className="errorAddCategory">
                                            {errorMessage}
                                        </div>
                                        : statisticformSuccess ?
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
};

export default SchedulesTableScreen;