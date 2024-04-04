import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import Notes from "./Notes";
// import AddNote from "./AddNote";
const Home = ({ isSignedUp, userAuthToken }) => {
  return (
    <div>
      {!isSignedUp && <Navigate to="/signup" />}

      {isSignedUp && <Notes userAuthToken={userAuthToken} />}
    </div>
  );
};

export default Home;
