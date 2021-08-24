import React, { useEffect, useReducer } from "react";

import axios from "axios";

const ACTIONS = {
  FIELD: "field",
  SUCCESS: "success",
  ERROR: "error",
};

const fetchDataReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FIELD: {
      return {
        ...state,
        loading: action.value,
      };
    }
    case ACTIONS.SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    }
    case ACTIONS.ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
  }
};

const initialState = {
  data: undefined,
  loading: false,
  error: undefined,
};

const useFetchData = (url) => {
  const [state, dispatch] = useReducer(fetchDataReducer, initialState);

  useEffect(() => {
    dispatch({ type: ACTIONS.FIELD, value: true });
    setTimeout(() => {
      const getData = async () => {
        try {
          let response = await axios.get(url);
          dispatch({ type: ACTIONS.SUCCESS, data: response?.data });
          return;
        } catch (error) {
          dispatch({ type: ACTIONS.ERROR, error: error });
        } finally {
          dispatch({ type: ACTIONS.FIELD, value: false });
        }
      };

      getData();
    }, 1000);
  }, []);

  return state;
};

export default useFetchData;
