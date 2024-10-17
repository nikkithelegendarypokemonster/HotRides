import {
  SET_RIDE_DETAILS,
  UPDATE_RIDE_DETAILS,
} from "../constants/rideConstants";

export const setRideDetails = (details) => ({
  type: SET_RIDE_DETAILS,
  payload: details,
});

export const updateRideDetails = (details) => ({
  type: UPDATE_RIDE_DETAILS,
  payload: details,
});

export const deleteRideDetails = (id) => ({
  type: "DELETE_RIDE_DETAILS",
  payload: id,
});
