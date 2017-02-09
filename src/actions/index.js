'use strict';

import * as TYPES from './types';

import { AlertIOS } from 'react-native';

export function getUsers(opt) {
    return (dispatch) => {
        dispatch({ 'type': TYPES.LOADING });
        var url = 'http://localhost:3000/api/users?';

        //这里服务端做了分页和排序和搜索，但是客户端这里只演示了搜索
        if (opt && opt.q) {
            url += 'q=' + opt.q;
        }
        let users = fetch(url)
            .then((response) => response.json())
            .then((res) => {
                dispatch({ 'type': TYPES.USERS, users: res });
            }).catch((e) => {
                AlertIOS.alert(e.message);
                dispatch({ 'type': TYPES.LOADERROR, error: e });
            });
    };
}
