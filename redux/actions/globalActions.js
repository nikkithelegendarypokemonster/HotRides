import { SET_RIDE_STATUS } from "../constants/globalConstants";

export const setRideStatus = (payload) => ({
  type: SET_RIDE_STATUS,
  payload,
});
