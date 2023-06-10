import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { readAllPost, clearErrors } from "../statemanagement/action/postAction";
const HomePage = () => {
  const [mypost, Setmypost] = useState([]);
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  //  loading, post, error;

  const posts = useSelector((state) => state.allPost);

  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
    } else {
      dispatch(readAllPost());
    }

    if (posts.post) {
      Setmypost(posts.post);
    }
    if (error) {
      alert.error(error);
    }
  }, [dispatch, alert, isAuthenticated, error, history]);
  console.log("mypost", mypost);
  console.log("hellllllllllllllllllllllllllllllllllllllllll", posts.post);
  return (
    <>
      <div>homepage</div>
      {loading || posts || posts.loading ? (
        <div>loading</div>
      ) : (
        <>
          {mypost.map((ele, i) => (
            <div>
              {ele[0].postPicturePath.url}

              <div>{ele[0].userPicturePath.url}</div>
              <div>username:{ele.name}</div>

              <div>desc:{ele.description}</div>
              <div>likes:{ele.likes}</div>
              <div>numOfLikes:{ele.numOfLikes}</div>
              <div>comments:{ele.comments}</div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default HomePage;
