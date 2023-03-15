import React, { useState, useEffect } from "react";

const DisplayUser = () => {
  const [userDetails, setUserDetails] = useState({});
  const token = window.localStorage.getItem("token");

  /* if (!userDetails.username) {
    return;
  } */
  useEffect(() => {
    fetch("/api/auth/", {
      method: "GET",
      headers: {
        authorization: token,
      },
    })
      .then((response) => response.json())
      .then((user) => {
        setUserDetails(user);
        console.log(user);
      });
  }, []);

  return (
    <ul>
      <li>
        <h3>
          <li>{userDetails.username}</li>
        </h3>
      </li>
    </ul>
  );
};

export default DisplayUser;
