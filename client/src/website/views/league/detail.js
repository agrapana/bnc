import React, {
    useState,
    useEffect
} from 'react';
import {
    // useSelector,
    useDispatch
} from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { useWindowSize } from '../../widget/windowsize';
import { getLeagueByid, joinTeamLeague, cancelTeamLeague } from '../../../admin/store/actions/league_action';
import { logoutTeamLeague } from '../../../admin/store/actions/client_action';
import { convertToRupiah } from '../../../admin/lumisoft/utils/form/formactions'
import { clientauth } from '../../../admin/store/actions/client_action';
import { loading } from '../../../admin/store/actions/loading_action';
import moment from 'moment';
import { FaAndroid, FaApple, FaDropbox, FaSignInAlt, FaSignOutAlt, FaChevronRight } from "react-icons/fa";

const LeagueDetailPage = (props) => {
    const history = useHistory();
    const size = useWindowSize();
    const dispatch = useDispatch();
    const params = useParams();
    const isMobile = size.width <= 767.98;
    // const isTablet = size.width >= 767.99 && size.width <= 1025.98;

    const [
        width,
        // widthHandler
    ] = useState(size.width);
    const [
        height,
        // heightHandler
    ] = useState(size.height);
    const [selectedLeague, selectedLeagueHandler] = useState({});
    const [mydata, mydataHandler] = useState();
    const [iamexist, iamexistHandler] = useState();
    // const gotoPage = (link) => {
    //     history.push(link);
    // }
    useEffect(() => {
        let mounted = true;
        const abortController = new AbortController();

        const getAllData = async () => {
            try {
                dispatch(loading(true));
                const id = await params.id;
                let selectedleague = await dispatch(getLeagueByid(id), { signal: abortController.signal });
                let mydata = await dispatch(clientauth(), { signal: abortController.signal });
                if (mounted && selectedleague.payload.success && mydata.payload) {
                    let obj = selectedleague.payload.leaguebyid && selectedleague.payload.leaguebyid.teams;
                    let myteamid = mydata.payload && mydata.payload.registeredteam;
                    let exist = await obj.some(r => r._id.toString() === myteamid.toString())
                    if (mydata.payload.steamid && mydata.payload.steamname) {
                        iamexistHandler(exist);
                        selectedLeagueHandler(selectedleague.payload.leaguebyid);
                        mydataHandler(mydata.payload);
                        dispatch(loading(false));
                    } else {
                        setTimeout(() => {
                            history.push('/profile');
                        }, 1000)
                    }
                }

            } catch (error) {

            }
        }
        getAllData();
        return () => {
            mounted = false;
            abortController.abort();
        }
    }, [dispatch])

    // const _showLeagueList = () => (
    //     allleague && allleague.length > 0 ?
    //         allleague.map((item, index) => (
    //             <div className="col-md-6 col-xs-12 p0" key={index}>
    //                 <div className="leaguedesc">
    //                     <h3>{item.name}</h3>
    //                     <span>{item.info}</span>
    //                     <span>Start: {moment(item.start, 'x').format('LLLL')}</span>
    //                     <span>Status:&nbsp;
    //                         {
    //                             item.isOpen && !item.isProcessing ? "Open" :
    //                                 item.isOpen && item.isProcessing ? "Processing" :
    //                                     item.isClosed ? "Closed" : null
    //                         }
    //                     </span>
    //                     <div
    //                         onClick={() => gotoThisLeague(item)}
    //                         className="nextButton"
    //                     >
    //                         Next
    //                     </div>
    //                 </div>
    //             </div>
    //         ))
    //         : null
    // )

    // const gotoThisLeague = (data) => {
    //     history.push(`/${data._id}`)
    // }
    const _showinfo = (data) => {
        if (data) {
            return data.split(`\\n`).map((txt, i) => <span key={i}>{txt}{'\n\n'}</span>)
        }
    }

    const getNewData = async () => {
        let selectedleague = await dispatch(getLeagueByid(selectedLeague._id));
        let mydata = await dispatch(clientauth());
        if (selectedleague.payload.success && mydata.payload) {
            selectedLeagueHandler(selectedleague.payload.leaguebyid);
            mydataHandler(mydata.payload);
        }
    }

    const _cancelThisTeam = (team) => {
        dispatch(loading(true));
        dispatch(cancelTeamLeague(team._id)).then(response => {
            if (response.payload.success) {
                getNewData();
                dispatch(loading(false));
            } else {
                alert("Please try again!");
                dispatch(loading(false));
            }
        })
    }

    const _logoutFromThisTeam = () => {
        dispatch(loading(true));
        dispatch(logoutTeamLeague()).then(response => {
            if (response.payload.success) {
                getNewData();
                dispatch(loading(false));
            } else {
                alert("Please try again!");
                dispatch(loading(false));
            }
        })
    }

    const _joinThisTeam = (team) => {
        dispatch(loading(true));
        dispatch(joinTeamLeague(team._id)).then(response => {
            if (response.payload.success) {
                getNewData();
                dispatch(loading(false));
            } else {
                alert("Please try again!");
                dispatch(loading(false));
            }
        })
    }

    // const _showfinal = (data) => (
    //     <div>
    //         <div className="col-md-6 col-xs-12">
    //             <div className="leaguecard">
    //                 <div className="leaguecardHeader">3rd Place</div>
    //                 <div className="leaguecardBody">
    //                     <ul className="leagueList">
    //                         <li style={{ fontWeight: 600, color: '#888888' }}>Team 1</li>
    //                         <li style={{ fontWeight: 600, color: 'rgb(53, 145, 68)' }}>Team 3 (3rd Champion)</li>
    //                     </ul>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className="col-md-6 col-xs-12">
    //             <div className="leaguecard">
    //                 <div className="leaguecardHeader">Grand Final</div>
    //                 <div className="leaguecardBody">
    //                     <ul className="leagueList">
    //                         <li style={{ fontWeight: 600, color: 'rgb(53, 145, 68)' }}>Team 5 (1st Champion)</li>
    //                         <li style={{ fontWeight: 600, color: '#888888' }}>Team 2 (2nd Champion)</li>
    //                     </ul>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )

    const _showsemifinal = (data) => (
        <div>
            {
                data.semifinal && data.semifinal.length > 0 ?
                    data.semifinal.map((item, index) => (
                        <div className="col-md-6 col-xs-12" key={index}>
                            <div className="leaguecard">
                                <div className="leaguecardHeader">{item.name}</div>
                                <div className="leaguecardBody">
                                    <ul className="leagueList">
                                        <li>{item.teamleft[0].name}</li>
                                        <li>{item.teamright[0].name}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))
                    : null
            }
        </div>
    )

    const _showbagan = (data) => (
        <div>
            {
                data.group && data.group.length > 0 ?
                    data.group.map((item, index) => (
                        <div className="col-md-6 col-xs-12" key={index}>
                            <div className="leaguecard">
                                <div className="leaguecardHeader">{item.name}</div>
                                <div className="leaguecardBody">
                                    <ul className="leagueList">
                                        {
                                            item.teams && item.teams.length > 0 ?
                                                item.teams.map((team, i) => (
                                                    <li key={i}>{team.name} ({team.point ? team.point : 0} Point)</li>
                                                ))
                                                : null
                                        }

                                        {/* <li style={{ fontWeight: 600, color: '#888888' }}>Team 4 (0 Point)</li>
                                        <li style={{ fontWeight: 600, color: 'rgb(53, 145, 68)' }}>Team 5 (6 Point)</li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))
                    : null
            }
        </div>
    )

    const _showteamstologout = (data) => {
        if (data && data.teams) {
            return data && data.teams.map((item, index) => (
                <div className="col-md-3 col-xs-12" key={index} style={{ minHeight: '236px' }}>
                    <div className="leaguecard">
                        <div className="leaguecardHeader">
                            <span>{item.name}</span>
                            {
                                data.isOpen === false && data.isProcessing === false && data.isClosed === true ?
                                    mydata && mydata.registeredteam ?
                                        mydata && mydata.registeredteam === item._id ?
                                            <span
                                                className="leaguecardHeaderIcon"
                                                onClick={() => _logoutFromThisTeam()}
                                            >
                                                <FaSignOutAlt />
                                            </span>

                                            : null
                                        : null
                                    : null
                            }

                        </div>
                        {
                            data.isOpen === false && data.isProcessing === false && data.isClosed === true ?
                                mydata && mydata.registeredteam ?
                                    <div className="leaguecardBody">
                                        <ul className="leagueList">
                                            {
                                                item.players && item.players.length > 0 ?
                                                    item.players.map((player, index2) => (
                                                        <li key={index2}>{index2 + 1}. {player.name}</li>
                                                    ))
                                                    : "Player Empty"
                                            }
                                        </ul>
                                    </div>
                                    : null
                                : null
                        }

                    </div>

                </div>
            ))
        }
    }

    const _showteams = (data) => {
        if (data && data.teams) {
            return data && data.teams.map((item, index) => (
                <div className="col-md-3 col-xs-12" key={index} style={{ minHeight: '236px' }}>
                    <div className="leaguecard">
                        <div className="leaguecardHeader">
                            <span>{item.name}</span>
                            {
                                data.isOpen === true && data.isProcessing === false ?
                                    mydata && mydata.registeredteam ?
                                        mydata && mydata.registeredteam === item._id ?
                                            <span
                                                className="leaguecardHeaderIcon"
                                                onClick={() => _cancelThisTeam(item)}
                                            >
                                                <FaSignOutAlt />
                                            </span>

                                            : null
                                        :
                                        <span
                                            className="leaguecardHeaderIcon"
                                            onClick={() => _joinThisTeam(item)}
                                        >
                                            <FaSignInAlt />
                                        </span>
                                    : null
                            }

                        </div>
                        {
                            data.isOpen === true && data.isProcessing === false ?
                                mydata && mydata.registeredteam ?
                                    <div className="leaguecardBody">
                                        <ul className="leagueList">
                                            {
                                                item.players && item.players.length > 0 ?
                                                    item.players.map((player, index2) => (
                                                        <li key={index2}>{index2 + 1}. {player.name}</li>
                                                    ))
                                                    : "Player Empty"
                                            }
                                        </ul>
                                    </div>
                                    : null
                                :
                                <div className="leaguecardBody">
                                    <ul className="leagueList">
                                        {
                                            item.players && item.players.length > 0 ?
                                                item.players.map((player, index2) => (
                                                    <li key={index2}>{index2 + 1}. {player.name}</li>
                                                ))
                                                : "Player Empty"
                                        }
                                    </ul>
                                </div>
                        }

                    </div>

                </div>
            ))
        }
    }

    const _showschedule = (data) => {
        if (data) {
            return data.map((item, index) => (
                <div className="col-md-3 col-xs-12" key={index} style={{ minHeight: '200px' }}>
                    <div
                        className="leaguecard"
                        style={Date.now() < item.start ? { backgroundColor: '#222222' } : { backgroundColor: '#359144' }}
                    >
                        <div className="leaguecardHeader">
                            <span>{index + 1}. {item.teamleft.name} vs {item.teamright.name}</span>
                        </div>
                        <div className="leaguecardBody">
                            <ul className="leagueList">
                                <li>{moment(item.start, 'x').format('LLLL')}</li>
                                <li>{item.currentserver.name}</li>
                                <li>IP: {item.currentserver.ipaddress}</li>
                                <li>GOTV: {item.currentserver.gotv}</li>
                            </ul>
                        </div>
                    </div>

                </div>
            ))
        }
    }

    const _showresults = (data) => {
        if (data) {
            return data.map((item, index) => (
                <div className="col-md-3 col-xs-12" key={index} style={{ minHeight: '352px' }}>
                    <div className="leaguecard">
                        <div className="leaguecardHeader">
                            <span>{index + 1}. {item.teamleft.name} vs {item.teamright.name}</span>
                            {
                                item.results.length > 0 ?
                                    <span
                                        className="leaguecardHeaderIcon2"
                                        onClick={() => _gotoResultDetail(item)}
                                    >
                                        <FaChevronRight />
                                    </span>
                                    : null
                            }

                        </div>
                        <div className="leaguecardBody">
                            <span style={{ marginBottom: '10px', display: 'block' }}>{moment(item.start, 'x').format('LLLL')}</span>
                            {
                                item.results.length > 0 ?
                                    item.results.map((result, i) => (
                                        <div key={i}>
                                            <div style={{ marginBottom: '10px' }}>
                                                <div>Map: {result.map}</div>
                                                {result && result.results.map((team, teami) => (
                                                    <div key={teami}>
                                                        <div><span style={team.teamleft.score === '16' ? { fontWeight: 600, color: 'rgb(53, 145, 68)' } : null}>{team.teamleft.name}</span> {team.teamleft.score}</div>
                                                        <div><span style={team.teamright.score === '16' ? { fontWeight: 600, color: 'rgb(53, 145, 68)' } : null}>{team.teamright.name}</span> {team.teamright.score}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))

                                    : null
                            }
                        </div>
                    </div>

                </div>
            ))
        }
    }

    const _gotoResultDetail = (data) => {
        history.push({
            pathname: `/league/resultdetail/${data._id}`,
            state: {
                leagueid: selectedLeague._id
            }
        })
    }
    console.log(iamexist, "<<<<<iamexist<<<<<<")
    return (
        <section id="homepage" style={{ marginBottom: 0, transform: "none" }}>
            <div className="contentwrap" style={{ transform: "none" }}>
                <div id="headpage" className="section" style={{ padding: 0, marginBottom: 0 }}>
                    <div className="container">
                        <h1>{selectedLeague ? selectedLeague.name : null}</h1>
                        <span>{selectedLeague ? selectedLeague.info : null}</span>
                    </div>
                </div>
                {
                    selectedLeague.isOpen === false && selectedLeague.isProcessing === false && selectedLeague.isClosed === true && iamexist ?
                        <div id="signout" className="section" style={{ margin: 0 }}>
                            <div className="contentwrap" style={{ transform: "none" }}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12 col-xs-12 p0">
                                            <h3 style={{
                                                fontSize: '16px',
                                                color: '#ffffff',
                                                marginTop: '25px',
                                                backgroundColor: '#222222',
                                                padding: '15px'
                                            }}>Please sign out from your previous team</h3>
                                            {_showteamstologout(selectedLeague)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div id="leaguebody" className="section" style={{ margin: 0 }}>
                            <div className="contentwrap" style={{ transform: "none" }}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6 col-xs-12 p0">
                                            {
                                                selectedLeague.first ?
                                                    <div className="leaguedesc">
                                                        <div>1st CHAMPION : {selectedLeague.first && selectedLeague.first.name}</div>
                                                    </div>
                                                    : null
                                            }
                                            {
                                                selectedLeague.second ?
                                                    <div className="leaguedesc">
                                                        <div>2nd CHAMPION : {selectedLeague.second && selectedLeague.second.name}</div>
                                                    </div>
                                                    : null
                                            }
                                            {
                                                selectedLeague.third ?
                                                    <div className="leaguedesc">
                                                        <div>3rd CHAMPION : {selectedLeague.third && selectedLeague.third.name}</div>
                                                    </div>
                                                    : null
                                            }
                                            <div className="leaguedesc">
                                                <div>Start : {moment(selectedLeague.start, 'x').format('LLLL')}</div>
                                                <div>
                                                    Status :&nbsp;
                                                {
                                                        selectedLeague.isOpen && !selectedLeague.isProcessing ? "Open" :
                                                            selectedLeague.isOpen && selectedLeague.isProcessing ? "Processing" :
                                                                selectedLeague.isClosed ? "Closed" : null
                                                    }
                                                </div>
                                                <div style={{ marginTop: '20px' }}>
                                                    Registration :
                                            <ul>
                                                        <li>Bank : {selectedLeague.bank}</li>
                                                        <li>Rekening : {selectedLeague.accountnumber}</li>
                                                        <li>A/N : {selectedLeague.accountname}</li>
                                                        <li>@ : Rp. {convertToRupiah(parseInt(selectedLeague.amount))},-</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-md-12 col-xs-12 p0">
                                                {_showbagan(selectedLeague)}
                                            </div>
                                            <div className="col-md-12 col-xs-12 p0">
                                                {_showsemifinal(selectedLeague)}
                                            </div>
                                            {/* <div className="col-md-12 col-xs-12 p0">
                                        {_showfinal(selectedLeague)}
                                    </div> */}
                                        </div>
                                        <div className="col-md-6 col-xs-12 p0">
                                            <div className="leaguedesc">
                                                {_showinfo(selectedLeague && selectedLeague.rules)}
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-xs-12 p0">
                                            <h3 style={{
                                                fontSize: '16px',
                                                color: '#ffffff',
                                                marginTop: '25px',
                                                backgroundColor: '#222222',
                                                padding: '15px'
                                            }}>Team Lists</h3>
                                            {_showteams(selectedLeague)}
                                        </div>
                                        {
                                            selectedLeague.isOpen === true && selectedLeague.isProcessing === false ?
                                                mydata && mydata.registeredteam !== "" ?
                                                    <div className="col-md-12 col-xs-12 p0">
                                                        <h3 style={{
                                                            fontSize: '16px',
                                                            color: '#ffffff',
                                                            marginTop: '25px',
                                                            backgroundColor: '#222222',
                                                            padding: '15px'
                                                        }}>Schedule Lists</h3>
                                                        {_showschedule(selectedLeague && selectedLeague.schedule)}
                                                    </div>
                                                    : null
                                                :
                                                <div className="col-md-12 col-xs-12 p0">
                                                    <h3 style={{
                                                        fontSize: '16px',
                                                        color: '#ffffff',
                                                        marginTop: '25px',
                                                        backgroundColor: '#222222',
                                                        padding: '15px'
                                                    }}>Schedule Lists</h3>
                                                    {_showschedule(selectedLeague && selectedLeague.schedule)}
                                                </div>
                                        }
                                        <div className="col-md-12 col-xs-12 p0">
                                            <h3 style={{
                                                fontSize: '16px',
                                                color: '#ffffff',
                                                marginTop: '25px',
                                                backgroundColor: '#222222',
                                                padding: '15px'
                                            }}>Results Details</h3>
                                            {_showresults(selectedLeague && selectedLeague.schedule)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }

            </div>
        </section>
    );
};

export default LeagueDetailPage;