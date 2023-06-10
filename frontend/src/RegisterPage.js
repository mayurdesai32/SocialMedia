import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { register, clearErrors } from "./statemanagement/action/userAction";

const RegisterPage = () => {
  const [name, SetName] = useState("");
  const [password, SetPassword] = useState("");
  const [cpassword, SetCpassword] = useState("");
  const [email, SetEmail] = useState("");

  //   const alert = useAlert();
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const history = useHistory();
  const clickHandler = async (e) => {
    try {
      e.preventDefault();
      if (!name || !password || !email || !cpassword) {
        alert("please fill all input");
        console.log("gone to registration page");
      } else if (cpassword !== password) {
        alert("password and cpassword are not same");
      } else {
        const user = {
          name,
          password,
          email,
        };
        dispatch(register(user));
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
      }
    } catch (error) {
      console.log(error);
      dispatch(clearErrors());
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history]);

  return (
    <>
      <div>RegisterPage</div>
      <form action="" method="post">
        <label htmlFor="">name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => SetName(e.target.value)}
        />
        <label htmlFor="">email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => SetEmail(e.target.value)}
        />
        <label htmlFor="">password</label>
        <input
          type="text"
          value={password}
          onChange={(e) => SetPassword(e.target.value)}
        />

        <label htmlFor="">Confirm password</label>
        <input
          type="text"
          value={cpassword}
          onChange={(e) => SetCpassword(e.target.value)}
        />

        <button onClick={clickHandler}>submit</button>
      </form>
    </>
  );
};

export default RegisterPage;
