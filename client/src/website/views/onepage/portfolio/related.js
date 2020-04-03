import React from 'react';

const RelatedPortfolio = (props) => {

    // console.log(props.alldata)

    return (
        <div
            className="relatedslidercontainer"
            style={
                {
                    overflow: "hidden"
                }
            }
        >
            <h4>Other Projects:</h4>
            {
                props.alldata.map((item, index) => {
                    return (

                        <div
                            key={index}
                            className="carouselimage col-md-4 col-sm-6 col-xs-12 mb15 mt15"
                        // onClick={() => props.gotoRelatedProject(item)}
                        >
                            <a href={`/portfolio/${item._id}`} key={index}>
                                <img
                                    src={item.images[0].url}
                                    alt=""
                                />
                            </a>
                        </div>
                    )
                })
            }
        </div>
    );

};

export default RelatedPortfolio;