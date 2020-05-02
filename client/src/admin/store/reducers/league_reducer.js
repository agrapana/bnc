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
    UPDATE_TEAM_POINT,
    CLEAR_UPDATE_TEAM_POINT,
    CLEAR_UPDATE_TEAM,
    GET_SCHEDULE,
    GET_SCHEDULE_BY_ID,
    UPDATE_SCHEDULE,
    CLEAR_UPDATE_SCHEDULE,
    ADD_RESULT,
    CLEAR_ADD_RESULT,
    UPDATE_RESULT,
    CLEAR_UPDATE_RESULT,
    GET_RESULTS,
    ADD_GROUP,
    CLEAR_ADD_GROUP,
    GET_GROUPS,
    PUSH_TEAM_TO_GROUP,
    ADD_SEMIFINAL,
    CLEAR_ADD_SEMIFINAL,
    SET_FIRST,
    SET_SECOND,
    SET_THIRD,
    GO_TO_PROCESS,
    CLOSE_LEAGUE
} from '../types';

export default function (state = {}, action) {
    switch (action.type) {
        case GO_TO_PROCESS:
            return {
                ...state,
                goToProcess: action.payload
            }
        case CLOSE_LEAGUE:
            return {
                ...state,
                closeLeague: action.payload
            }
        case SET_FIRST:
            return {
                ...state,
                setFirst: action.payload
            }
        case SET_SECOND:
            return {
                ...state,
                setSecond: action.payload
            }
        case SET_THIRD:
            return {
                ...state,
                setThird: action.payload
            }
        case ADD_SEMIFINAL:
            return {
                ...state,
                addSemifinal: action.payload
            }
        case CLEAR_ADD_SEMIFINAL:
            return {
                ...state,
                addSemifinal: action.payload
            }
        case PUSH_TEAM_TO_GROUP:
            return {
                ...state,
                pushteamToGroup: action.payload
            }
        case ADD_GROUP:
            return {
                ...state,
                addGroup: action.payload
            }
        case CLEAR_ADD_GROUP:
            return {
                ...state,
                addGroup: action.payload
            }
        case GET_GROUPS:
            return {
                ...state,
                getGroups: action.payload
            }
        case GET_SCHEDULE_BY_ID:
            return {
                ...state,
                getScheduleByid: action.payload
            }
        case ADD_RESULT:
            return {
                ...state,
                addResult: action.payload
            }
        case CLEAR_ADD_RESULT:
            return {
                ...state,
                addResult: action.payload
            }
        case UPDATE_RESULT:
            return {
                ...state,
                updateResult: action.payload
            }
        case CLEAR_UPDATE_RESULT:
            return {
                ...state,
                updateResult: action.payload
            }
        case GET_RESULTS:
            return {
                ...state,
                getResults: action.payload
            }
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
        case UPDATE_TEAM_POINT:
            return {
                ...state,
                updateTeamPoint: action.payload
            }
        case CLEAR_UPDATE_TEAM_POINT:
            return {
                ...state,
                updateTeamPoint: action.payload
            }
        case GET_SCHEDULE:
            return {
                ...state,
                getSchedules: action.payload
            }
        case UPDATE_SCHEDULE:
            return {
                ...state,
                updateSchedule: action.payload
            }
        case CLEAR_UPDATE_SCHEDULE:
            return {
                ...state,
                updateSchedule: action.payload
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