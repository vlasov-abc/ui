/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  DELETE_SERVICE_REQUESTING,
  DELETE_SERVICE_SUCCESS,
  DELETE_SERVICE_FAILURE
} from '../../constants/serviceConstants/deleteService';
import { webApiLogin } from '../../config';

const deleteServiceRequest = () => ({
  type: DELETE_SERVICE_REQUESTING,
  isFetching: true
});

const deleteServiceSuccess = (data, status, method, idSrv) => ({
  type: DELETE_SERVICE_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  idSrv
});

const deleteServiceFailure = (err, status, idSrv) => ({
  type: DELETE_SERVICE_FAILURE,
  isFetching: false,
  err,
  status,
  idSrv
});

const deleteServiceInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchDeleteService = (
  idName: string,
  idSrv: string,
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  const accessToken = cookie.load('accessToken')
    ? cookie.load('accessToken')
    : null;

  dispatch(deleteServiceRequest());

  const response = await axios.delete(
    `${URL}/namespace/${idName}/service/${idSrv}`,
    {
      headers: {
        'User-Client': browser,
        'User-Token': accessToken
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { data, status, config } = response;
  switch (status) {
    case 200: {
      dispatch(deleteServiceSuccess(data, 202, config.method, idSrv));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(deleteServiceInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(deleteServiceFailure(data.message, status, idSrv));
      break;
    }
    default: {
      dispatch(deleteServiceFailure(data.message, status, idSrv));
    }
  }
};

export const fetchDeleteServiceIfNeeded = (
  idName: string,
  idSrv: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchDeleteService(idName, idSrv, axios));
