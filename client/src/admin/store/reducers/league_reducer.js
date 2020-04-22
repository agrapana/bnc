import {
    ADD_LEAGUE,
    CLEAR_LEAGUE,
    GET_LEAGUE,
    GET_LEAGUE_BY_ID,
    UPDATE_LEAGUE,
    CLEAR_UPDATE_LEAGUE,
    UPDATE_LEAGUE_TEAM,
    CLEAR_UPDATE_LEAGUE_TEAM,
    JOIN_TEAM_LEAGUE,
    CANCEL_TEAM_LEAGUE,
    UPDATE_LEAGUE_SCHEDULE,
    CLEAR_UPDATE_LEAGUE_SCHEDULE,
    ADD_TEAM,
    CLEAR_ADD_TEAM,
    GET_TEAMS,
    UPDATE_TEAM,
    CLEAR_UPDATE_TEAM
} from '../types';

export default function (state = {}, action) {
    switch (action.type) {
        case ADD_TEAM:
            return {
                ...state,
                addTeam: action.payload
            }
        case CLEAR_ADD_TEAM:
            return {
                ...state,
                addTeam: action.payload
            }
        case GET_TEAMS:
            return {
                ...state,
                getTeams: action.payload
            }
        case UPDATE_TEAM:
            return {
                ...state,
                updateTeam: action.payload
            }
        case CLEAR_UPDATE_TEAM:
            return {
                ...state,
                updateTeam: action.payload
            }
        case JOIN_TEAM_LEAGUE:
            return {
                ...state,
                jointeamleague: action.payload
            }
        case CANCEL_TEAM_LEAGUE:
            return {
                ...state,
                cancelteamleague: action.payload
            }
        case UPDATE_LEAGUE_TEAM:
            return {
                ...state,
                updateLeagueTeam: action.payload
            }
        case CLEAR_UPDATE_LEAGUE_TEAM:
            return {
                ...state,
                updateLeagueTeam: action.payload
            }
        case UPDATE_LEAGUE_SCHEDULE:
            return {
                ...state,
                updateLeagueSchedule: action.payload
            }
        case CLEAR_UPDATE_LEAGUE_SCHEDULE:
            return {
                ...state,
                updateLeagueSchedule: action.payload
            }
        case ADD_LEAGUE:
            return {
                ...state,
                addLeague: action.payload
            }
        case CLEAR_LEAGUE:
            return {
                ...state,
                addLeague: action.payload
            }
        case GET_LEAGUE:
            return {
                ...state,
                getLeague: action.payload
            }
        case GET_LEAGUE_BY_ID:
            return {
                ...state,
                getLeagueByid: action.payload
            }
        case UPDATE_LEAGUE:
            return {
                ...state,
                updateLeague: action.payload
            }
        case CLEAR_UPDATE_LEAGUE:
            return {
                ...state,
                updateLeague: action.payload
            }
        default:
            return state;
    }
}