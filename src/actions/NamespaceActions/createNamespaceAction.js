import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    CREATE_NAMESPACE_REQUEST,
    CREATE_NAMESPACE_SUCCESS,
    CREATE_NAMESPACE_FAILURE
} from '../../constants/NamespaceConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function createNamespace(idName, tariff) {
    return dispatch => {
        dispatch(requestCreateNamespace());
        const token = localStorage.getItem('id_token');
        const browser = localStorage.getItem('id_browser');

        return axios.post(
            WEB_API + '/api/namespaces',
            {
                label: idName,
                tariff_label: tariff
            },
            {
                headers: {
                    'Authorization': token,
                    'X-User-Fingerprint': browser,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=-1, private'
                },
                validateStatus: (status) => status >= 200 && status <= 500
            }
        )
        .then(response => {
            // console.log(response);
            if (response.status === 201) {
                dispatch(receiveCreateNamespace(response.data, response.status));
                browserHistory.push('/Namespaces');
            } else if (response.status === 401) {
                localStorage.removeItem('id_token');
                browserHistory.push('/Login');
            } else {
                dispatch(failCreateNamespace(response.data.message, response.status));
            }
        }).catch(err => {dispatch(failCreateNamespace(err, 503)); console.log(err)})
    };
}

function requestCreateNamespace() {
    return {
        type: CREATE_NAMESPACE_REQUEST,
        isFetching: true
    };
}

function receiveCreateNamespace(data, status) {
    return {
        type: CREATE_NAMESPACE_SUCCESS,
        isFetching: false,
        data,
        status
    };
}

function failCreateNamespace(message, status) {
    return {
        type: CREATE_NAMESPACE_FAILURE,
        isFetching: false,
        message,
        status
    };
}
