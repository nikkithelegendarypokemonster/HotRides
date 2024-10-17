import {
  SET_RIDE_DETAILS,
  UPDATE_RIDE_DETAILS,
  DELETE_RIDE_DETAILS,
  UPDATE_RIDE_STATUS,
  UPDATE_RIDE_LOCATION,
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
  type: DELETE_RIDE_DETAILS,
  payload: id,
});

export const updateRideStatus = (rideId, status) => ({
  type: UPDATE_RIDE_STATUS,
  payload: { rideId, status },
});

export const updateRideLocation = (rideId, location) => ({
  type: UPDATE_RIDE_LOCATION,
  payload: { rideId, location },
});
