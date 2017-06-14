import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    PROFILE_REQUEST,
    PROFILE_SUCCESS,
    PROFILE_FAILURE
} from '../../constants/ProfileConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function getProfile() {
    return dispatch => {
        dispatch(requestGetProfile());
        const token = localStorage.getItem('id_token');
        const api = WEB_API + '/api/profile';

        return axios.get(
            api,
            {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/x-www-form-urlencode',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=-1, private'
                },
                validateStatus: (status) => status >= 200 && status <= 500
            }
        )
        .then(response => {
            if (response.status === 200 || response.status === 201) {
                dispatch(receiveGetProfile(response.data));
            } else if (response.status === 401) {
                localStorage.removeItem('id_token');
                browserHistory.push('/Login');
            } else {
                dispatch(failGetProfile(response.data.message))
            }
        }).catch(err => console.log(err))
    }
}

function requestGetProfile() {
    return {
        type: PROFILE_REQUEST,
        isFetching: true
    }
}

function receiveGetProfile(data) {
    return {
        type: PROFILE_SUCCESS,
        isFetching: false,
        data
    }
}

function failGetProfile(message) {
    return {
        type: PROFILE_FAILURE,
        isFetching: false,
        message
    }
}
