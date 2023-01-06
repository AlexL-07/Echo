import csrfFetch from './csrf';
const ADD_CHANNEL = "channels/addChannel"
const ADD_CHANNELS = "channels/addChannels"
const REMOVE_CHANNEL = "channels/removeChannels"

export const addChannel = (channel) => ({
    type: ADD_CHANNEL,
    payload: channel
})

export const addChannels = (channels) => ({
    type: ADD_CHANNELS,
    payload: channels
})

export const removeChannel = (channelId) => ({
    type: REMOVE_CHANNEL,
    payload: channelId
})

export const fetchChannels = (serverId) => async (dispatch) =>{
    const res = await csrfFetch(`/api/servers/${serverId}/channels`);
    if(res.ok){
        const data = await res.json();
        dispatch(addChannels(data))
    }
}

export const fetchChannel = (channelId) => async (dispatch) => {
    const res = await csrfFetch(`/api/channels/${channelId}`)
    if(res.ok){
        const data = await res.json();
        dispatch(addChannel(data))
    }
}

export const createChannel = (channelData) => async (dispatch) => {
    const res = await csrfFetch(`/api/servers/${channelData.server_id}/channels`, {
        method: "POST",
        body: JSON.stringify(channelData)
    });
    if(res.ok){
        const data = await res.json();
        dispatch(addChannel(data));
        return data
    }
}

export const updateChannel = (channel) => async (dispatch) =>{
    const res = await csrfFetch(`/api/servers/${channel.server_id}/channels/${channel.id}`,{
        method: "PATCH",
        body: JSON.stringify(channel)
    });
    if(res.ok){
        const data = await res.json();
        dispatch(addChannel(data))
    }
}

export const deleteChannel = (channel) => async (dispatch) => {
    const res = await csrfFetch(`/api/servers/${channel.server_id}/channels/${channel.id}`, {
        method: "DELETE"
    });
    if (res.ok){
        dispatch(removeChannel(channel.id))
    }
};

const channelReducer = (state={}, action) => {
    switch (action.type){
        case ADD_CHANNELS:
            return {...action.payload }
        case ADD_CHANNEL:
            return {...state, [action.payload.id]: action.payload};
        case REMOVE_CHANNEL:
            const newState = {...state}
            delete newState[action.payload]
            return newState
        default: 
            return state
            
    }
}

export default channelReducer

