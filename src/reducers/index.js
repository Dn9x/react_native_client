'use strict';

import { combineReducers } from 'redux';
import * as TYPES from '../actions/types';

const initialState = {
    loading: true,
    users: [],
    error: null
};

function users(state = initialState, action) {
    switch (action.type) {
        case TYPES.LOADING:
            return {
                ...state
            };
        case TYPES.USERS:
            return {
                loading: false,
                users: action.users,
                error: null
            };
        case TYPES.LOADERROR:
            return {
                loading: false,
                users: [],
                error: action.error
            };
        default:
            return state;
    }
}

export default combineReducers({
    usersStore: users,
});
