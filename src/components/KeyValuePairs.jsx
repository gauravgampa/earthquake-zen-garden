import "./KeyValuePairs.scss";

import React from "react";
import { convertToSentenceCase } from "utils/text";
import { getFormattedDate } from "utils/date";

export const KeyValueCellType = {
  DATE: "date",
  TEXT: "text",
  NUMBER: "number",
};

const getCellValue = (cellType, cellValue) => {
  let result = "-";

  switch (cellType) {
    case KeyValueCellType.DATE:
      result = getFormattedDate(
        cellValue,
        "month date, year, hr:min clockType",
        { month: "short", clockType: "12-hr" }
      );
      break;
    default:
      result = cellValue;
      break;
  }

  return result;
};

const KeyValuePairs = ({ headers, content }) => {
  return (
    <table>
      <tbody>
        {headers.map((header, index) => {
          const { name, displayName = undefined, type = "text" } = header;
          return (
            <tr key={`${header}-${index}`}>
              <td className="key-cell">
                {displayName ? displayName : convertToSentenceCase(name)}
              </td>
              <td className="value-cell">
                {getCellValue(type, content[name] ?? undefined)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default KeyValuePairs;
