import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout, clearErrors } from "../statemanagement/action/userAction";

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
  const clickHandler = async (e) => {
    try {
      e.preventDefault();
      if (isAuthenticated) {
        dispatch(logout());
        console.log("logout sucessfully");
      }
      if (isAuthenticated) {
      }
      // let result = await axios.post("http://localhost:5000/api/user/create", {
      //   name,
      //   password,
      //   email,
      // });
      // console.log(result.data);

      // if (result.data.success) {
      //   console.log("you have sucessfully register");
      //   console.log(result.data.user);
      //   history.push("/home");
      // }
    } catch (error) {
      console.log(error);
      dispatch(clearErrors());
    }
  };

  return (
    <div>
      <button onClick={clickHandler}>logout</button>
    </div>
  );
};

export default Header;
