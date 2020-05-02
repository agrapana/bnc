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
    updateTeamPoint,
    clearUpdateTeamPoint,
    clearAddTeam,
    getTeams,
    updateLeagueTeam,
    clearUpdateLeagueTeam,
    updateLeagueSchedule,
    clearUpdateLeagueSchedule,
    addGroup,
    clearAddGroup,
    pushTeamToGroup,
    addSemifinal,
    clearAddSemifinal,
    setFirst,
    setSecond,
    setThird,
    goToProcess,
    closeLeague
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
                addteamtogroupHandler(false);
                teamfirstHandler(false);
                teamsecondHandler(false);
                teamthirdHandler(false);
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
    const [formaddpoint, formaddpointHandler] = useState({
        point: {
            element: 'input',
            title: 'Point',
            value: '',
            config: {
                name: 'pointInput',
                type: 'text',
                placeholder: 'Enter Point'
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
    const [formaddgroup, formaddgroupHandler] = useState({
        name: {
            element: 'input',
            title: 'Group lists',
            value: '',
            config: {
                name: 'groupnameInput',
                type: 'text',
                placeholder: 'Enter Group name'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        }
    });
    const [formaddsemifinal, formaddsemifinalHandler] = useState({
        name: {
            element: 'input',
            title: 'Semifinal lists',
            value: '',
            config: {
                name: 'semifinalInput',
                type: 'text',
                placeholder: 'Enter Semifinal'
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
            value: "",
            selectedValue: "",
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
            value: "",
            selectedValue: "",
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
    });
    const [formaddgroupteam, formaddgroupteamHandler] = useState({
        teams: {
            element: 'select',
            title: 'Teams',
            value: "",
            config: {
                name: 'teamslistInput',
                options: [],
                placeholder: 'Enter Teams'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        }
    });
    const [formaddfirst, formaddfirstHandler] = useState({
        first: {
            element: 'select',
            title: '1st Champion',
            value: "",
            config: {
                name: 'firstInput',
                options: [],
                placeholder: 'Enter 1st Champion'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        }
    });
    const [formaddsecond, formaddsecondHandler] = useState({
        second: {
            element: 'select',
            title: '2nd Champion',
            value: "",
            config: {
                name: 'secondInput',
                options: [],
                placeholder: 'Enter 2nd Champion'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        }
    });
    const [formaddthird, formaddthirdHandler] = useState({
        third: {
            element: 'select',
            title: '3rd Champion',
            value: "",
            config: {
                name: 'thirdInput',
                options: [],
                placeholder: 'Enter 3rd Champion'
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

    const [teamleftsemifinal, teamleftsemifinalHandler] = useState(false);
    const [dontblurteamleftsemifinal, dontblurteamleftsemifinalHandler] = useState(false);

    const [teamrightsemifinal, teamrightsemifinalHandler] = useState(false);
    const [dontblurteamrightsemifinal, dontblurteamrightsemifinalHandler] = useState(false);

    const [teamleft, teamleftHandler] = useState(false);
    const [dontblurteamleft, dontblurteamleftHandler] = useState(false);

    const [teamright, teamrightHandler] = useState(false);
    const [dontblurteamright, dontblurteamrightHandler] = useState(false);

    const [teamfirst, teamfirstHandler] = useState(false);
    const [dontblurteamfirst, dontblurteamfirstHandler] = useState(false);

    const [teamsecond, teamsecondHandler] = useState(false);
    const [dontblurteamsecond, dontblurteamsecondHandler] = useState(false);

    const [teamthird, teamthirdHandler] = useState(false);
    const [dontblurteamthird, dontblurteamthirdHandler] = useState(false);

    const [addteamtogroup, addteamtogroupHandler] = useState(false);
    const [dontbluraddteamtogroup, dontbluraddteamtogroupHandler] = useState(false);

    const [chooseserver, chooseserverHandler] = useState(false);
    const [dontblurchooseserver, dontblurchooseserverHandler] = useState(false);

    const [searchteam, searchteamHandler] = useState("");

    const [addpoint, addpointHandler] = useState(false);
    const [addgroup, addgroupHandler] = useState(false);
    const [addsemifinal, addsemifinalHandler] = useState(false);
    const [addteamtogroupaction, addteamtogroupactionHandler] = useState(false);

    const [selectedteampoint, selectedteampointHandler] = useState({});
    const [selectedgroup, selectedgroupHandler] = useState({});

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
    const updateFormSemifinal = (element) => {
        const newFormdata = update(element, formaddsemifinal, 'league');
        formErrorHandler(false);
        formaddsemifinalHandler(newFormdata);
    }
    const additionalUpdateForm = (element) => {
        const newFormdata = update(element, formaddteam, 'additionalcategory');
        additionalformErrorHandler(false);
        formaddteamHandler(newFormdata);
    }
    const additionalUpdatePointForm = (element) => {
        const newFormdata = update(element, formaddpoint, 'addpoint');
        additionalformErrorHandler(false);
        formaddpointHandler(newFormdata);
    }
    const additionalUpdateGroupForm = (element) => {
        const newFormdata = update(element, formaddgroup, 'addgroup');
        additionalformErrorHandler(false);
        formaddgroupHandler(newFormdata);
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
    //////////////////////////////////TEAM FIRST/////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    const searchFormTeamFirst = () => {
        teamfirstHandler(true);
    }
    const onMouseEnterTeamFirst = () => {
        dontblurteamfirstHandler(true)
    }
    const onMouseLeaveTeamFirst = () => {
        dontblurteamfirstHandler(false)
    }
    const hideprofilemenuteamFirst = () => {
        teamfirstHandler(false)
    }
    // const handleChange = (event) => {
    //     searchteamHandler(event.target.value);
    // }
    /////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////TEAM SECOND/////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    const searchFormTeamSecond = () => {
        teamsecondHandler(true);
    }
    const onMouseEnterTeamSecond = () => {
        dontblurteamsecondHandler(true)
    }
    const onMouseLeaveTeamSecond = () => {
        dontblurteamsecondHandler(false)
    }
    const hideprofilemenuteamSecond = () => {
        teamsecondHandler(false)
    }
    // const handleChange = (event) => {
    //     searchteamHandler(event.target.value);
    // }
    /////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////TEAM THIRD/////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    const searchFormTeamThird = () => {
        teamthirdHandler(true);
    }
    const onMouseEnterTeamThird = () => {
        dontblurteamthirdHandler(true)
    }
    const onMouseLeaveTeamThird = () => {
        dontblurteamthirdHandler(false)
    }
    const hideprofilemenuteamThird = () => {
        teamthirdHandler(false)
    }
    // const handleChange = (event) => {
    //     searchteamHandler(event.target.value);
    // }
    /////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////
    //////////////////////////////TEAM LEFT SEMIFINAL////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    const searchFormTeamLeftSemifinal = () => {
        teamleftsemifinalHandler(true);
    }
    const onMouseEnterTeamLeftSemifinal = () => {
        dontblurteamleftsemifinalHandler(true)
    }
    const onMouseLeaveTeamLeftSemifinal = () => {
        dontblurteamleftsemifinalHandler(false)
    }
    const hideprofilemenuteamleftSemifinal = () => {
        teamleftsemifinalHandler(false)
    }
    // const handleChange = (event) => {
    //     searchteamHandler(event.target.value);
    // }
    /////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////
    //////////////////////////////TEAM RIGHT SEMIFINAL///////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    const searchFormTeamRightSemifinal = () => {
        teamrightsemifinalHandler(true);
    }
    const onMouseEnterTeamRightSemifinal = () => {
        dontblurteamrightsemifinalHandler(true)
    }
    const onMouseLeaveTeamRightSemifinal = () => {
        dontblurteamrightsemifinalHandler(false)
    }
    const hideprofilemenuteamrightSemifinal = () => {
        teamrightsemifinalHandler(false)
    }
    // const handleChange = (event) => {
    //     searchteamHandler(event.target.value);
    // }
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
    /////////////////////////////////TEAM TO GROUP///////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    const searchFormTeamToGroup = () => {
        addteamtogroupHandler(true);
    }
    const onMouseEnterTeamToGroup = () => {
        dontbluraddteamtogroupHandler(true)
    }
    const onMouseLeaveTeamToGroup = () => {
        dontbluraddteamtogroupHandler(false)
    }
    const hideprofilemenuteamtogroup = () => {
        addteamtogroupHandler(false)
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

    const selectedItemTeamToGroup = (data, whichdata) => {
        var newFormdata = formaddgroupteam;
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
        formaddgroupteamHandler(temporaryFormdata);
        formErrorHandler(false);
        addteamtogroupHandler(false);
        dontbluraddteamtogroupHandler(false);
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

    const selectedItemTeamLeftSemifinal = (data, whichdata) => {
        var newFormdata = formaddsemifinal;
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
        formaddsemifinalHandler(temporaryFormdata);
        formErrorHandler(false);
        teamleftsemifinalHandler(false);
        dontblurteamleftsemifinalHandler(false);
    }

    const selectedItemTeamRightSemifinal = (data, whichdata) => {
        var newFormdata = formaddsemifinal;
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
        formaddsemifinalHandler(temporaryFormdata);
        formErrorHandler(false);
        teamrightsemifinalHandler(false);
        dontblurteamrightsemifinalHandler(false);
    }

    const selectedItemTeamFirst = (data, whichdata) => {
        var newFormdata = formaddfirst;
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
        formaddfirstHandler(temporaryFormdata);
        formErrorHandler(false);
        teamfirstHandler(false);
        dontblurteamfirstHandler(false);
    }

    const selectedItemTeamSecond = (data, whichdata) => {
        var newFormdata = formaddsecond;
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
        formaddsecondHandler(temporaryFormdata);
        formErrorHandler(false);
        teamsecondHandler(false);
        dontblurteamsecondHandler(false);
    }

    const selectedItemTeamThird = (data, whichdata) => {
        var newFormdata = formaddthird;
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
        formaddthirdHandler(temporaryFormdata);
        formErrorHandler(false);
        teamthirdHandler(false);
        dontblurteamthirdHandler(false);
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

    const AddGroupBackdrop = () => {
        addgroupHandler(true);
        formErrorHandler(false);
    }

    const AddSemifinalBackdrop = () => {
        addsemifinalHandler(true);
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

    const addpointbackdropClickHandler = () => {
        document.body.style.overflow = 'overlay';
        var newFormdata = formaddpoint;
        const temporaryFormdata = {
            ...newFormdata
        }

        const newElement = {
            ...temporaryFormdata['point']
        }

        newElement.value = "";
        newElement.valid = false;
        newElement.touched = false;

        temporaryFormdata['point'] = newElement;

        formaddpointHandler(temporaryFormdata);
        selectedteampointHandler({});
        addpointHandler(false);
    }

    const addgroupbackdropClickHandler = () => {
        document.body.style.overflow = 'overlay';
        var newFormdata = formaddgroup;
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

        formaddgroupHandler(temporaryFormdata);
        addgroupHandler(false);
    }

    const addteamtogroupbackdropClickHandler = () => {
        document.body.style.overflow = 'overlay';
        var newFormdata = formaddgroupteam;
        const temporaryFormdata = {
            ...newFormdata
        }

        const newElement = {
            ...temporaryFormdata['teams']
        }

        newElement.value = "";
        newElement.valid = false;
        newElement.touched = false;

        temporaryFormdata['teams'] = newElement;

        formaddgroupteamHandler(temporaryFormdata);
        selectedgroupHandler({})
        addteamtogroupactionHandler(false);
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

    const submitPoint = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit = generateData(formaddpoint, 'point');
        let formIsValid = isFormValid(formaddpoint, 'point');
        let id = selectedteampoint._id;

        if (formIsValid) {
            dispatch(updateTeamPoint(dataToSubmit, id)).then(response => {
                if (response.payload.success) {
                    dispatch(clearUpdateTeamPoint());
                    formSuccessHandler(true);
                    props.history.push('/admin/master/league')
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

    const submitGroup = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit = generateData(formaddgroup, 'group');
        let formIsValid = isFormValid(formaddgroup, 'group');
        let id = dataselected._id;

        if (formIsValid) {
            dispatch(addGroup(dataToSubmit, id)).then(response => {
                if (response.payload.success) {
                    dispatch(clearAddGroup());
                    formSuccessHandler(true);
                    props.history.push('/admin/master/league')
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

    const submitTeamToGroup = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit = generateData(formaddgroupteam, 'teamtogroup');
        let formIsValid = isFormValid(formaddgroupteam, 'teamtogroup');
        let id = selectedgroup._id;

        if (formIsValid) {
            dispatch(pushTeamToGroup(dataToSubmit, id)).then(response => {
                if (response.payload.success) {
                    formSuccessHandler(true);
                    props.history.push('/admin/master/league')
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

    const SubmitSemifinal = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit = generateData(formaddsemifinal, 'teamtogroup');
        let formIsValid = isFormValid(formaddsemifinal, 'teamtogroup');
        let id = dataselected._id;

        let totalDataToSubmit = {
            name: dataToSubmit.name,
            teamleft: [{ id: `${dataToSubmit.teamleft}`, name: `${formaddsemifinal.teamleft.selectedValue}`, status: 'none' }],
            teamright: [{ id: `${dataToSubmit.teamright}`, name: `${formaddsemifinal.teamright.selectedValue}`, status: 'none' }],
        }

        if (formIsValid) {
            dispatch(addSemifinal(totalDataToSubmit, id)).then(response => {
                if (response.payload.success) {
                    dispatch(clearAddSemifinal());
                    formSuccessHandler(true);
                    props.history.push('/admin/master/league')
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

    const inputPoint = (data) => {
        selectedteampointHandler(data);
        addpointHandler(true);
        formErrorHandler(false);
    }

    const inputTeam = (data) => {
        selectedgroupHandler(data);
        addteamtogroupactionHandler(true);
        formErrorHandler(false);
    }

    const SubmitFirstChampion = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit = generateData(formaddfirst, 'formaddfirst');
        let formIsValid = isFormValid(formaddfirst, 'formaddfirst');
        let id = dataselected._id;

        if (formIsValid) {
            dispatch(setFirst(dataToSubmit, id)).then(response => {
                if (response.payload.success) {
                    formSuccessHandler(true);
                    props.history.push('/admin/master/league')
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

    const SubmitSecondChampion = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit = generateData(formaddsecond, 'formaddsecond');
        let formIsValid = isFormValid(formaddsecond, 'formaddsecond');
        let id = dataselected._id;

        if (formIsValid) {
            dispatch(setSecond(dataToSubmit, id)).then(response => {
                if (response.payload.success) {
                    formSuccessHandler(true);
                    props.history.push('/admin/master/league')
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

    const SubmitThirdChampion = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit = generateData(formaddthird, 'formaddthird');
        let formIsValid = isFormValid(formaddthird, 'formaddthird');
        let id = dataselected._id;

        if (formIsValid) {
            dispatch(setThird(dataToSubmit, id)).then(response => {
                if (response.payload.success) {
                    formSuccessHandler(true);
                    props.history.push('/admin/master/league')
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

    const closethisLeague = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let id = dataselected._id;

        dispatch(closeLeague(id)).then(response => {
            if (response.payload.success) {
                formSuccessHandler(true);
                props.history.push('/admin/master/league')
            } else {
                formErrorHandler(true);
                props.loadingtableHandler(false);
                errorMessageHandler(response.payload.message);
            }
        })
    }

    const processLeague = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let id = dataselected._id;

        dispatch(goToProcess(id)).then(response => {
            if (response.payload.success) {
                formSuccessHandler(true);
                props.history.push('/admin/master/league')
            } else {
                formErrorHandler(true);
                props.loadingtableHandler(false);
                errorMessageHandler(response.payload.message);
            }
        })
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
                                                    <div
                                                        key={index}
                                                        className="adminteamlist"
                                                        onClick={() => inputPoint(item)}
                                                    >
                                                        {index + 1}. {item.name} ({item.point ? item.point : 0} point)
                                                    </div>
                                                ))
                                                : null
                                        }
                                    </div>
                                </div>
                            }
                            <div className="col-md-12 col-xs-12 pb25">
                                <label className="col-md-2 col-xs-12 colFormLabel p0">{formaddgroup.name.title}</label>
                                <div className="col-md-1 col-xs-4">
                                    <div className="categoryButtonWrapperSingleButton">
                                        <div
                                            className="categoryButton buttonColor"
                                            style={{ marginRight: '0px' }}
                                            title=""
                                            onClick={() => AddGroupBackdrop()}
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
                                            dataselected.group && dataselected.group.length > 0 ?
                                                dataselected.group.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="adminteamlist"
                                                        onClick={() => inputTeam(item)}
                                                    >
                                                        {index + 1}. {item.name}
                                                        <ul>
                                                            {
                                                                item.teams && item.teams.length > 0 ?
                                                                    item.teams.map((team, index) => (
                                                                        <li key={index} className="grouplist">
                                                                            - {team.name} ({team.point ? team.point : 0} point)
                                                                        </li>
                                                                    ))
                                                                    : null
                                                            }
                                                        </ul>
                                                    </div>
                                                ))
                                                : null
                                        }
                                    </div>
                                </div>
                            }
                            <div className="col-md-12 col-xs-12 pb25">
                                <label className="col-md-2 col-xs-12 colFormLabel p0">{formaddsemifinal.name.title}</label>
                                <div className="col-md-10 col-xs-12 p0">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faFont}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    <FormField
                                        id={'name'}
                                        formdata={formaddsemifinal.name}
                                        change={(element) => updateFormSemifinal(element)}
                                        myclass={'form-control'}
                                    />
                                </div>
                                <label className="col-md-12 col-xs-12 colFormLabel pb25"></label>
                                <label className="col-md-2 col-xs-12 colFormLabel p0"></label>
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
                                        teamleftsemifinal ?
                                            <div>
                                                <div
                                                    onBlur={dontblurteamleftsemifinal ? null : hideprofilemenuteamleftSemifinal}
                                                    tabIndex={0}
                                                >
                                                    <input
                                                        autoCapitalize="none"
                                                        autoComplete="off"
                                                        autoCorrect="off"
                                                        className="tableSearch"
                                                        type="text"
                                                        name={formaddsemifinal.teamleft.title}
                                                        placeholder={formaddsemifinal.teamleft.title}
                                                        title={formaddsemifinal.teamleft.config.placeholder}
                                                        value={formaddsemifinal.teamleft.config.placeholder}
                                                        autoFocus={true}
                                                        readOnly
                                                    />

                                                </div>
                                                <ul
                                                    className="dropdownmenu listgroup profilemenu"
                                                    onMouseEnter={onMouseEnterTeamLeftSemifinal}
                                                    onMouseLeave={onMouseLeaveTeamLeftSemifinal}
                                                >
                                                    {showLinks(alldata, 'teamleft', selectedItemTeamLeftSemifinal)}
                                                </ul>
                                            </div>
                                            :
                                            <FormField
                                                id={'teamleft'}
                                                formdata={formaddsemifinal.teamleft}
                                                options={alldata}
                                                change={searchFormTeamLeftSemifinal}
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
                                        teamrightsemifinal ?
                                            <div>
                                                <div
                                                    onBlur={dontblurteamrightsemifinal ? null : hideprofilemenuteamrightSemifinal}
                                                    tabIndex={0}
                                                >
                                                    <input
                                                        autoCapitalize="none"
                                                        autoComplete="off"
                                                        autoCorrect="off"
                                                        className="tableSearch"
                                                        type="text"
                                                        name={formaddsemifinal.teamright.title}
                                                        placeholder={formaddsemifinal.teamright.title}
                                                        title={formaddsemifinal.teamright.config.placeholder}
                                                        value={formaddsemifinal.teamright.config.placeholder}
                                                        autoFocus={true}
                                                        readOnly
                                                    />

                                                </div>
                                                <ul
                                                    className="dropdownmenu listgroup profilemenu"
                                                    onMouseEnter={onMouseEnterTeamRightSemifinal}
                                                    onMouseLeave={onMouseLeaveTeamRightSemifinal}
                                                >
                                                    {showLinks(alldata, 'teamright', selectedItemTeamRightSemifinal)}
                                                </ul>
                                            </div>
                                            :
                                            <FormField
                                                id={'teamright'}
                                                formdata={formaddsemifinal.teamright}
                                                options={alldata}
                                                change={searchFormTeamRightSemifinal}
                                                myclass={`${alldata && alldata.length > 0 ? "inputbutton form-control" : "inputbutton form-control disabled"}`}
                                            />
                                    }

                                </div>
                                <div className="col-md-1 col-xs-4">
                                    <div className="categoryButtonWrapper">
                                        <div
                                            className="categoryButton buttonColor"
                                            style={{ marginRight: '0px' }}
                                            title=""
                                            onClick={(event) => SubmitSemifinal(event)}
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
                                            dataselected.semifinal && dataselected.semifinal.length > 0 ?
                                                dataselected.semifinal.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="adminteamlist"
                                                        onClick={() => inputTeam(item)}
                                                    >
                                                        {index + 1}. {item.name}
                                                        <ul>
                                                            {
                                                                item.teamleft && item.teamleft.length > 0 ?
                                                                    item.teamleft.map((team, index) => (
                                                                        <li key={index} className="grouplist">
                                                                            - {team.name} ({team.status === "none" ? "none" : team.status})
                                                                        </li>
                                                                    ))
                                                                    : null
                                                            }
                                                            {
                                                                item.teamright && item.teamright.length > 0 ?
                                                                    item.teamright.map((team, index) => (
                                                                        <li key={index} className="grouplist">
                                                                            - {team.name} ({team.status === "none" ? "none" : team.status})
                                                                        </li>
                                                                    ))
                                                                    : null
                                                            }
                                                        </ul>
                                                    </div>
                                                ))
                                                : null
                                        }
                                    </div>
                                </div>
                            }
                            <div className="col-md-12 col-xs-12 pb25">
                                <label className="col-md-2 col-xs-12 colFormLabel p0">{formaddfirst.first.title}</label>
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
                                        teamfirst ?
                                            <div>
                                                <div
                                                    onBlur={dontblurteamfirst ? null : hideprofilemenuteamFirst}
                                                    tabIndex={0}
                                                >
                                                    <input
                                                        autoCapitalize="none"
                                                        autoComplete="off"
                                                        autoCorrect="off"
                                                        className="tableSearch"
                                                        type="text"
                                                        name={formaddfirst.first.title}
                                                        placeholder={formaddfirst.first.title}
                                                        title={formaddfirst.first.config.placeholder}
                                                        value={formaddfirst.first.config.placeholder}
                                                        autoFocus={true}
                                                        readOnly
                                                    />

                                                </div>
                                                <ul
                                                    className="dropdownmenu listgroup profilemenu"
                                                    onMouseEnter={onMouseEnterTeamFirst}
                                                    onMouseLeave={onMouseLeaveTeamFirst}
                                                >
                                                    {showLinks(alldata, 'first', selectedItemTeamFirst)}
                                                </ul>
                                            </div>
                                            :
                                            <FormField
                                                id={'first'}
                                                formdata={formaddfirst.first}
                                                options={alldata}
                                                change={searchFormTeamFirst}
                                                myclass={`${alldata && alldata.length > 0 ? "inputbutton form-control" : "inputbutton form-control disabled"}`}
                                            />
                                    }
                                </div>
                                <div className="col-md-1 col-xs-4">
                                    <div className="categoryButtonWrapper">
                                        <div
                                            className="categoryButton buttonColor"
                                            style={{ marginRight: '0px' }}
                                            title=""
                                            onClick={(event) => SubmitFirstChampion(event)}
                                        >
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                className="icon agraicon w18px"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {
                                    dataselected && dataselected.first ?
                                        <div className="col-md-5 col-xs-12" style={isMobile ? { backgroundColor: "#111111", padding: "4px 4px 4px 14px", width: "100px" } : { marginLeft: "10px", backgroundColor: "#111111", padding: "4px 4px 4px 14px", width: "100px" }}>
                                            {dataselected.first && dataselected.first.name}
                                        </div>
                                        : null
                                }

                            </div>
                            <div className="col-md-12 col-xs-12 pb25">
                                <label className="col-md-2 col-xs-12 colFormLabel p0">{formaddsecond.second.title}</label>
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
                                        teamsecond ?
                                            <div>
                                                <div
                                                    onBlur={dontblurteamsecond ? null : hideprofilemenuteamSecond}
                                                    tabIndex={0}
                                                >
                                                    <input
                                                        autoCapitalize="none"
                                                        autoComplete="off"
                                                        autoCorrect="off"
                                                        className="tableSearch"
                                                        type="text"
                                                        name={formaddsecond.second.title}
                                                        placeholder={formaddsecond.second.title}
                                                        title={formaddsecond.second.config.placeholder}
                                                        value={formaddsecond.second.config.placeholder}
                                                        autoFocus={true}
                                                        readOnly
                                                    />

                                                </div>
                                                <ul
                                                    className="dropdownmenu listgroup profilemenu"
                                                    onMouseEnter={onMouseEnterTeamSecond}
                                                    onMouseLeave={onMouseLeaveTeamSecond}
                                                >
                                                    {showLinks(alldata, 'second', selectedItemTeamSecond)}
                                                </ul>
                                            </div>
                                            :
                                            <FormField
                                                id={'second'}
                                                formdata={formaddsecond.second}
                                                options={alldata}
                                                change={searchFormTeamSecond}
                                                myclass={`${alldata && alldata.length > 0 ? "inputbutton form-control" : "inputbutton form-control disabled"}`}
                                            />
                                    }
                                </div>
                                <div className="col-md-1 col-xs-4">
                                    <div className="categoryButtonWrapper">
                                        <div
                                            className="categoryButton buttonColor"
                                            style={{ marginRight: '0px' }}
                                            title=""
                                            onClick={(event) => SubmitSecondChampion(event)}
                                        >
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                className="icon agraicon w18px"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {
                                    dataselected && dataselected.second ?
                                        <div className="col-md-5 col-xs-12" style={isMobile ? { backgroundColor: "#111111", padding: "4px 4px 4px 14px", width: "100px" } : { marginLeft: "10px", backgroundColor: "#111111", padding: "4px 4px 4px 14px", width: "100px" }}>
                                            {dataselected.second && dataselected.second.name}
                                        </div>
                                        : null
                                }
                            </div>
                            <div className="col-md-12 col-xs-12 pb25">
                                <label className="col-md-2 col-xs-12 colFormLabel p0">{formaddthird.third.title}</label>
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
                                        teamthird ?
                                            <div>
                                                <div
                                                    onBlur={dontblurteamthird ? null : hideprofilemenuteamThird}
                                                    tabIndex={0}
                                                >
                                                    <input
                                                        autoCapitalize="none"
                                                        autoComplete="off"
                                                        autoCorrect="off"
                                                        className="tableSearch"
                                                        type="text"
                                                        name={formaddthird.third.title}
                                                        placeholder={formaddthird.third.title}
                                                        title={formaddthird.third.config.placeholder}
                                                        value={formaddthird.third.config.placeholder}
                                                        autoFocus={true}
                                                        readOnly
                                                    />

                                                </div>
                                                <ul
                                                    className="dropdownmenu listgroup profilemenu"
                                                    onMouseEnter={onMouseEnterTeamThird}
                                                    onMouseLeave={onMouseLeaveTeamThird}
                                                >
                                                    {showLinks(alldata, 'third', selectedItemTeamThird)}
                                                </ul>
                                            </div>
                                            :
                                            <FormField
                                                id={'third'}
                                                formdata={formaddthird.third}
                                                options={alldata}
                                                change={searchFormTeamThird}
                                                myclass={`${alldata && alldata.length > 0 ? "inputbutton form-control" : "inputbutton form-control disabled"}`}
                                            />
                                    }
                                </div>
                                <div className="col-md-1 col-xs-4">
                                    <div className="categoryButtonWrapper">
                                        <div
                                            className="categoryButton buttonColor"
                                            style={{ marginRight: '0px' }}
                                            title=""
                                            onClick={(event) => SubmitThirdChampion(event)}
                                        >
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                className="icon agraicon w18px"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {
                                    dataselected && dataselected.third ?
                                        <div className="col-md-5 col-xs-12" style={isMobile ? { backgroundColor: "#111111", padding: "4px 4px 4px 14px", width: "100px" } : { marginLeft: "10px", backgroundColor: "#111111", padding: "4px 4px 4px 14px", width: "100px" }}>
                                            {dataselected.third && dataselected.third.name}
                                        </div>
                                        : null
                                }
                            </div>
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
                                                        readOnly
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
                                                        readOnly
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
                                                        readOnly
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
                                                    <div key={index} style={{ marginBottom: '10px' }}>{index + 1}. {moment(item.start, 'x').format('LLLL')}<br />{item.teamleft.name} vs {item.teamright.name}<br />{item.currentserver.name} {item.currentserver.ipaddress}<br /></div>
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
                    {
                        dataselected.isOpen && dataselected.isProcessing && !dataselected.isClosed ?
                            <div className="row pb25">
                                <div className="col-md-12 col-xs-12">
                                    <div className="formSubmitButtonWithBack">
                                        <div className="doubleButton">
                                            <button
                                                onClick={(event) => closethisLeague(event)}
                                                className="formsubmitButton formsubmitButtonShadow buttonColor"
                                            >
                                                Close League
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : dataselected.isOpen && !dataselected.isProcessing && !dataselected.isClosed ?
                                <div className="row pb25">
                                    <div className="col-md-12 col-xs-12">
                                        <div className="formSubmitButtonWithBack">
                                            <div className="doubleButton">
                                                <button
                                                    onClick={(event) => processLeague(event)}
                                                    className="formsubmitButton formsubmitButtonShadow buttonColor"
                                                >
                                                    Process League
                                            </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : null
                    }

                </div>
                {
                    addteams &&
                    <BackDrop click={backdropClickHandler} />
                }
                {
                    addpoint &&
                    <BackDrop click={addpointbackdropClickHandler} />
                }
                {
                    addgroup &&
                    <BackDrop click={addgroupbackdropClickHandler} />
                }
                {
                    addteamtogroupaction &&
                    <BackDrop click={addteamtogroupbackdropClickHandler} />
                }
            </div>
            <div className={addteamtogroupaction ? "rightSideOption open" : "rightSideOption"}>
                {
                    addteamtogroupaction ?
                        <div className="actionTitle">
                            <div className="actionTitleText">Add Team to Group</div>
                        </div>
                        : null

                }
                {
                    addteamtogroupaction ?
                        <div className="additionalformstyle pb20">
                            <div className="row" style={{
                                padding: "0 15px 25px 15px"
                            }}>
                                <label
                                    className="col-md-12 col-xs-12 colFormLabel"
                                    style={{
                                        paddingBottom: 0
                                    }}
                                >{formaddgroupteam.teams.title}</label>
                                <div className="col-md-12 col-xs-12">
                                    {
                                        addteamtogroup ?
                                            <div>
                                                <div
                                                    onBlur={dontbluraddteamtogroup ? null : hideprofilemenuteamtogroup}
                                                    tabIndex={0}
                                                >
                                                    <input
                                                        autoCapitalize="none"
                                                        autoComplete="off"
                                                        autoCorrect="off"
                                                        className="tableSearch"
                                                        type="text"
                                                        name={formaddgroupteam.teams.title}
                                                        placeholder={formaddgroupteam.teams.title}
                                                        title={formaddgroupteam.teams.config.placeholder}
                                                        value={formaddgroupteam.teams.config.placeholder}
                                                        autoFocus={true}
                                                        readOnly
                                                    />

                                                </div>
                                                <ul
                                                    className="dropdownmenu listgroup profilemenu"
                                                    onMouseEnter={onMouseEnterTeamToGroup}
                                                    onMouseLeave={onMouseLeaveTeamToGroup}
                                                >
                                                    {showLinks(alldata, 'teams', selectedItemTeamToGroup)}
                                                </ul>
                                            </div>
                                            :
                                            <FormField
                                                id={'teams'}
                                                formdata={formaddgroupteam.teams}
                                                options={alldata}
                                                change={searchFormTeamToGroup}
                                                myclass={`${alldata && alldata.length > 0 ? "inputbutton form-control" : "inputbutton form-control disabled"}`}
                                            />
                                    }
                                </div>
                            </div>
                        </div>
                        : null
                }
                {
                    addteamtogroupaction ?
                        <div className="additionalformstyle">
                            <div className="row" style={{
                                padding: "0 15px"
                            }}>
                                <div className="col-md-12">
                                    <div className="formSubmitButtonWithBack">
                                        <button
                                            onClick={(event) => submitTeamToGroup(event)}
                                            className="formbackButton formsubmitButtonShadow buttonColor"
                                        >
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                className="icon agraicon w18px"
                                            />
                                            &nbsp;Submit Team
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
            <div className={addgroup ? "rightSideOption open" : "rightSideOption"}>
                {
                    addgroup ?
                        <div className="actionTitle">
                            <div className="actionTitleText">Add Group</div>
                        </div>
                        : null

                }
                {
                    addgroup ?
                        <div className="additionalformstyle pb20">
                            <div className="row" style={{
                                padding: "0 15px 25px 15px"
                            }}>
                                <label
                                    className="col-md-12 col-xs-12 colFormLabel"
                                    style={{
                                        paddingBottom: 0
                                    }}
                                >{formaddgroup.name.title}</label>
                                <div className="col-md-12 col-xs-12">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faCubes}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    <FormField
                                        id={'name'}
                                        formdata={formaddgroup.name}
                                        change={(element) => additionalUpdateGroupForm(element)}
                                        myclass={'form-control'}
                                    />
                                </div>
                            </div>
                        </div>
                        : null
                }
                {
                    addgroup ?
                        <div className="additionalformstyle">
                            <div className="row" style={{
                                padding: "0 15px"
                            }}>
                                <div className="col-md-12">
                                    <div className="formSubmitButtonWithBack">
                                        <button
                                            onClick={(event) => submitGroup(event)}
                                            className="formbackButton formsubmitButtonShadow buttonColor"
                                        >
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                className="icon agraicon w18px"
                                            />
                                            &nbsp;Add Group
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
            <div className={addpoint ? "rightSideOption open" : "rightSideOption"}>
                {
                    addpoint ?
                        <div className="actionTitle">
                            <div className="actionTitleText">Add Point</div>
                        </div>
                        : null

                }
                {
                    addpoint ?
                        <div className="additionalformstyle pb20">
                            <div className="row" style={{
                                padding: "0 15px 25px 15px"
                            }}>
                                <label
                                    className="col-md-12 col-xs-12 colFormLabel"
                                    style={{
                                        paddingBottom: 0
                                    }}
                                >{formaddpoint.point.title}</label>
                                <div className="col-md-12 col-xs-12">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faCubes}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    <FormField
                                        id={'point'}
                                        formdata={formaddpoint.point}
                                        change={(element) => additionalUpdatePointForm(element)}
                                        myclass={'form-control'}
                                    />
                                </div>
                            </div>
                        </div>
                        : null
                }
                {
                    addpoint ?
                        <div className="additionalformstyle">
                            <div className="row" style={{
                                padding: "0 15px"
                            }}>
                                <div className="col-md-12">
                                    <div className="formSubmitButtonWithBack">
                                        <button
                                            onClick={(event) => submitPoint(event)}
                                            className="formbackButton formsubmitButtonShadow buttonColor"
                                        >
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                className="icon agraicon w18px"
                                            />
                                            &nbsp;Submit Point
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