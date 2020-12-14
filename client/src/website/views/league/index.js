import React, {
    useState,
    useEffect
} from 'react';
import {
    // useSelector,
    useDispatch
} from 'react-redux';
import { useHistory } from 'react-router';
import { useWindowSize } from '../../widget/windowsize';
import { getLeague } from '../../../admin/store/actions/league_action';
import { clientauth } from '../../../admin/store/actions/client_action';
import { loading } from '../../../admin/store/actions/loading_action';
import moment from 'moment';
import Loadingscreen from '../../views/loadingscreen';
// import { FaAndroid, FaApple, FaDropbox } from "react-icons/fa";

const LeaguePage = (props) => {
    const history = useHistory();
    const size = useWindowSize();
    const dispatch = useDispatch();
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
    const [allleague, allleagueHandler] = useState([]);
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
                let allleague = await dispatch(getLeague(), { signal: abortController.signal });
                let mydata = await dispatch(clientauth(), { signal: abortController.signal });
                if (mounted && allleague.payload.success && mydata.payload) {
                    if (mydata.payload.steamid && mydata.payload.steamname) {
                        let allsortedleague = allleague.payload.leagues.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                        allleagueHandler(allsortedleague);
                        mydataHandler(mydata.payload);
                        dispatch(loading(false));
                    } else {
                        setTimeout(() => {
                            history.push('/profile');
                        }, 1500)
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

    const _showLeagueList = () => (
        allleague && allleague.length > 0 ?
            allleague.map((item, index) => (
                <div className="col-md-6 col-xs-12 p0" key={index}>
                    <div className="leaguedesc">
                        <h3>{item.name}</h3>
                        <span>{item.info}</span>
                        <span>Start: {moment(item.start, 'x').format('LLLL')}</span>
                        <span>Status:&nbsp;
                            {
                                item.isOpen && !item.isProcessing ? "Open" :
                                    item.isOpen && item.isProcessing ? "Processing" :
                                        item.isClosed ? "Closed" : null
                            }
                        </span>
                        <div
                            onClick={() => gotoThisLeague(item)}
                            className="nextButton"
                        >
                            Next
                        </div>
                    </div>
                </div>
            ))
            : <div style={{ minHeight: 500 }}>
            <Loadingscreen />
            </div>
    )

    const gotoThisLeague = (data) => {
        history.push(`/league/${data._id}`)
    }

    return (
        <section id="homepage" style={{ marginBottom: 0, transform: "none" }}>
            <div className="contentwrap" style={{ transform: "none" }}>
                <div id="headpage" className="section" style={{ padding: 0, marginBottom: 0 }}>
                    <div className="container">
                        <h1>League</h1>
                        <span>BNC Community league lists</span>
                    </div>
                </div>
                <div id="leaguebody" className="section" style={{ margin: 0 }}>
                    <div className="contentwrap" style={{ transform: "none" }}>
                        <div className="container">
                            <div className="row">
                                {
                                    _showLeagueList()
                                }

                                {/* <div className="col-md-6 col-xs-12 p0">
                                    <div className="leaguedesc">
                                        <h3>Title</h3>
                                        <span>subtitle</span>
                                        <p>asdf</p>
                                        <ul>
                                            <li>asdf</li>
                                            <li>asdfasdf</li>
                                            <li>123</li>
                                        </ul>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LeaguePage;