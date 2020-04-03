import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useWindowSize } from '../../../widget/windowsize';
import Header from './header';
import Slider from './slider';
import Related from './related';
import Footer from '../footer';
import Copyright from '../copyright';
import { getPortfolio, getPortfolioByid } from '../../../../admin/store/actions/portfolio_action';


const PortfolioDetails = (props) => {
    // console.log(props, "<<<<<<<<<<<<<<< RelatedPortfolio")
    const dispatch = useDispatch();
    const size = useWindowSize();
    const params = useParams();
    // console.log(params, "<<<<<<<<<<params")
    const [selectedProduct, selectedProductHandler] = useState({});
    const [allportfolio, allportfolioHandler] = useState([]);
    const [loadingsingle, loadingsingleHandler] = useState(false);

    useEffect(() => {
        let mounted = true;
        const abortController = new AbortController();

        const getAllData = async () => {
            try {
                loadingsingleHandler(true);
                let portfoliofilter = [];
                const id = await params.id;
                let alldatas = await dispatch(getPortfolioByid(id), { signal: abortController.signal });
                let portfolio = await dispatch(getPortfolio(), { signal: abortController.signal });
                
                portfolio.payload.portfolios.forEach((item, index) => {
                    if (alldatas.payload._id !== item._id) {
                        portfoliofilter.push(item);
                    }
                })
                if (mounted) {
                    selectedProductHandler(alldatas.payload);
                    allportfolioHandler(portfoliofilter);
                    loadingsingleHandler(false);
                }

            } catch (error) {

            }
        }
        getAllData();
        return () => {
            mounted = false;
            abortController.abort();
        }
    }, [dispatch, params.id])

    // const gotoRelatedProject = (data) => {
    //     console.log(data._id, "datadtadtaa")
    //     //props.history.push(`/portfolio/${data._id}`);
    //     props.history.push({
    //         pathname: `/portfolio/${data._id}`
    //     });
    // }

    if (loadingsingle) {
        return (
            <div
                id="frontportfoliosingleskeleton"
                style={{
                    height: `${size.height}px`
                }}
            >
                <div className="lds-ripple"><div></div><div></div></div>
            </div>
        );
    } else {
        return (
            <div style={{ height: '100%' }}>
                <Header {...props} />
                <div id="portfoliodetails">
                    <section className="section">
                        <div className="container clearfix">
                            <div className="headingblock">
                                <h3>{selectedProduct.name}</h3>
                            </div>
                        </div>
                    </section>
                    <div className="container">
                        <Slider selected={selectedProduct} {...props} />
                        <Related alldata={allportfolio} {...props} />
                    </div>
                </div>
                <Footer />
                <Copyright />
            </div>
        );
    }
}

export default PortfolioDetails;