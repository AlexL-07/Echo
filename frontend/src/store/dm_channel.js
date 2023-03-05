import csrfFetch from './csrf';
import { addServer } from './server';

const ADD_DM_CHANNELS = "dmChannels/addDMChannels";
const ADD_DM_CHANNEL = "dmChannels/addDMChannel";
const REMOVE_DM_CHANNEL = "dmChannels/removeDMChannel";

export const addDMChannels = (dmChannels) => ({
    type: ADD_DM_CHANNELS,
    payload: dmChannels
})

export const addDMChannel = (dmChannel) => ({
    type: ADD_DM_CHANNEL,
    payload: dmChannel
})

export const removeDMChannel = (dmChannelId) => ({
    type: REMOVE_DM_CHANNEL,
    payload: dmChannelId
})

export const fetchDMChannels = () => async (dispatch) => {
    const res = await csrfFetch('/api/dm_channels');
    if(res.ok){
        const data = await res.json();
        dispatch(addDMChannels(data))
    }
}

export const fetchDMChannel = (dmChannelId) => async (dispatch) => {
    const res = await csrfFetch(`/api/dm_channels/${dmChannelId}`);
    if(res.ok){
        const data = await res.json();
        dispatch(addDMChannel(data))
    }
}

export const createDMChannel = (dmChannel) => async (dispatch) => {
    const res = await csrfFetch('/api/dm_channels', {
        method: "POST",
        body: JSON.stringify({
            dmChannel: dmChannel
        })
    });
    if(res.ok){
        const data = await res.json();
        dispatch(addDMChannel(data));
        return data
    }
}

export const updateDMChannel = (dmChannel) => async (dispatch) => {
    const res = await csrfFetch(`/api/dm_channels/${dmChannel.id}`,{
        method: "PATCH",
        body: JSON.stringify({
            dmChannel: dmChannel
        })
    });

    if(res.ok){
        const data = await res.json();
        dispatch(addDMChannel(data))   
    }
}

export const deleteDMChannel = (dmChannelId) => async (dispatch) => {
    const res = await csrfFetch(`/api/dm_channels/${dmChannelId}`, {
        method: "DELETE",
    })
    if (res.ok){
        dispatch(removeDMChannel(dmChannelId))
    }
}

export const createDMMembership = (membershipData) => async (dispatch) => {
    const res = await csrfFetch('/api/dm_channel_memberships', {
        method: "POST",
        body: JSON.stringify(membershipData)
    });
    if (res.ok){
        const data = await res.json();
        dispatch(addDMChannel(data.dmChannel))
    }
}

export const removeDMMembership = (dmChannelId, membershipId) => async (dispatch) =>{
    const res = await csrfFetch(`/api/dm_channel_memberships/${membershipId}`,{
        method: "DELETE"
    });
    if(res.ok){
        dispatch(removeDMChannel(dmChannelId))
    }
}

const dmChannelReducer = (state ={}, action) => {
    switch (action.type) {
        case ADD_DM_CHANNELS:
            return { ...action.payload }
        case ADD_DM_CHANNEL:
            return {...state, [action.payload.id]: action.payload};
        case REMOVE_DM_CHANNEL: 
            const newState = {...state}
            delete newState[action.payload]
            return newState 
        default:
            return state

    }
}

export default dmChannelReducer;