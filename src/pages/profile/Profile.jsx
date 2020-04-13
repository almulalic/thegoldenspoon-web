import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";

const Profile = (props) => {
  const [nameInput, setNameInput] = useState("");
  return (
    <div>
      <Navbar />
      <p>PROFILLLLLLLLLLLLLLLLL</p>
    </div>
  );
};

export default Profile;
