import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  //   LOGIN_REQUEST,
  //   LOGIN_SUCCESS,
  //   LOGIN_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
} from "../constant/userConstant";

// Register user
export const register = (userData) => async (dispatch, getState) => {
  try {
    console.log("hello world", userData);
    dispatch({ type: REGISTER_USER_REQUEST });
    console.log("userData", userData);

    const result = await axios.post(
      "http://localhost:5000/api/user/create",
      userData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("userData", { withCredentials: true }, result.data);
    dispatch({
      type: REGISTER_USER_SUCCESS,
      //   payload: data.user,
      payload: result.data,
    });
    localStorage.setItem("user", JSON.stringify(getState().auth.user));
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Login
export const login = (userData) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    console.log("userData", userData);
    const { data } = await axios.post(
      "http://localhost:5000/api/user/login",
      userData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
    localStorage.setItem("user", JSON.stringify(getState().auth.user));
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Logout user
export const logout = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:5000/api/user/logout", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log("hello world" + response);

    dispatch({
      type: LOGOUT_SUCCESS,
    });
    localStorage.removeItem("user");
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
