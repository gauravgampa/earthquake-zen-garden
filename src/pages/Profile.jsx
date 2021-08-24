import "./Profile.scss";

import React from "react";
import { convertToSentenceCase } from "utils/text";

const Profile = ({ profile }) => {
  const { avatarImage, ...userDetails } = profile;

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
        <table>
          <tbody>
            {Object.entries(userDetails).map(([key, value], index) => {
              return (
                <tr key={index}>
                  <td className="key-cell">{convertToSentenceCase(key)}</td>
                  <td className="value-cell">{value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Profile;
