import "./Home.scss";

import { Link } from "react-router-dom";
import React from "react";
import { getFormattedDate } from "utils/date";

const Home = ({ data }) => {
  const { metadata, features } = data;
  const headers = { Title: "title", Magnitude: "mag", Time: "time" };

  return (
    <>
      <h2>{metadata.title}</h2>
      <div className="home-page">
        <table>
          <thead>
            <tr>
              {Object.keys(headers).map((header) => {
                return <th key={header}>{header}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => {
              const { properties } = feature;
              const { title, time, mag } = properties;
              return (
                <tr key={feature.id}>
                  <td>
                    <Link to={`detail/${feature.id}`}>{title}</Link>
                  </td>
                  <td>{mag}</td>
                  <td>
                    {getFormattedDate(
                      new Date(time) || undefined,
                      "month date, year, hr:min clockType",
                      { month: "short", clockType: "12-hr" }
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
