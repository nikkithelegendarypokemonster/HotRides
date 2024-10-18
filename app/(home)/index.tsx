import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, Alert } from "react-native";
import CustomMapView from "@/components/MapView";
import RiderMarker from "@/components/RiderMarker";
import CustomerMarkers from "@/components/CustomerMarkers";
import CustomModal from "@/components/CustomModal"; // Import the modal
import { setRiderDetails, updateRiderLocation } from "@actions/riderActions";
import { setRideStatus } from "@actions/globalActions";
import { getNearbyRides } from "@utils/riderMapScreenUtils/nearbyRides";
import riderCoords from "@testData/riderCoords.json";
import { styles } from "@styles/generic";
import { useNavigation } from "@react-navigation/native";

export default function Index() {
  const navigation = useNavigation();
  const { location: riderLocation, ...rider } = useSelector(
    (state: any) => state.rider
  );
  let rides = useSelector((state: any) => state.ride);
  rides = getNearbyRides(riderLocation, rides, 5);

  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalDetails, setModalDetails] = useState(null);

  useEffect(() => {
    dispatch(setRiderDetails());
    dispatch(
      updateRiderLocation({
        ...riderCoords,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
    );
  }, [dispatch]);

  const handleBookRide = () => {
    // Close modal and navigate to the Ride Progress screen
    hideModal();
    dispatch(setRideStatus(true));
    const rideIndex = rides.findIndex(
      (ride: any) => ride.id === modalDetails.id
    );

    navigation.navigate("ride", { rideIndex });
  };

  const showModal = (details: any) => {
    setModalDetails(details);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setModalDetails(null);
  };

  return (
    <View style={styles.generic}>
      <CustomMapView location={riderLocation}>
        <RiderMarker
          coordinate={riderLocation}
          details={{ ...rider, location: { ...riderLocation } }}
          onPress={showModal}
        />

        {rides && rides.length > 0 ? (
          <CustomerMarkers rides={rides} onPress={showModal} />
        ) : null}
      </CustomMapView>

      {modalDetails && (
        <CustomModal modalVisible={modalVisible} toggle={hideModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Marker Info</Text>
              <Text>Name: {modalDetails.name}</Text>
              <Text>
                Latitude:{" "}
                {modalDetails.pickupLocation?.latitude ||
                  modalDetails.location.latitude}
              </Text>
              <Text>
                Longitude:{" "}
                {modalDetails.pickupLocation?.longitude ||
                  modalDetails.location.longitude}
              </Text>
              {modalDetails.type !== "rider" ? (
                <>
                  <Text>
                    Destination: {modalDetails.destination.latitude},{" "}
                    {modalDetails.destination.longitude}
                  </Text>
                  <Text>Status: {modalDetails.status}</Text>
                </>
              ) : null}

              {/* Button Container */}
              <View style={styles.btnContainer}>
                {/* Top Button Row: Book and Reject */}
                {modalDetails.type !== "rider" ? (
                  <View style={styles.topBtnContainer}>
                    <BookBtn onPress={handleBookRide} />
                    <CancelBtn onPress={hideModal} text="Decline" />
                  </View>
                ) : null}

                {/* Cancel Button Below */}
                <View style={styles.cancelBtnContainer}>
                  <CancelBtn onPress={hideModal} text="Close" />
                </View>
              </View>
            </View>
          </View>
        </CustomModal>
      )}
    </View>
  );
}
