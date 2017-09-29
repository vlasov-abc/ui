import axios from 'axios';
import { browserHistory } from 'react-router';
// import md5 from 'md5';

import {
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE
} from '../../constants/ChangePasswordConstaints';

import {
    WEB_API
} from '../../constants/WebApi';

export function changePassword(data) {
    return dispatch => {
        dispatch(requestChangePassword());
        const token = localStorage.getItem('id_token');
        const browser = localStorage.getItem('id_browser');
        const api = WEB_API + '/api/password_change';
        // const password = md5(data.password).toString(16);
        // const new_password = md5(data.new_password).toString(16);

        return axios.post(
            api,
            { password: data.password, new_password: data.new_password },
            {
                headers: {
                    'Authorization': token,
                    'X-User-Fingerprint': browser,
                    'Access-Control-Allow-Origin': '*'
                },
                validateStatus: (status) => status >= 200 && status <= 505
            }
        )
        .then(response => {
            if (response.status === 202) {
                dispatch(receiveChangePassword(response.data));
                localStorage.setItem('id_token', response.data.token);
            } else if (response.status === 401) {
                localStorage.removeItem('id_token');
                browserHistory.push('/Login');
            } else {
                dispatch(failChangePassword(response.data.message));
            }
        }).catch(err => console.log(err));
    };
}

function requestChangePassword() {
    return {
        type: CHANGE_PASSWORD_REQUEST,
        isFetching: true
    };
}

function receiveChangePassword(data) {
    return {
        type: CHANGE_PASSWORD_SUCCESS,
        isFetching: false,
        data
    };
}

function failChangePassword(message) {
    return {
        type: CHANGE_PASSWORD_FAILURE,
        isFetching: false,
        message
    };
}
