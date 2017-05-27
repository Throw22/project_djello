import * as Actions from './actions';

const initialState = {
  isLoggedIn: false,
  user: {},
  isFetching: false,
  error: null,
  activeBoard: 0
};

export function djelloApp(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case Actions.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.data,
        currentBoard: action.data.boards[0],
        isLoggedIn: true,
        isFetching: false
      };
    case Actions.GET_USER_FAILURE:
      return {
        ...state,
        user: { note: 'This is wrong' },
        isFetching: false,
        error: action.error
      };
    case Actions.GET_BOARD_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case Actions.GET_BOARD_SUCCESS:
      return {
        ...state,
        currentBoard: action.data,
        isFetching: false
      };
    case Actions.GET_BOARD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case Actions.SET_LOGIN:
      return {
        ...state,
        isLoggedIn: action.data.isLoggedIn
      };
    default:
      return state;
  }
}
