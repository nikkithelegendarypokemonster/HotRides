import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Marker, Callout } from "react-native-maps";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CustomerMarkers({ rides, showModal }) {
  return (
    <>
      {rides.map((ride, index) => (
        <Marker
          key={index}
          coordinate={ride.location}
          onPress={() =>
            showModal({
              name: ride.name,
              location: ride.pickupLocation,
              destination: ride.destination,
              status: ride.status,
              ...ride,
            })
          }
        >
          {/* Icon for the Customer Marker */}
          {/* <View>
            <Ionicons name="person-circle-outline" size={40} color="blue" />
          </View> */}

          {/* Callout for displaying full text */}
          <Callout tooltip>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>{ride.name}</Text>
            </View>
          </Callout>
        </Marker>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  calloutContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    backgroundColor: "white",
    borderRadius: 5,
    minWidth: 100, // Ensure the callout has enough width
    maxWidth: 250, // Prevents the text from overflowing too far
  },
  calloutText: {
    color: "black",
    fontSize: 14,
  },
});
