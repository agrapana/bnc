import React, { useState, useEffect } from 'react';
import { 
    // useSelector, 
    useDispatch 
} from 'react-redux';

import { useWindowSize } from '../../../widget/windowsize';

import LatestWorks from './latestworks';
import { getPortfolio } from '../../../../admin/store/actions/portfolio_action';

const PortfolioSection = (props) => {
    const size = useWindowSize();
    const dispatch = useDispatch();
    const [loadingportfolio, loadingportfolioHandler] = useState(false);
    const [allportfolio, allportfolioHandler] = useState([]);
    const width = size.width;

    useEffect(() => {
        let mounted = true;
        const abortController = new AbortController();

        const getAllData = async () => {
            try {
                loadingportfolioHandler(true);
                let alldatas = await dispatch(getPortfolio(), { signal: abortController.signal });
                if (mounted) {
                    allportfolioHandler(alldatas.payload.portfolios);
                    loadingportfolioHandler(false);
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

    if(allportfolio && allportfolio.length > 0) {
        return (
            <div id="frontportfolio">
                <LatestWorks alldata={allportfolio} width={width} loading={loadingportfolio} {...props} />
            </div>
        );
    } else {
        return (
            <div id="frontportfolioskeleton">
                <div className="lds-ripple"><div></div><div></div></div>
            </div>
        );
    }
}

export default PortfolioSection;