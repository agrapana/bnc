import React, {
    useState,
    useEffect
} from 'react';
import {
    // useSelector,
    useDispatch
} from 'react-redux';
import { useHistory } from 'react-router';
import { useParams, useLocation } from 'react-router-dom';
import { useWindowSize } from '../../widget/windowsize';
import { getScheduleByid } from '../../../admin/store/actions/league_action';
import { convertToRupiah } from '../../../admin/lumisoft/utils/form/formactions'
import { clientauth } from '../../../admin/store/actions/client_action';
import { loading } from '../../../admin/store/actions/loading_action';
import moment from 'moment';
import { FaAndroid, FaApple, FaDropbox, FaSignInAlt, FaSignOutAlt, FaChevronRight, FaChevronLeft } from "react-icons/fa";

const LeagueResultDetailPage = (props) => {
    const history = useHistory();
    const size = useWindowSize();
    const dispatch = useDispatch();
    const params = useParams();
    const location = useLocation();
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
    const [selectedSchedule, selectedScheduleHandler] = useState({});
    const [leagueid, leagueidHandler] = useState();
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
                let selectedschedule = await dispatch(getScheduleByid(id), { signal: abortController.signal });
                let mydata = await dispatch(clientauth(), { signal: abortController.signal });
                if (mounted && selectedschedule.payload.success && mydata.payload && location.state && location.state.leagueid) {
                    if (mydata.payload.steamid && mydata.payload.steamname) {
                        selectedScheduleHandler(selectedschedule.payload.schedulebyid);
                        leagueidHandler(location.state.leagueid);
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

    const _showinfo = (data) => {
        if (data) {
            return data.split(`\\n`).map((txt, i) => <span key={i}>{txt}{'\n\n'}</span>)
        }
    }

    const _showresults = (data) => {
        if (data) {
            return data.map((item, index) => (
                <div className="col-md-12 col-xs-12" key={index}>
                    <h3 style={{
                        fontSize: '16px',
                        color: '#ffffff',
                        marginTop: '25px',
                        backgroundColor: '#359144',
                        padding: '15px'
                    }}>{item.map}</h3>
                    <div className="leaguecard">
                        <div className="leaguecardHeader2">
                            {item.results[0].teamleft.name} <span>{item.results[0].teamleft.score}</span>
                        </div>
                        <div className="leaguecardBody">
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
                    </div>
                    <div className="leaguecard">
                        <div className="leaguecardHeader2">
                            {item.results[0].teamright.name} <span>{item.results[0].teamright.score}</span>
                        </div>
                        <div className="leaguecardBody">
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
                </div>
            ))
        }
    }

    const _goBacktoLeagueDetail = () => {
        if(leagueid){
            history.push(`/league/${leagueid}`)
        }
    }

    return (
        <section id="homepage" style={{ marginBottom: 0, transform: "none" }}>
            <div className="contentwrap" style={{ transform: "none" }}>
                <div id="headpage" className="section" style={{ padding: 0, marginBottom: 0 }}>
                    <div className="container">
                        <h1>Result details</h1>
                        <span>{selectedSchedule ? `${selectedSchedule.teamleft && selectedSchedule.teamleft.name} vs ${selectedSchedule.teamright && selectedSchedule.teamright.name}` : null}</span>
                    </div>
                </div>
                <div id="leaguebody" className="section" style={{ margin: 0 }}>
                    <div className="contentwrap" style={{ transform: "none" }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 col-xs-12 p0">
                                    {_showresults(selectedSchedule && selectedSchedule.results)}
                                </div>
                            </div>
                            <div className="row">
                                <div className="formSubmitButtonWithBack">
                                    <div
                                        className="formbackButton formsubmitButtonShadow buttonColor"
                                        title=""
                                        onClick={() => _goBacktoLeagueDetail()}
                                    >
                                        <FaChevronLeft />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LeagueResultDetailPage;