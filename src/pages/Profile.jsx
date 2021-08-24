import "./Profile.scss";

import KeyValuePairs, { KeyValueCellType } from "components/KeyValuePairs";

import React from "react";

const Profile = ({ profile }) => {
  const { avatarImage, ...userDetails } = profile;
  const requiredHeaders = Object.keys(userDetails).map((key) => ({
    name: key,
    type: KeyValueCellType.TEXT,
  }));

  return (
    <>
      <h2>Profile</h2>
      <div className="profile-container">
        <div className="avatar-container">
          <img
            className="avatar"
            src={avatarImage}
            alt={userDetails.firstName}
          />
        </div>
        <KeyValuePairs headers={requiredHeaders} content={userDetails} />
      </div>
    </>
  );
};

export default Profile;
