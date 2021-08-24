import KeyValuePairs, { KeyValueCellType } from "components/KeyValuePairs";

import React from "react";
import { useParams } from "react-router-dom";

const requiredHeaders = [
  { name: "title", type: KeyValueCellType.TEXT },
  { name: "mag", displayName: "Magnitude", type: KeyValueCellType.NUMBER },
  { name: "time", type: KeyValueCellType.DATE },
  { name: "status", type: KeyValueCellType.TEXT },
  { name: "tsunami", type: KeyValueCellType.NUMBER },
  { name: "type", type: KeyValueCellType.TEXT },
];

const Detail = ({ data }) => {
  const { id } = useParams();
  const earthQuakeDetail = data?.features?.find((item) => item.id === id);

  if (!earthQuakeDetail) {
    return (
      <h3>Invalid ID, could not find the details for the requested ID.</h3>
    );
  }

  return (
    <>
      <h2>{earthQuakeDetail.properties.title}</h2>
      <KeyValuePairs
        content={earthQuakeDetail.properties}
        headers={requiredHeaders}
      />
    </>
  );
};

export default Detail;
