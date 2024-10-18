import React, { useCallback, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CustomMapView from "@/components/MapView";
import CustomerMarkers from "@/components/CustomerMarkers";
import CustomModal from "@/components/CustomModal";
import RiderMarker from "@/components/RiderMarker";
import { Marker, Callout } from "react-native-maps";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { setRideStatus } from "@actions/globalActions";
import { updateRideStatus } from "@actions/rideActions";
import { runSimulation } from "@utils/rideProgressScreenUtils/runSimulation";

export default function RideProgressScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { rideIndex }: any = route.params;

  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const rides = useSelector((state: any) => state.ride);
  const { location: riderLocation, ...rider } = useSelector(
    (state: any) => state.rider
  );

  const currentRide = rides[rideIndex];

  const location = !!currentRide ? currentRide.location : null;
  const destination = !!currentRide ? currentRide.destination : null;

  const timeoutIds = useRef<number[]>([]);

  const clearTimeouts = () => {
    timeoutIds.current.forEach((id) => clearTimeout(id));
    timeoutIds.current = [];
  };

  const finalSequence = () => {
    dispatch(setRideStatus(false));
    setShowModal(false);
    console.log("Finish");
    navigation.goBack();
  };

  const handleDecline = () => {
    clearTimeouts();
    dispatch(setRideStatus(false));
    dispatch(updateRideStatus(rideIndex, "declined"));
    setShowModal(false);
    navigation.goBack();
  };

  useFocusEffect(
    useCallback(() => {
      clearTimeouts();
      if (!currentRide) {
        return;
      }

      runSimulation(
        timeoutIds.current,
        dispatch,
        rideIndex,
        location,
        destination
      ).then(finalSequence);

      return () => clearTimeouts();
    }, [dispatch, location, navigation])
  );

  return (
    <>
      {currentRide ? (
        <>
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

          {/* Floating button to open modal */}
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => setShowModal(true)} // Open the modal
          >
            <Ionicons
              name="information-circle-outline"
              size={32}
              color="black"
            />
          </TouchableOpacity>

          {/* Custom modal displaying ride info */}
          <CustomModal
            modalVisible={showModal}
            toggle={() => setShowModal(false)} // Close the modal
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Ride Information</Text>
              <Text>Driver ID: {currentRide.driver_id || "Not assigned"}</Text>
              <Text>Customer Name: {currentRide.name}</Text>
              <Text>Status: {currentRide.status}</Text>
              <Text>
                Pickup Location: {currentRide.pickupLocation.latitude},{" "}
                {currentRide.pickupLocation.longitude}
              </Text>
              <Text>
                Destination: {currentRide.destination.latitude},{" "}
                {currentRide.destination.longitude}
              </Text>
              {/* Buttons */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.declineButton}
                  onPress={handleDecline}
                >
                  <Text style={styles.buttonText}>Decline Ride</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowModal(false)}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </CustomModal>
        </>
      ) : (
        <Text>No Ride Progress</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  modalContent: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  declineButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  closeButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
