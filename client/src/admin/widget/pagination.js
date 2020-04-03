import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserPlus, faAngleDoubleUp, faMobileAlt, faMapMarker, faEnvelope, faRoad, faUser, faTrashAlt, faTimes, faCheck, faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight, faShippingFast, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faUserPlus, faAngleDoubleUp, faMobileAlt, faMapMarker, faEnvelope, faRoad, faUser, faTrashAlt, faTimes, faCheck, faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight, faShippingFast, faChevronLeft)


const Pagination = (props) => {
    var dataCount = props.Size;
    var pageSize = props.pageLimit;
    var totalPage = parseInt(dataCount / pageSize + ((dataCount % pageSize) > 0 ? 1 : 0));
    var li = [];
    var start = Math.max(1, props.currentPage - 1);
    var end = Math.min(start + 2, totalPage);

    if (props.currentPage === 1 || dataCount === 0) {
        li.push(
            <li key="99996" className="pageItem disabled">
                <span className="pageLink">
                    <FontAwesomeIcon
                        icon={faAngleDoubleLeft}
                        className="icon agraicon w18px"
                    />
                </span>
            </li>
        )

        li.push(
            <li key="99997" className="pageItem disabled">
                <span className="pageLink">
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        className="icon agraicon w18px"
                    />
                </span>
            </li>
        )
    } else {
        li.push(
            <li key="99996" className="pageItem">
                <span onClick={props.onPageChanged.bind(null, 1)} className="pageLink">
                    <FontAwesomeIcon
                        icon={faAngleDoubleLeft}
                        className="icon agraicon w18px"
                    />
                </span>
            </li>
        )

        li.push(
            <li key="99997" className="pageItem">
                <span onClick={props.onPageChanged.bind(null, props.currentPage - 1)} className="pageLink">
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        className="icon agraicon w18px"
                    />
                </span>
            </li>
        )
    }


    for (var i = start; i <= end; i++) {
        if (props.currentPage === i) {
            li.push(<li key={i} className="pageItem active"><span className="pageLink">{i}</span></li>);
        } else {
            li.push(<li key={i} className="pageItem"><span onClick={props.onPageChanged.bind(null, i)} className="pageLink">{i}</span></li>)
        }
    }

    if (props.currentPage === totalPage || dataCount === 0) {
        li.push(
            <li key="99998" className="pageItem disabled">
                <span className="pageLink">
                    <FontAwesomeIcon
                        icon={faAngleRight}
                        className="icon agraicon w18px"
                    />
                </span>
            </li>
        )

        li.push(
            <li key="99999" className="pageItem disabled">
                <span className="pageLink">
                    <FontAwesomeIcon
                        icon={faAngleDoubleRight}
                        className="icon agraicon w18px"
                    />
                </span>
            </li>
        )

    } else {
        li.push(
            <li key="99998" className="pageItem">
                <span onClick={props.onPageChanged.bind(null, props.currentPage + 1)} className="pageLink">
                    <FontAwesomeIcon
                        icon={faAngleRight}
                        className="icon agraicon w18px"
                    />
                </span>
            </li>
        )

        li.push(
            <li key="99999" className="pageItem">
                <span onClick={props.onPageChanged.bind(null, totalPage)} className="pageLink">
                    <FontAwesomeIcon
                        icon={faAngleDoubleRight}
                        className="icon agraicon w18px"
                    />
                </span>
            </li>
        )
    }
    return (
        <ul className={`${props.width ? "pagination justifyContentCenter posInherit" : "pagination justifyContentCenter"}`}>{li}</ul>
    );
}

export default Pagination;