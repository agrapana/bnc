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
    UPDATE_LEAGUE_SCHEDULE,
    CLEAR_UPDATE_LEAGUE_SCHEDULE,
    ADD_TEAM,
    CLEAR_ADD_TEAM,
    GET_TEAMS,
    UPDATE_TEAM,
    CLEAR_UPDATE_TEAM
} from '../types';
import { LEAGUE_SERVER, TEAM_SERVER } from '../misc';

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

export function clearUpdateTeam() {
    return {
        type: CLEAR_UPDATE_TEAM,
        payload: ''
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
    const request = axios.get(`${LEAGUE_SERVER}/getleaguebyid?id=${id}&type=single`)
        .then(response => {
            return response.data[0]
        })

    return {
        type: GET_LEAGUE_BY_ID,
        payload: request
    }
}