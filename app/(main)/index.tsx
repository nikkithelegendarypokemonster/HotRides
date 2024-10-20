import { useState } from "react";
import { View, Text, Switch, ScrollView } from "react-native";
import Slider from "@react-native-community/slider";
import TutorialContent from "@/components/Contents/TutorialContent";
import AcceptBtn from "@/components/Buttons/AcceptBtn";
import CancelBtn from "@/components/Buttons/CancelBtn";
import CustomMapView from "@/components/Map_Items/MapView";
import RiderMarker from "@/components/Map_Items/RiderMarker";
import CustomerMarkers from "@/components/Map_Items/CustomerMarkers";
import CustomModal from "@/components/Modal/CustomModal";
import FloatBtn from "@/components/Buttons/FloatBtn";
import { updateRideDriverInfo } from "@actions/rideActions";
import { updateRiderSearchRadius } from "@actions/riderActions";
import { setRideStatus } from "@actions/globalActions";
import { styles } from "@styles/generic";
import { modalStyles } from "@styles/modalStyles";
import { useNavigation } from "@react-navigation/native";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import useReverseGeocode from "@hooks/useReverseGeocode";
import useUpdateRiderLocation from "@/hooks/useUpdateRiderLocation";
import useFilteredRides from "@/hooks/useFilteredRides";
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

  const [modalVisible, setModalVisible] = useState(false);
  const [tutorialModalVisible, setTutorialModalVisible] = useState(false);
  const [modalDetails, setModalDetails] = useState(null);
  const [searchRadius, setSearchRadius] = useState(maxSearchRadius);
  const [applyRadius, setApplyRadius] = useState(maxSearchRadius !== -1);

  const { location: currentRiderLocation, error } = useCurrentLocation();
  const { destinationAddress, currentLocationAddress } =
    useReverseGeocode(modalDetails);
  const filteredRides = useFilteredRides(riderLocation, rides, maxSearchRadius);
  useUpdateRiderLocation(currentRiderLocation);

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
              <Text>Location: {currentLocationAddress}</Text>
              {modalDetails.type !== "rider" ? (
                <>
                  <Text>Destination: {destinationAddress}</Text>
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
                    <AcceptBtn onPress={handleBookRide} text="Accept" />
                    <CancelBtn onPress={hideModal} text="Close" />
                  </>
                ) : (
                  <>
                    <AcceptBtn onPress={handleApplySearchRadius} text="Apply" />
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
