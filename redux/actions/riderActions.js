import {
  SET_RIDER_DETAILS,
  UPDATE_RIDER_LOCATION,
} from "../constants/riderConstants";
const defaultRiderModel = {
  id: Date.now(),
  name: "Nikki",
  age: "24",
  sex: "Male",
  type: "rider",
  location: {},
};
export const setRiderDetails = () => ({
  type: SET_RIDER_DETAILS,
  payload: defaultRiderModel,
});

export const updateRiderLocation = (location) => ({
  type: UPDATE_RIDER_LOCATION,
  payload: location,
});
