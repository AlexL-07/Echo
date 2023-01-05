import csrfFetch from './csrf';

const ADD_SERVER = "servers/addServer";
const ADD_SERVERS = "servers/addServers";
const REMOVE_SERVER = "servers/removeServer";

export const addServer = (server) => ({
    type: ADD_SERVER,
    server: server
})

export const addServers = (servers) => ({
    type: ADD_SERVERS,
    servers
})

export const removeServer = (serverId) => ({
    type: REMOVE_SERVER,
    payload: serverId
})

export const fetchServers = () => async (dispatch) => {
    const res = await csrfFetch('/api/servers');
    if(res.ok){
        const data = await res.json();
        dispatch(addServers(data))
    }
}

export const fetchServer = (serverId) => async (dispatch) => {
    const res = await csrfFetch(`/api/servers/${serverId}`);
    if (res.ok){
        const data = await res.json();
        dispatch(addServer(data))
    }
}

export const createServer = (server) => async (dispatch) => {
    const res = await csrfFetch("/api/servers", {
        method: "POST",
        body: JSON.stringify({
            server: server
        })
    });
    if(res.ok){
        const data = await res.json();
        dispatch(addServer(data));
        return data
    }
}

export const updateServer = (server) => async (dispatch) => {
    const res = await csrfFetch("/api/servers", {
        method: "PATCH",
        body: JSON.stringify({
            server: server
        })
    });
    if(res.ok){
        const data = await res.json();
        dispatch(addServer(data));
    }
}

export const deleteServer = (serverId) => async (dispatch) => {
    const res = await csrfFetch(`/api/servers/${serverId}`, {
        method: "DELETE",
    })
    if (res.ok){
        dispatch(removeServer(serverId))
    }
}

const serverReducer = (state ={}, action) => {
    switch (action.type) {
        case ADD_SERVERS:
            return { ...action.servers }
        case ADD_SERVER:
            return {...state, [action.server.id]: action.server};
        case REMOVE_SERVER: 
            const newState = {...state}
            delete newState[action.payload.serverId]
            return newState 
        default:
            return state

    }
}

export default serverReducer;

