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
                    if (mydata.payload.steamid && mydata.payload.steamname) {
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

    const _showteams = (data) => {
        if (data && data.teams) {
            return data && data.teams.map((item, index) => (
                <div className="col-md-6 col-xs-12" key={index}>
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
                                                        <li>{index2 + 1}. {player.name}</li>
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
                <div className="col-md-3 col-xs-12" key={index}>
                    <div 
                        className="leaguecard"
                        style={Date.now() < item.start ? { backgroundColor: '#222222'}: { backgroundColor: '#359144' }}
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
                <div className="col-md-3 col-xs-12" key={index}>
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
                            <span>{moment(item.start, 'x').format('LLLL')}</span>
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

    return (
        <section id="homepage" style={{ marginBottom: 0, transform: "none" }}>
            <div className="contentwrap" style={{ transform: "none" }}>
                <div id="headpage" className="section" style={{ padding: 0, marginBottom: 0 }}>
                    <div className="container">
                        <h1>{selectedLeague ? selectedLeague.name : null}</h1>
                        <span>{selectedLeague ? selectedLeague.info : null}</span>
                    </div>
                </div>
                <div id="leaguebody" className="section" style={{ margin: 0 }}>
                    <div className="contentwrap" style={{ transform: "none" }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 col-xs-12 p0">
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
                                        <h3 style={{
                                            fontSize: '16px',
                                            color: '#ffffff',
                                            marginTop: '25px',
                                            backgroundColor: '#222222',
                                            padding: '15px'
                                        }}>Team Lists</h3>
                                        {_showteams(selectedLeague)}
                                    </div>
                                </div>
                                <div className="col-md-6 col-xs-12 p0">
                                    <div className="leaguedesc">
                                        {_showinfo(selectedLeague && selectedLeague.rules)}
                                    </div>
                                </div>
                                {
                                    selectedLeague.isOpen === true && selectedLeague.isProcessing === false ?
                                        mydata && mydata.registeredteam ?
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
                                {
                                    selectedLeague.isOpen === true && selectedLeague.isProcessing === true ?
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
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LeagueDetailPage;