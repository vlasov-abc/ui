/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_BALANCE_REQUESTING,
  GET_BALANCE_SUCCESS,
  GET_BALANCE_FAILURE
} from '../../constants/billingConstants/getBalance';
import { webApi, routerLinks } from '../../config';

const getBalanceRequest = () => ({
  type: GET_BALANCE_REQUESTING,
  isFetching: true
});

const getBalanceSuccess = data => ({
  type: GET_BALANCE_SUCCESS,
  isFetching: false,
  data
});

const getBalanceFailure = err => ({
  type: GET_BALANCE_FAILURE,
  isFetching: false,
  err
});

const getBalanceInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetBalance = (
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getBalanceRequest());

  const response = await axios.get(`${URL}/isp/user/balance`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
      // 'X-User-ID': '76603eda-d9e0-4ed7-91be-2d5cf6ff76b2',
      // 'X-User-Role': 'user'
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getBalanceSuccess(data));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getBalanceInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(getBalanceFailure(data.message));
      break;
    }
    case 404: {
      if (data.message === 'Token was not found in storage') {
        dispatch(push(routerLinks.login));
      }
      break;
    }
    default: {
      dispatch(getBalanceFailure(data.message));
    }
  }
};

export const fetchGetBalanceIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetBalance(axios));
