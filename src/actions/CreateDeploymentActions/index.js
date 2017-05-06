import axios from 'axios';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('id_token');

import {
    CREATE_DEPLOYMENT_REQUEST,
    CREATE_DEPLOYMENT_SUCCESS,
    CREATE_DEPLOYMENT_FAILURE
} from '../../constants/CreateDeploymentConstants';

export function getCreateDeployment() {
    return dispatch => {
        dispatch(requestGetCreateDeployment());
        dispatch(receiveGetCreateDeployment());
        dispatch(failGetCreateDeployment())
    }
}

function requestGetCreateDeployment() {
    return {
        type: CREATE_DEPLOYMENT_REQUEST,
        isFetching: true
    }
}

function receiveGetCreateDeployment() {
    return {
        type: CREATE_DEPLOYMENT_SUCCESS,
        isFetching: false,
    }
}

function failGetCreateDeployment() {
    return {
        type: CREATE_DEPLOYMENT_FAILURE,
        isFetching: false
    }
}
