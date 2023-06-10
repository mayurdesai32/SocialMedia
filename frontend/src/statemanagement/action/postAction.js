import axios from "axios";
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
  CREATE_POST_RESET,
  CREATE_POST_FAIL,
  CLEAR_ERRORS,
} from "../constant/postConstant";

export const createPost = (postData) => async (dispatch, getState) => {
  try {
    console.log("hello world", postData);
    dispatch({ type: CREATE_POST_REQUEST });
    console.log("postData", postData);

    const result = await axios.post(
      "http://localhost:5000/api/post/createpost",
      postData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("postData", { withCredentials: true }, result.data);
    dispatch({
      type: CREATE_POST_SUCCESS,
      //   payload: data.user,
      payload: result.data,
    });
    // localStorage.setItem("user", JSON.stringify(getState().auth.user));
  } catch (error) {
    dispatch({
      type: CREATE_POST_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const readAllPost = () => async (dispatch, getState) => {
  try {
    // console.log("hello world", postData);
    dispatch({ type: ALL_POST_REQUEST });
    console.log("postData");

    const result = await axios.get(
      "http://localhost:5000/api/post/getallposts",
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("postData", { withCredentials: true }, result.data);
    dispatch({
      type: ALL_POST_SUCCESS,
      //   payload: data.user,
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: ALL_POST_FAIL,
      payload: error.response.data.message,
    });
  }
};
