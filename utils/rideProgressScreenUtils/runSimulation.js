import { updateRiderLocation } from "@actions/riderActions";
import { updateRideStatus, updateRideLocation } from "@actions/rideActions";
import { Alert } from "react-native";

export const runSimulation = (
  timeoutIds,
  dispatch,
  rideIndex,
  location,
  destination
) => {
  return new Promise((resolve) => {
    const timeout1 = setTimeout(() => {
      //   console.log("First Timeout Complete");
      dispatch(updateRideStatus(rideIndex, "accepted"));

      const timeout2 = setTimeout(() => {
        dispatch(updateRideStatus(rideIndex, "started"));

        const timeout3 = setTimeout(() => {
          dispatch(updateRideStatus(rideIndex, "pickup"));
          dispatch(updateRiderLocation(location));

          const timeout4 = setTimeout(() => {
            dispatch(updateRideStatus(rideIndex, "dropped-off"));
            dispatch(updateRiderLocation(destination));
            dispatch(updateRideLocation(rideIndex, destination));
            Alert.alert(
              "Ride Completed",
              "The ride has been successfully completed.",
              [
                {
                  text: "OK",
                  onPress: () => {
                    resolve();
                  },
                },
              ],
              { cancelable: false }
            );
          }, 5000);

          timeoutIds.push(timeout4); // Track timeout4
        }, 5000);

        timeoutIds.push(timeout3); // Track timeout3
      }, 5000);

      timeoutIds.push(timeout2); // Track timeout2
    }, 5000);

    timeoutIds.push(timeout1); // Track timeout1
  });
};
