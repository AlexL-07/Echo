import csrfFetch from "./csrf";


const ADD_USER = "users/addUser"
const ADD_USERS = "users/addUsers"
const REMOVE_USER = "users/removeUser"

export const addUser = (user) => ({
    type: ADD_USER,
    payload: user
})

export const addUsers = (users) => ({
    type: ADD_USERS,
    payload: users
})

export const removeUser = (userId) => ({
    type: REMOVE_USER,
    payload: userId
})

export const fetchUser = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}`)
    if(res.ok){
        const data = await res.json();
        dispatch(addUser(data))
    }
}

export const fetchUsers = (serverId) => async (dispatch) => {
    const res = await csrfFetch(`/api/servers/${serverId}/users`)
    if(res.ok){
        const data = await res.json();
        dispatch(addUsers(data))
    }
}

export const updateUser = (userData) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userData.id}`, {
        method: "PATCH",
        body: JSON.stringify(userData)
    });
    if(res.ok){
        const data = await res.json();
        dispatch(addUser(data.user))
    }
}

export const deleteUser = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}`, {
        method: "DELETE",
    });
    if(res.ok){
        dispatch(removeUser(userId))
    }
}

const userReducer = (state={}, action) => {
    switch (action.type){
        case ADD_USERS:
            return {...action.payload}
        case ADD_USER:
            return {...state, [action.payload.id]: action.payload};
        case REMOVE_USER:
            const newState = {...state}
            delete newState[action.payload]
            return newState
        default: 
            return state
    }
}

export default userReducer