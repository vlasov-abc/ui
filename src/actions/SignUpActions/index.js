import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE
} from '../../constants/SignUpConstants';

import {
    VALIDATE_EMAIL
} from '../../constants/ValudateEmailConstaints';

import {
    WEB_API
} from '../../constants/WebApi';

export function SignUpUser(creds) {
    return dispatch => {
        dispatch(requestSignUp(creds));
        return axios.post(
            WEB_API + '/api/users',
            { username: creds.username, password: creds.password },
            {
                validateStatus: (status) => status >= 200 && status <= 505
            }
        )
            .then(response => {
                if (response.status === 200 || response.status === 201) {
                    dispatch(receiveSignUp());
                    dispatch(confirmEmail(creds.username));
                    browserHistory.push('/ConfirmEmail');
                } else {
                    dispatch(SignUpError(response.data.message));
                }
            }).catch(err => console.log(err));
    };
}

export function confirmEmail(emailUser) {
    return {
        type: VALIDATE_EMAIL,
        isValidEmail: true,
        emailUser
    };
}

function requestSignUp(creds) {
    return {
        type: SIGNUP_REQUEST,
        isFetching: true,
        creds
    };
}

function receiveSignUp() {
    return {
        type: SIGNUP_SUCCESS,
        isFetching: false
    };
}

function SignUpError(message) {
    return {
        type: SIGNUP_FAILURE,
        isFetching: false,
        message
    };
}

