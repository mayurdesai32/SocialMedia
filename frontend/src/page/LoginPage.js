import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../statemanagement/action/userAction";

const Loginpage = () => {
  const [password, Setpassword] = useState("");
  const [email, SetEmail] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const clickHandler = async (e) => {
    try {
      e.preventDefault();
      if (!password || !email) {
        alert("please fill all input");
      } else {
        console.log("login page");
        const user = {
          password,
          email,
        };
        dispatch(login(user));

        // let result = await axios.post("http://localhost:5000/api/user/login", {
        //   user: { password, email },
        // });
        // console.log(result.data);

        // if (result.data.success) {
        //   console.log("you have sucessfully login");
        //   console.log(result.data.user);
        //   history.push("/home");
        // }
      }
    } catch (error) {
      console.log(error);
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
  }, [dispatch, isAuthenticated, error, history]);

  return (
    <>
      <div>Loginpage</div>

      {loading ? (
        <>loading</>
      ) : (
        <>
          {" "}
          <form action="" method="post">
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
              onChange={(e) => Setpassword(e.target.value)}
            />

            <button onClick={clickHandler}>submit</button>
          </form>
        </>
      )}
    </>
  );
};

export default Loginpage;
