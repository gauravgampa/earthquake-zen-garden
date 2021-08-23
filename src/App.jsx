import "./App.scss";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Detail from "pages/Detail";
import Home from "pages/Home";
import Loading from "components/Loading";
import NavBar from "components/NavBar";
import Profile from "pages/Profile";
import React from "react";
import useFetch from "hooks/useFetch";

const App = () => {
  const {
    data: earthquakeData,
    loading,
    error,
  } = useFetch(`/eartquake-data.json`);

  if (loading) {
    return <Loading />;
  } else if (!earthquakeData || error) {
    return <div>No data found at this time. Come back later.</div>;
  }

  const { site, profile, data } = earthquakeData;

  return (
    <Router>
      <div className="app">
        <NavBar
          logoImage={site.logoImage}
          title={site.title}
          firstName={profile.firstName}
        />
        <main className="content">
          <Switch>
            <Route exact path="/">
              <Home data={data} />
            </Route>
            <Route path="/detail/:detail_id">
              <Detail></Detail>
            </Route>
            <Route path="/profile">
              <Profile profile={profile} />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
