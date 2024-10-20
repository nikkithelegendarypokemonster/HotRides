import {
  SET_RIDE_DETAILS,
  UPDATE_RIDE_DETAILS,
  DELETE_RIDE_DETAILS,
  UPDATE_RIDE_STATUS,
  UPDATE_RIDE_LOCATION,
  UPDATE_RIDE_DRIVER_INFO,
  SET_RIDE_DECLINE_REASON,
  UPDATE_RIDE_PICKUP_TIME,
} from "../constants/rideConstants";

export const setRideDetails = (details) => ({
  type: SET_RIDE_DETAILS,
  payload: details,
});

export const setRideDeclineReason = (rideId, reason) => ({
  type: SET_RIDE_DECLINE_REASON,
  payload: { rideId, reason },
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

export const updateRideDriverInfo = (rideId, driverId, driverName) => ({
  type: UPDATE_RIDE_DRIVER_INFO,
  payload: { rideId, driverId, driverName },
});

export const updateRidePickupTime = (rideId, pickupTime) => ({
  type: UPDATE_RIDE_PICKUP_TIME,
  payload: { rideId, pickupTime },
});
