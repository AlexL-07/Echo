import csrfFetch from "./csrf";

export const ADD_DIRECT_MESSAGES = "messages/addDirectMessages"
export const ADD_DIRECT_MESSAGE = "messages/addDirectMessage"
export const REMOVE_DIRECT_MESSAGE = "messages/removeDirectMessage"

export const addDirectMessages = (messages) => ({
    type: ADD_DIRECT_MESSAGES,
    payload: messages
})

export const addDirectMessage = (message) => ({
    type: ADD_DIRECT_MESSAGE,
    payload: message
})

export const removeDirectMessage = (messageId) => ({
    type: REMOVE_DIRECT_MESSAGE,
    payload: messageId
})

export const fetchDirectMessages = (dmChannelId) => async dispatch => {
    const res = await csrfFetch(`/api/dm_channels/${dmChannelId}/direct_messages`)
    if(res.ok){
        const data = await res.json();
        dispatch(addDirectMessages(data))
    }
}

export const createDirectMessage = (dmChannelId, messageData) => async dispatch =>{
    const res = await csrfFetch(`/api/dm_channels/${dmChannelId}/direct_messages`, {
        method: "POST",
        body: JSON.stringify(messageData)
    });
    // if(res.ok){
    //     const data = res.json();
    //     dispatch(addMessage(data))
    // }
}

export const updateDirectMessage = (messageData) => async dispatch => {
    const res = await csrfFetch(`/api/direct_messages/${messageData.id}`,{
        method: "PATCH",
        body: JSON.stringify(messageData)
    });
}

export const deleteDirectMessage = (messageId) => async dispatch =>{
    const res = await csrfFetch(`/api/direct_messages/${messageId}`,{
        method: "DELETE"
    });
    if(res.ok){
        dispatch(removeDirectMessage(messageId))
    }
}

const directMessageReducer = (state = {}, action) => {
    switch(action.type){
        case ADD_DIRECT_MESSAGES:
            return {...action.payload}
        case ADD_DIRECT_MESSAGE:
            return { ...state, [action.payload.id]: action.payload}
        case REMOVE_DIRECT_MESSAGE:
            const newState = {...state}
            delete newState[action.payload]
            return newState
        default:
            return state
    }
}

export default directMessageReducer