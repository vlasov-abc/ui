import {
    DEPLOYMENTS_REQUEST,
    DEPLOYMENTS_SUCCESS,
    DEPLOYMENTS_FAILURE
} from '../constants/DeploymentsConstants';

export default function DeploymentsReducer(state = {
    isFetching: false,
    data: [],
    errorMessage: ''
}, action) {
    switch (action.type) {
    case DEPLOYMENTS_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching
        });
    case DEPLOYMENTS_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data
        });
    case DEPLOYMENTS_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message
        });
    default:
        return state
    }
}