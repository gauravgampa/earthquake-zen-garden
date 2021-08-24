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

  return (
    <Router>
      <div className="app">
        {earthquakeData ? (
          <>
            <NavBar
              logoImage={earthquakeData.site.logoImage}
              title={earthquakeData.site.title}
              firstName={earthquakeData.profile.firstName}
            />
            <main className="content">
              <Switch>
                <Route exact path="/">
                  <Home data={earthquakeData.data} />
                </Route>
                <Route path="/detail/:id">
                  <Detail data={earthquakeData.data} />
                </Route>
                <Route path="/profile">
                  <Profile profile={earthquakeData.profile} />
                </Route>
              </Switch>
            </main>
          </>
        ) : (
          <div className="status-container">
            {loading && <Loading />}
            {error && <h3>No data found at this time. Come back later.</h3>}
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
