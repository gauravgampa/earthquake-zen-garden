import "./App.scss";

import NavBar from "components/NavBar";
import React from "react";

const App = () => {
  const earthquakeData = {
    site: {
      title: "Earthquake Zen Garden",
      heroImage:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Arenal_Volcano_07_2015_CRI_3828.jpg/1920px-Arenal_Volcano_07_2015_CRI_3828.jpg",
      logoImage: "https://www.realtor.com/realtor-com.png",
    },
    profile: {
      firstName: "Sally",
      lastName: "Wang",
      avatarImage:
        "https://upload.wikimedia.org/wikipedia/commons/5/59/That_Poppy_profile_picture.jpg",
      phone: "01-343-989-2345",
      email: "sw@nowhere.ic.kp",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
    },
  };

  const { site, profile, data } = earthquakeData;

  return (
    <div className="app">
      <NavBar
        logoImage={site.logoImage}
        title={site.title}
        firstName={profile.firstName}
      />
      <main className="content"></main>
    </div>
  );
};

export default App;
