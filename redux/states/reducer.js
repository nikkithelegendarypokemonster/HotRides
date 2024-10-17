import riderReducer from "./reducers/riderReducer";
import rideReducer from "./reducers/rideReducer";
import globalReducer from "./reducers/globalReducer";
import { combineReducers } from "@reduxjs/toolkit";

const allReducers = {
  rider: riderReducer,
  ride: rideReducer,
  global: globalReducer,
};

export default combineReducers(allReducers);
