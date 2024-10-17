import riderReducer from "./reducers/riderReducer";
import globalReducer from "./reducers/globalReducer";
import { combineReducers } from "@reduxjs/toolkit";

const allReducers = {
  rider: riderReducer,
  global: globalReducer,
};
export default combineReducers(allReducers);
