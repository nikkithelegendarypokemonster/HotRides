import riderReducer from "./reducers/riderReducer";
import { combineReducers } from "@reduxjs/toolkit";

const allReducers = {
  rider: riderReducer,
};
export default combineReducers(allReducers);
