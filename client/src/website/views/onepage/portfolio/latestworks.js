import React from 'react';
import { Link } from 'react-router-dom';

const LatestWorksSection = (props) => {
    // let isMobile = props.width < 767.98;
    return (
        <div className="portfolio">
            {
                props.alldata ?
                    props.alldata.map((item, index) => (

                        <div key={index} className="portfolioitem col-md-3 col-lg-4 col-sm-6 col-xs-12">
                            <Link
                                to={`/portfolio/${item._id}`}
                            >
                                <div className="portfolioimage">
                                    {
                                        item.images[0] && item.images[0].url ?
                                            <img src={item.images[0].url} alt="" />
                                            : <img src={window.location.origin + "/admin/assets/images/notavailablef.jpg"} alt="" />
                                    }

                                    <div className="portfoliooverlay"></div>
                                </div>
                                <div className="portfoliodesc">
                                    <h3>{item.name}</h3>
                                    <span>
                                        {item.category.name}
                                    </span>
                                </div>
                            </Link>

                        </div>
                    ))
                    : null

            }
        </div>
    );
};

export default LatestWorksSection;