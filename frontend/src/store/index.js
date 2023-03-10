import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import serverReducer from './server';
import channelReducer from './channel';
import messageReducer from './message';
import userReducer from './user';
import friendshipReducer from './friendship';
import dmChannelReducer from './dm_channel';
import directMessageReducer from './direct_message';

let enhancer;
export const rootReducer = combineReducers({
    session: sessionReducer,
    servers: serverReducer,
    channels: channelReducer,
    messages: messageReducer,
    users: userReducer,
    friendships: friendshipReducer,
    dmChannels: dmChannelReducer,
    directMessages: directMessageReducer
})

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}


const configureStore = (preloadState = {}) => {
    return createStore(rootReducer, preloadState, enhancer)
}

export default configureStore