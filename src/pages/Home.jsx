import "./Home.scss";

import useFeatureSorter, {
  SORTREDUCER_ACTIONS,
  SORT_TYPE,
} from "hooks/useFeatureSorter";

import { Link } from "react-router-dom";
import React from "react";
import { getFormattedDate } from "utils/date";

const getSortIcon = (direction) => {
  switch (direction) {
    case SORT_TYPE.ASC:
      return "▲";
    case SORT_TYPE.DESC:
      return "▼";
    default:
      return "";
  }
};

const Home = ({ data }) => {
  const { metadata, features } = data;
  const headers = { Title: "title", Magnitude: "mag", Time: "time" };
  const [{ column, direction, content: sortedFeatures }, dispatch] =
    useFeatureSorter(features);

  const handleSortClick = (header) => {
    if (column === header) {
      switch (direction) {
        case SORT_TYPE.ASC:
          dispatch({ type: SORTREDUCER_ACTIONS.DESC });
          return;
        case SORT_TYPE.DESC:
          dispatch({ type: SORTREDUCER_ACTIONS.NONE });
          return;
        default:
          dispatch({ type: SORTREDUCER_ACTIONS.ASC });
          return;
      }
    } else {
      dispatch({ type: SORTREDUCER_ACTIONS.COLUMN, column: header });
    }
  };

  return (
    <>
      <h2>{metadata.title}</h2>
      <div className="home-page">
        <table>
          <thead>
            <tr>
              {Object.entries(headers).map(([key, value], index) => {
                return (
                  <th
                    key={`${key}-${index}`}
                    onClick={() => handleSortClick(value)}
                  >
                    {key}
                    {column === value && (
                      <span>{` ${getSortIcon(direction)}`}</span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sortedFeatures.map((feature) => {
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
