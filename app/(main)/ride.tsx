import React, { useCallback, useRef, useState } from "react";
import { View, Text, TextInput } from "react-native";
import CustomMapView from "@/components/Map_Items/MapView";
import CustomerMarkers from "@/components/Map_Items/CustomerMarkers";
import CustomModal from "@/components/Modal/CustomModal";
import RiderMarker from "@/components/Map_Items/RiderMarker";
import CancelBtn from "@/components/Buttons/CancelBtn";
import FloatBtn from "@/components/Buttons/FloatBtn";
import { Marker, Callout } from "react-native-maps";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import useReverseGeocode from "@/hooks/useReverseGeocode";
import { setRideStatus } from "@actions/globalActions";
import { updateRideStatus, setRideDeclineReason } from "@actions/rideActions";
import { runSimulation } from "@utils/rideProgressScreenUtils/runSimulation";
import { rideScreenStyles } from "@styles/rideScreenStyles";

export default function RideProgressScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { rideIndex }: any = route.params;

  const [showModal, setShowModal] = useState(false);
  const [declineReason, setDeclineReason] = useState("");

  const rides = useSelector((state: any) => state.ride);
  const { location: riderLocation, ...rider } = useSelector(
    (state: any) => state.rider
  );
  const dateFormat = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const currentRide = rides[rideIndex];

  const { pickupAddress, destinationAddress } = useReverseGeocode(currentRide);

  const location = !!currentRide ? currentRide.location : null;
  const destination = !!currentRide ? currentRide.destination : null;

  const timeoutIds = useRef<number[]>([]);

  const clearTimeouts = useCallback(() => {
    timeoutIds.current.forEach((id) => clearTimeout(id));
    timeoutIds.current = [];
  }, []);

  const finalSequence = () => {
    dispatch(setRideStatus(false));
    setShowModal(false);
    navigation.goBack();
  };

  const handleDecline = () => {
    clearTimeouts();
    dispatch(setRideStatus(false));
    dispatch(updateRideStatus(rideIndex, "declined"));
    dispatch(setRideDeclineReason(rideIndex, declineReason));
    setShowModal(false);
    navigation.goBack();
  };

  useFocusEffect(
    useCallback(() => {
      clearTimeouts();
      if (!currentRide) {
        return;
      }

      setDeclineReason(currentRide.declineReason || "");

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
          <FloatBtn onPress={() => setShowModal(true)}>
            <Ionicons
              name="information-circle-outline"
              size={32}
              color="black"
            />
          </FloatBtn>

          {/* Custom modal displaying ride info */}
          <CustomModal
            modalVisible={showModal}
            toggle={() => setShowModal(false)}
          >
            <View style={rideScreenStyles.modalContent}>
              <Text style={rideScreenStyles.modalTitle}>Ride Information</Text>
              <Text>Driver ID: {currentRide.driver_id || "Not assigned"}</Text>
              <Text>Customer Name: {currentRide.name}</Text>
              <Text>Rider Name: {currentRide.rider_name}</Text>
              <Text>Status: {currentRide.status}</Text>
              <Text>Pickup Location: {pickupAddress}</Text>
              <Text>Destination: {destinationAddress}</Text>
              <Text>
                Pickup Time:{" "}
                {currentRide.pickupTime
                  ? new Date(currentRide.pickupTime).toLocaleString(
                      "en-US",
                      dateFormat
                    )
                  : ""}
              </Text>
              <TextInput
                style={rideScreenStyles.textInput}
                placeholder="Enter decline reason"
                value={declineReason}
                onChangeText={setDeclineReason}
              />
              <View style={rideScreenStyles.buttonContainer}>
                <CancelBtn onPress={handleDecline} text="Decline Ride" />
                <CancelBtn onPress={() => setShowModal(false)} text="Close" />
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
