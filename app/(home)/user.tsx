import React from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  Alert,
  View,
  Button,
} from "react-native";
import AddButton from "@/components/AddBtn";
import { styles } from "@styles/generic";
import { useSelector, useDispatch } from "react-redux";
import { setRideDetails, deleteRideDetails } from "@/redux/actions/rideActions"; // Action to add and delete rides
import customerCoord from "@testData/customersCoords.json";
import { addNewRide } from "@/utils/userScreenUtils/userModification";
export default function UserBooking() {
  const rides = useSelector((state: any) => state.ride);
  const dispatch = useDispatch();

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
            const newRide = addNewRide(rides, customerCoord);
            dispatch(setRideDetails(newRide));
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderRideItem = ({ item }: any) => (
    <View style={styles.rideItem}>
      <Text style={styles.rideText}>Name: {item.name}</Text>
      <Text style={styles.rideText}>
        Pickup: {item.pickupLocation.latitude}, {item.pickupLocation.longitude}
      </Text>
      <Text style={styles.rideText}>
        Destination: {item.destination.latitude}, {item.destination.longitude}
      </Text>
      <Text style={styles.rideText}>Status: {item.status}</Text>
      <Button title="Delete" onPress={() => handleDeleteRide(item.id)} />
    </View>
  );

  return (
    <SafeAreaView style={styles.generic}>
      <FlatList
        data={rides}
        renderItem={renderRideItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text>No rides available. Add a new ride.</Text>
          </View>
        }
      />
      <AddButton onPress={handleAddPress} />
    </SafeAreaView>
  );
}
