import axios from 'axios';
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
import {
    LEAGUE_SERVER,
    TEAM_SERVER,
    SCHEDULE_SERVER,
    RESULT_SERVER,
    GROUP_SERVER,
    SEMIFINAL_SERVER
} from '../misc';

export function goToProcess(id) {
    const request = axios.post(`${LEAGUE_SERVER}/gotoprocess?id=${id}`)
        .then(response => response.data);

    return {
        type: GO_TO_PROCESS,
        payload: request
    }
}

export function closeLeague(id) {
    const request = axios.post(`${LEAGUE_SERVER}/closeleague?id=${id}`)
        .then(response => response.data);

    return {
        type: CLOSE_LEAGUE,
        payload: request
    }
}

export function setFirst(dataToSubmit, id) {
    const request = axios.post(`${LEAGUE_SERVER}/setfirst?id=${id}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: SET_FIRST,
        payload: request
    }
}

export function setSecond(dataToSubmit, id) {
    const request = axios.post(`${LEAGUE_SERVER}/setsecond?id=${id}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: SET_SECOND,
        payload: request
    }
}

export function setThird(dataToSubmit, id) {
    const request = axios.post(`${LEAGUE_SERVER}/setthird?id=${id}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: SET_THIRD,
        payload: request
    }
}

export function addSemifinal(dataToSubmit, id) {
    const request = axios.post(`${SEMIFINAL_SERVER}/addsemifinal?id=${id}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_SEMIFINAL,
        payload: request
    }
}

export function clearAddSemifinal() {
    return {
        type: CLEAR_ADD_SEMIFINAL,
        payload: ''
    }
}

export function pushTeamToGroup(dataToSubmit, id) {
    const request = axios.post(`${GROUP_SERVER}/pushteamtogroup?id=${id}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: PUSH_TEAM_TO_GROUP,
        payload: request
    }
}

export function addGroup(dataToSubmit, id) {
    const request = axios.post(`${GROUP_SERVER}/addgroup?id=${id}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_GROUP,
        payload: request
    }
}

export function clearAddGroup() {
    return {
        type: CLEAR_ADD_GROUP,
        payload: ''
    }
}

export function getGroups() {
    const request = axios.get(`${GROUP_SERVER}/getgroups`)
        .then(response => response.data);

    return {
        type: GET_GROUPS,
        payload: request
    }
}

export function getScheduleByid(id) {
    const request = axios.get(`${SCHEDULE_SERVER}/getschedulebyid?clientid=${id}`)
        .then(response => response.data)

    return {
        type: GET_SCHEDULE_BY_ID,
        payload: request
    }
}

export function addResult(dataToSubmit, id) {
    const request = axios.post(`${RESULT_SERVER}/addresult?id=${id}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_RESULT,
        payload: request
    }
}

export function clearAddResult() {
    return {
        type: CLEAR_ADD_RESULT,
        payload: ''
    }
}

export function updateResult(dataToSubmit, id, type, resultid) {
    const request = axios.post(`${RESULT_SERVER}/updateresult?id=${id}&type=${type}&resultid=${resultid}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: UPDATE_RESULT,
        payload: request
    }
}

export function clearUpdateResult() {
    return {
        type: CLEAR_UPDATE_RESULT,
        payload: ''
    }
}

export function updateLeagueSchedule(dataToSubmit) {
    const request = axios.post(`${LEAGUE_SERVER}/updateleagueschedule`, dataToSubmit)
        .then(response => response.data);

    return {
        type: UPDATE_LEAGUE_SCHEDULE,
        payload: request
    }
}

export function clearUpdateLeagueSchedule() {
    return {
        type: CLEAR_UPDATE_LEAGUE_SCHEDULE,
        payload: ''
    }
}

export function updateLeagueTeam(dataToSubmit) {
    const request = axios.post(`${LEAGUE_SERVER}/updateleagueteam`, dataToSubmit)
        .then(response => response.data);

    return {
        type: UPDATE_LEAGUE_TEAM,
        payload: request
    }
}

export function clearUpdateLeagueTeam() {
    return {
        type: CLEAR_UPDATE_LEAGUE_TEAM,
        payload: ''
    }
}

export function addTeam(dataToSubmit) {
    const request = axios.post(`${TEAM_SERVER}/addteam`, dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_TEAM,
        payload: request
    }
}

export function clearAddTeam() {
    return {
        type: CLEAR_ADD_TEAM,
        payload: ''
    }
}

export function getTeams() {
    const request = axios.get(`${TEAM_SERVER}/getteams`)
        .then(response => response.data);

    return {
        type: GET_TEAMS,
        payload: request
    }
}

export function updateTeam(dataToSubmit) {
    const request = axios.post(`${TEAM_SERVER}/updateteam`, dataToSubmit)
        .then(response => response.data);

    return {
        type: UPDATE_TEAM,
        payload: request
    }
}

export function updateTeamPoint(dataToSubmit, id) {
    const request = axios.post(`${TEAM_SERVER}/updateteampoint?id=${id}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: UPDATE_TEAM_POINT,
        payload: request
    }
}

export function clearUpdateTeam() {
    return {
        type: CLEAR_UPDATE_TEAM,
        payload: ''
    }
}

export function clearUpdateTeamPoint() {
    return {
        type: CLEAR_UPDATE_TEAM_POINT,
        payload: ''
    }
}

export function getSchedules() {
    const request = axios.get(`${SCHEDULE_SERVER}/getschedule`)
        .then(response => response.data);

    return {
        type: GET_SCHEDULE,
        payload: request
    }
}

export function updateSchedule(dataToSubmit, id) {
    const request = axios.post(`${SCHEDULE_SERVER}/updateschedule?id=${id}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: UPDATE_SCHEDULE,
        payload: request
    }
}

export function clearUpdateSchedule() {
    return {
        type: CLEAR_UPDATE_SCHEDULE,
        payload: ''
    }
}

export function joinTeamLeague(teamid) {
    const request = axios.post(`${TEAM_SERVER}/jointeamleague?teamid=${teamid}`)
        .then(response => response.data);

    return {
        type: JOIN_TEAM_LEAGUE,
        payload: request
    }
}

export function cancelTeamLeague(teamid) {
    const request = axios.post(`${TEAM_SERVER}/cancelteamleague?teamid=${teamid}`)
        .then(response => response.data);

    return {
        type: CANCEL_TEAM_LEAGUE,
        payload: request
    }
}

export function addLeague(dataToSubmit) {
    const request = axios.post(`${LEAGUE_SERVER}/addleague`, dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_LEAGUE,
        payload: request
    }
}

export function clearLeague() {
    return {
        type: CLEAR_LEAGUE,
        payload: ''
    }
}

export function updateLeague(dataToSubmit) {
    const request = axios.post(`${LEAGUE_SERVER}/updateleague`, dataToSubmit)
        .then(response => response.data);

    return {
        type: UPDATE_LEAGUE,
        payload: request
    }
}

export function clearUpdateLeague() {
    return {
        type: CLEAR_UPDATE_LEAGUE,
        payload: ''
    }
}

export function getLeague() {
    const request = axios.get(`${LEAGUE_SERVER}/getleague`)
        .then(response => response.data);

    return {
        type: GET_LEAGUE,
        payload: request
    }
}

export function getLeagueByid(id) {
    const request = axios.get(`${LEAGUE_SERVER}/getleaguebyid?clientid=${id}`)
        .then(response => response.data)

    return {
        type: GET_LEAGUE_BY_ID,
        payload: request
    }
}