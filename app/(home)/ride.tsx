import React, { useCallback, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import CustomMapView from "@/components/MapView";
import RiderMarker from "@/components/RiderMarker";
import CustomerMarkers from "@/components/CustomerMarkers";
import { Marker, Callout } from "react-native-maps";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { updateRiderLocation } from "@actions/riderActions";
import { updateRideStatus, updateRideLocation } from "@actions/rideActions";
import { setRideStatus } from "@actions/globalActions";

export default function RideProgressScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { rideIndex }: any = route.params;

  const rides = useSelector((state: any) => state.ride);
  const { location: riderLocation, ...rider } = useSelector(
    (state: any) => state.rider
  );

  const currentRide = rides[rideIndex];
  const hasRide = !!currentRide;

  const location = hasRide ? currentRide.location : null;
  const destination = hasRide ? currentRide.destination : null;

  // Array to store timeout IDs
  let timeoutIds = [];

  // Cleanup function to clear all timeouts
  const clearTimeouts = () => {
    timeoutIds.forEach((id) => clearTimeout(id));
    timeoutIds = [];
  };

  useEffect(() => {
    if (!hasRide) {
      console.warn(`No ride found at index ${rideIndex}`);
      clearTimeouts();
      return;
    }

    const runSimulation = async () => {
      try {
        await new Promise((resolve) =>
          setTimeout(() => {
            console.log("Step 1: accepted");
            dispatch(updateRideStatus(rideIndex, "accepted"));
            resolve(true);
          }, 5000)
        );

        await new Promise((resolve) =>
          setTimeout(() => {
            console.log("Step 2: started");
            dispatch(updateRideStatus(rideIndex, "started"));
            resolve(true);
          }, 5000)
        );

        await new Promise((resolve) =>
          setTimeout(() => {
            console.log("Step 3: pickup", currentRide);
            dispatch(updateRideStatus(rideIndex, "pickup"));
            dispatch(updateRiderLocation(location));
            resolve(true);
          }, 5000)
        );

        await new Promise((resolve) =>
          setTimeout(() => {
            console.log("Step 4: dropped-off");
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
                    dispatch(setRideStatus(false));
                    if (navigation.canGoBack()) {
                      navigation.goBack();
                    }
                  },
                },
              ],
              { cancelable: false }
            );
            resolve(true);
          }, 5000)
        );
      } catch (e) {}
    };
    runSimulation();

    return () => {
      clearTimeouts();
    };
  }, [dispatch, rideIndex, navigation]);

  if (!hasRide) {
    console.warn(`No ride found at index ${rideIndex}`);
    return (
      <View>
        <Text>No ride data available.</Text>
      </View>
    );
  }
  return (
    <CustomMapView location={riderLocation}>
      <RiderMarker
        coordinate={riderLocation}
        details={{ ...rider, location: riderLocation }}
      />

      <CustomerMarkers rides={[currentRide]} onPress={() => {}} />

      <Marker coordinate={destination}>
        <Ionicons name="flag-outline" size={40} color="red" />
        <Callout>
          <View>
            <Text>Destination</Text>
          </View>
        </Callout>
      </Marker>
    </CustomMapView>
  );
}
