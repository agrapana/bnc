import {
    ADD_PORTFOLIO,
    CLEAR_PORTFOLIO,
    GET_PORTFOLIO,
    GET_PORTFOLIO_BY_ID,
    UPDATE_PORTFOLIO,
    UPDATE_ADDITIONAL_PORTFOLIO,
    CLEAR_UPDATE_PORTFOLIO,
    CLEAR_UPDATE_ADDITIONAL_PORTFOLIO
} from '../types';

export default function (state = {}, action) {
    switch (action.type) {
        case ADD_PORTFOLIO:
            return {
                ...state,
                addPortfolio: action.payload
            }
        case CLEAR_PORTFOLIO:
            return {
                ...state,
                addPortfolio: action.payload
            }
        case GET_PORTFOLIO:
            return {
                ...state,
                getPortfolio: action.payload
            }
        case GET_PORTFOLIO_BY_ID:
            return {
                ...state,
                getPortfolioByid: action.payload
            }
        case UPDATE_PORTFOLIO:
            return {
                ...state,
                updatePortfolio: action.payload
            }
        case CLEAR_UPDATE_PORTFOLIO:
            return {
                ...state,
                updatePortfolio: action.payload
            }
        case UPDATE_ADDITIONAL_PORTFOLIO:
            return {
                ...state,
                updateAdditionalPortfolio: action.payload
            }
        case CLEAR_UPDATE_ADDITIONAL_PORTFOLIO:
            return {
                ...state,
                updateAdditionalPortfolio: action.payload
            }
        default:
            return state;
    }
}