import {
  ALL_POST_REQUEST,
  ALL_POST_SUCCESS,
  ALL_POST_FAIL,
  SINGLE_POST_REQUEST,
  SINGLE_POST_SUCCESS,
  SINGLE_POST_FAIL,
  USER_POST_REQUEST,
  USER_POST_SUCCESS,
  USER_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  CLEAR_ERRORS,
} from "../constant/postConstant";

export const allPostReducer = (
  state = { post: {}, loading: false },
  action
) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      // case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_POST_SUCCESS:
      // case LOGIN_SUCCESS:
      return {
        // ...state,
        loading: false,
        post: action.payload,
      };

    case CREATE_POST_FAIL:
      return {
        loading: false,
        post: null,
        error: action.payload,
      };

    //   new
    case ALL_POST_REQUEST:
      // case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_POST_SUCCESS:
      // case LOGIN_SUCCESS:
      return {
        // ...state,
        loading: false,
        post: action.payload,
      };

    case ALL_POST_FAIL:
      return {
        loading: false,
        post: null,
        error: action.payload,
      };

    // case CLEAR_ERRORS:
    //   return {
    //     ...state,
    //     error: null,
    //   };

    default:
      return state;
  }
};
