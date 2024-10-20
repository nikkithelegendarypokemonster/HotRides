import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  Alert,
  View,
  Button,
} from "react-native";
import AddButton from "@/components/Buttons/AddBtn";
import { rideItemStyles } from "@styles/rideItemStyles";
import { styles } from "@styles/generic";
import { useSelector, useDispatch } from "react-redux";
import { setRideDetails, deleteRideDetails } from "@/redux/actions/rideActions";
import { addNewRide } from "@/utils/userScreenUtils/userModification";
import * as Location from "expo-location";

const reverseGeocodeLocation = async (location) => {
  if (!location) return null;

  try {
    const result = await Location.reverseGeocodeAsync({
      latitude: location.latitude,
      longitude: location.longitude,
    });
    if (result.length > 0) {
      const { name, city, region, country } = result[0];
      return `${name}, ${city}, ${region}, ${country}`;
    }
  } catch (error) {
    console.error("Error during reverse geocoding:", error);
  }
  return "Unknown address";
};

export default function UserBooking() {
  const { location: riderLocation } = useSelector((state: any) => state.rider);
  const rides = useSelector((state: any) => state.ride);

  const dispatch = useDispatch();

  const [updatedRides, setUpdatedRides] = useState(rides); // Store updated rides with addresses
  useEffect(() => {
    const updateRideAddresses = async () => {
      const updated = await Promise.all(
        rides.map(async (ride) => {
          const pickupAddress = await reverseGeocodeLocation(
            ride.pickupLocation
          );
          const destinationAddress = await reverseGeocodeLocation(
            ride.destination
          );
          return {
            ...ride,
            pickupAddress: pickupAddress || "Unknown pickup address",
            destinationAddress:
              destinationAddress || "Unknown destination address",
          };
        })
      );
      setUpdatedRides(updated);
    };

    if (rides.length > 0) {
      updateRideAddresses(); // Call the function to process addresses
    }
  }, [rides]);

  const dateFormat = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const handleDeleteRide = (id: any) => {
    dispatch(deleteRideDetails(id));
  };

  const handleAddPress = () => {
    Alert.alert(
      "Add Ride",
      "Do you want to add a new ride?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            const newRide = addNewRide(rides, riderLocation);
            dispatch(setRideDetails(newRide));
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderRideItem = ({ item }: any) => (
    <View style={rideItemStyles.rideItem}>
      <Text style={rideItemStyles.rideText}>Name: {item.name}</Text>
      <Text style={rideItemStyles.rideText}>Pickup: {item.pickupAddress}</Text>
      <Text style={rideItemStyles.rideText}>
        Destination: {item.destinationAddress}
      </Text>
      <Text style={rideItemStyles.rideText}>Status: {item.status}</Text>
      {item.status === "declined" ? (
        <Text style={rideItemStyles.rideText}>
          Reason: {item?.declineReason ? item.declineReason : "No Reason"}
        </Text>
      ) : null}
      {item.pickupTime ? (
        <Text style={rideItemStyles.rideText}>
          Pickup Time:{" "}
          {new Date(item.pickupTime).toLocaleString("en-US", dateFormat)}
        </Text>
      ) : null}
      <Button title="Delete" onPress={() => handleDeleteRide(item.id)} />
    </View>
  );

  return (
    <SafeAreaView style={styles.generic}>
      <FlatList
        data={updatedRides}
        renderItem={renderRideItem}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={
          <View style={rideItemStyles.emptyState}>
            <Text>No rides available. Add a new ride.</Text>
          </View>
        }
      />
      <AddButton onPress={handleAddPress} />
    </SafeAreaView>
  );
}
