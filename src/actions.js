import axios from 'axios';
export const GET_USER_DATA = 'GET_USER_DATA';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';
export const SET_LOGIN = 'SET_LOGIN';
export const SET_ACTIVE_BOARD = 'SET_ACTIVE_BOARD';
export const CREATE_BOARD = 'CREATE_BOARD';
export const DELETE_BOARD = 'DELETE_BOARD';
export const CREATE_LIST = 'CREATE_LIST';
export const DELETE_LIST = 'DELETE_LIST';
export const GET_BOARD_SUCCESS = 'GET_BOARD_SUCCESS';
export const GET_BOARD_REQUEST = 'GET_BOARD_REQUEST';
export const GET_BOARD_FAILURE = 'GET_BOARD_FAILURE';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export function getUserRequest() {
  return {
    type: GET_USER_REQUEST
  };
}

export function getUserSuccess(data) {
  return {
    type: GET_USER_SUCCESS,
    data
  };
}

export function getUserFailure(error) {
  return {
    type: GET_USER_FAILURE,
    error
  };
}

export function getBoardRequest() {
  return {
    type: GET_BOARD_REQUEST
  };
}

export function getBoardSuccess(data) {
  return {
    type: GET_BOARD_SUCCESS,
    data
  };
}

export function getBoardFailure(error) {
  return {
    type: GET_BOARD_FAILURE,
    error
  };
}

export function getBoard(board) {
  return dispatch => {
    dispatch(getBoardRequest());
    console.log('Dispatching to get ', board);
    fetch(`http://localhost:5000/api/v1/boards/${board}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Response not ok');
        }
        return response.json();
      })
      .then(json => {
        dispatch(getBoardSuccess(json));
      })
      .catch(error => {
        console.log(error);
        dispatch(getBoardFailure(error));
      });
  };
}

export function getUser(data) {
  return dispatch => {
    dispatch(getUserRequest());
    const body = {
      username: data.user.username,
      password: data.user.password
    };

    axios
      .post(`http://localhost:5000/api/v1/login`, {
        username: data.user.username,
        password: data.user.password
      })
      .then(response => {
        console.log('Response:', response);
        if (response.status != 200) {
          throw new Error('Response not ok');
        }
        return response;
      })
      .then(response => {
        console.log('Successful response:', response.data);
        dispatch(getUserSuccess(response.data));
      })
      .catch(function(error) {
        console.log('Error:', error);
        dispatch(getUserFailure(error));
      });
  };
}

export function setLogin(data) {
  return {
    type: SET_LOGIN,
    data
  };
}

export function setActiveBoard(data) {
  return {
    type: SET_ACTIVE_BOARD,
    data
  };
}

export function createBoard(data) {
  return {
    type: CREATE_BOARD,
    data
  };
}

export function deleteBoard(data) {
  return {
    type: DELETE_BOARD,
    data
  };
}

export function createList(data) {
  return {
    type: CREATE_LIST,
    data
  };
}

export function deleteList(data) {
  return {
    type: DELETE_LIST,
    data
  };
}
