import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRiderDetails, updateRiderLocation } from "@actions/riderActions";

const useUpdateRiderLocation = (currentRiderLocation) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentRiderLocation) {
      dispatch(setRiderDetails());
      dispatch(
        updateRiderLocation({
          latitude: currentRiderLocation.latitude,
          longitude: currentRiderLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        })
      );
    }
  }, [dispatch, currentRiderLocation]);
};

export default useUpdateRiderLocation;
