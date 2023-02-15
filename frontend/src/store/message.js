import csrfFetch from "./csrf";

export const ADD_MESSAGES = "messages/addMessages"
export const ADD_MESSAGE = "messages/addMessage"
export const REMOVE_MESSAGE = "messages/removeMessage"

export const addMessages = (messages) => ({
    type: ADD_MESSAGES,
    payload: messages
})

export const addMessage = (message) => ({
    type: ADD_MESSAGE,
    payload: message
})

export const removeMessage = (messageId) => ({
    type: REMOVE_MESSAGE,
    payload: messageId
})

export const fetchMessages = (serverId, channelId) => async dispatch => {
    const res = await csrfFetch(`/api/servers/${serverId}/channels/${channelId}/messages`)
    if(res.ok){
        const data = await res.json();
        dispatch(addMessages(data))
    }
}

export const createMessage = (channelId, messageData) => async dispatch =>{
    const res = await csrfFetch(`/api/channels/${channelId}/messages/`, {
        method: "POST",
        body: JSON.stringify(messageData)
    });
    // if(res.ok){
    //     const data = res.json();
    //     dispatch(addMessage(data))
    // }
}

export const updateMessage = (serverId, channelId, messageData) => async dispatch => {
    const res = await csrfFetch(`/api/servers/${serverId}/channels/${channelId}/messages/${messageData.id}`,{
        method: "PATCH",
        body: JSON.stringify(messageData)
    });
}

export const deleteMessage = (serverId, channelId, messageId) => async dispatch =>{
    const res = await csrfFetch(`/api/servers/${serverId}/channels/${channelId}/messages/${messageId}`,{
        method: "DELETE"
    });
    if(res.ok){
        dispatch(removeMessage(messageId))
    }
}

const messageReducer = (state = {}, action) => {
    switch(action.type){
        case ADD_MESSAGES:
            return {...action.payload}
        case ADD_MESSAGE:
            return { ...state, [action.payload.id]: action.payload}
        case REMOVE_MESSAGE:
            const newState = {...state}
            delete newState[action.payload]
            return newState
        default:
            return state
    }
}

export default messageReducer