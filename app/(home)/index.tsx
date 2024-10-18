import { useEffect, useState } from "react";
import { View, Text, Switch, ScrollView } from "react-native";
import Slider from "@react-native-community/slider";
import TutorialContent from "@/components/Contents/TutorialContent";
import BookBtn from "@/components/Buttons/BookBtn";
import CancelBtn from "@/components/Buttons/CancelBtn";
import CustomMapView from "@/components/Map_Items/MapView";
import RiderMarker from "@/components/Map_Items/RiderMarker";
import CustomerMarkers from "@/components/Map_Items/CustomerMarkers";
import CustomModal from "@/components/Modal/CustomModal";
import FloatBtn from "@/components/Buttons/FloatBtn";
import { updateRideDriverInfo } from "@actions/rideActions";
import {
  setRiderDetails,
  updateRiderLocation,
  updateRiderSearchRadius,
} from "@actions/riderActions";
import { setRideStatus } from "@actions/globalActions";
import { getNearbyRides } from "@utils/riderMapScreenUtils/nearbyRides";
import { styles } from "@styles/generic";
import { modalStyles } from "@styles/modalStyles";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
  const navigation = useNavigation();
  const {
    location: riderLocation,
    maxSearchRadius,
    ...rider
  } = useSelector((state: any) => state.rider);
  let rides = useSelector((state: any) => state.ride);
  const dispatch = useDispatch();

  const [filteredRides, setFilteredRides] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [tutorialModalVisible, setTutorialModalVisible] = useState(false); // Tutorial modal state
  const [modalDetails, setModalDetails] = useState(null);
  const [currentRiderLocation, setLocation] = useState(null);
  const [searchRadius, setSearchRadius] = useState(maxSearchRadius);
  const [applyRadius, setApplyRadius] = useState(maxSearchRadius !== -1);

  useEffect(() => {
    const getLocationAndUpdateRider = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    };

    getLocationAndUpdateRider();
  }, [dispatch]);

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

  useEffect(() => {
    const filtered = getNearbyRides(riderLocation, rides, maxSearchRadius);
    setFilteredRides(filtered);
  }, [riderLocation, maxSearchRadius, rides]);

  const handleBookRide = () => {
    hideModal();
    dispatch(setRideStatus(true));
    const rideIndex = rides.findIndex(
      (ride: any) => ride.id === modalDetails.id
    );
    dispatch(updateRideDriverInfo(rideIndex, rider.id, rider.name));

    navigation.navigate("ride", { rideIndex });
  };

  const handleApplySearchRadius = () => {
    const radiusToApply = applyRadius ? searchRadius : 9999999;
    dispatch(updateRiderSearchRadius(radiusToApply));
    hideModal();
  };

  const showModal = (details: any) => {
    setModalDetails(details);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setModalDetails(null);
  };

  // Function to toggle the tutorial modal
  const toggleTutorialModal = () => {
    setTutorialModalVisible(!tutorialModalVisible);
  };

  return (
    <View style={styles.generic}>
      <CustomMapView location={riderLocation}>
        <RiderMarker
          coordinate={riderLocation}
          details={{ ...rider, location: { ...riderLocation } }}
          onPress={showModal}
        />

        {filteredRides && filteredRides.length > 0 ? (
          <CustomerMarkers rides={filteredRides} onPress={showModal} />
        ) : null}
      </CustomMapView>
      <FloatBtn onPress={toggleTutorialModal}>
        <Ionicons name="information-circle-outline" size={32} color="black" />
      </FloatBtn>

      {/* Tutorial Modal */}
      <CustomModal
        modalVisible={tutorialModalVisible}
        toggle={toggleTutorialModal}
      >
        <ScrollView contentContainerStyle={modalStyles.modalContent}>
          <View>
            <TutorialContent />
            <CancelBtn onPress={toggleTutorialModal} text="Close" />
          </View>
        </ScrollView>
      </CustomModal>

      {modalDetails && (
        <CustomModal modalVisible={modalVisible} toggle={hideModal}>
          <View style={modalStyles.modalContainer}>
            <View style={modalStyles.modalContent}>
              <Text style={modalStyles.modalText}>Marker Info</Text>
              <Text>Name: {modalDetails.name}</Text>
              <Text>Latitude: {modalDetails.location.latitude}</Text>
              <Text>Longitude: {modalDetails.location.longitude}</Text>
              {modalDetails.type !== "rider" ? (
                <>
                  <Text>
                    Destination: {modalDetails.destination.latitude},{" "}
                    {modalDetails.destination.longitude}
                  </Text>
                  <Text>Status: {modalDetails.status}</Text>
                </>
              ) : (
                <>
                  <Text>Max Search Radius: {searchRadius} km</Text>
                  <Slider
                    style={{ width: 200, height: 40 }}
                    minimumValue={1}
                    maximumValue={50}
                    step={1}
                    value={searchRadius <= 100 ? searchRadius : 0}
                    onValueChange={setSearchRadius}
                    disabled={!applyRadius}
                  />
                  <View style={styles.switchContainer}>
                    <Text>No Search Radius</Text>
                    <Switch
                      value={!applyRadius}
                      onValueChange={() => setApplyRadius((prev) => !prev)}
                    />
                  </View>
                </>
              )}

              <View style={styles.btnContainer}>
                {modalDetails.type !== "rider" ? (
                  <>
                    <BookBtn onPress={handleBookRide} text="Accept" />
                    <CancelBtn onPress={hideModal} text="Close" />
                  </>
                ) : (
                  <>
                    <BookBtn onPress={handleApplySearchRadius} text="Apply" />
                    <CancelBtn onPress={hideModal} text="Close" />
                  </>
                )}
              </View>
            </View>
          </View>
        </CustomModal>
      )}
    </View>
  );
}
