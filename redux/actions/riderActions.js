import {
  SET_RIDER_DETAILS,
  UPDATE_RIDER_LOCATION,
  UPDATE_RIDER_RADIUS,
} from "../constants/riderConstants";
const defaultRiderModel = {
  id: Date.now(),
  name: "Main Rider",
  age: "24",
  sex: "Male",
  type: "rider",
  location: {},
  maxSearchRadius: 50,
};
export const setRiderDetails = () => ({
  type: SET_RIDER_DETAILS,
  payload: defaultRiderModel,
});

export const updateRiderLocation = (location) => ({
  type: UPDATE_RIDER_LOCATION,
  payload: location,
});

export const updateRiderSearchRadius = (radius) => ({
  type: UPDATE_RIDER_RADIUS,
  payload: radius,
});
