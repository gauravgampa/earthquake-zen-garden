import { useReducer } from "react";

const sortByDirection = (a, b, direction) => {
  if (direction === SORT_TYPE.ASC) {
    return a - b;
  }
  return b - a;
};

const sortAlnumByDirection = (a, b, direction) => {
  if (direction === SORT_TYPE.ASC) {
    return a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  }
  return b.localeCompare(a, undefined, {
    numeric: true,
    sensitivity: "base",
  });
};

const sortData = (data, column, direction) => {
  return data.sort((a, b) => {
    const columnA = a["properties"][column];
    const columnB = b["properties"][column];
    switch (column) {
      case "time":
        return sortByDirection(new Date(columnA), new Date(columnB), direction);
      case "title":
        return sortAlnumByDirection(columnA, columnB, direction);
      default:
        return sortByDirection(columnA, columnB, direction);
    }
  });
};

export const SORT_TYPE = {
  ASC: "asc",
  DESC: "desc",
  NONE: "none",
};

export const SORTREDUCER_ACTIONS = {
  ASC: "asc",
  DESC: "desc",
  COLUMN: "column",
  NONE: "none",
};

const sortDataReducer = (state, action) => {
  const { content, column } = state;

  switch (action.type) {
    case SORTREDUCER_ACTIONS.DESC:
      return {
        ...state,
        direction: SORT_TYPE.DESC,
        content: sortData(content, column, SORT_TYPE.DESC),
      };
    case SORTREDUCER_ACTIONS.COLUMN:
      return {
        ...state,
        direction: SORT_TYPE.ASC,
        column: action.column,
        content: sortData(content, action.column, SORT_TYPE.ASC),
      };
    case SORTREDUCER_ACTIONS.NONE:
      return {
        ...state,
        direction: SORT_TYPE.NONE,
        content: sortData(content, column, SORT_TYPE.NONE),
      };
    case SORTREDUCER_ACTIONS.ASC:
    default:
      return {
        ...state,
        direction: SORT_TYPE.ASC,
        content: sortData(content, column, SORT_TYPE.ASC),
      };
  }
};

const useFeatureSorter = (data) => {
  const initialState = {
    content: data,
    column: undefined,
    direction: SORT_TYPE.NONE,
  };
  const [state, dispatch] = useReducer(sortDataReducer, initialState);

  return [state, dispatch];
};

export default useFeatureSorter;
