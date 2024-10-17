import React from "react";
import { View, Text } from "react-native";
import { Marker, Callout } from "react-native-maps";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function RiderMarker({ coordinate, details, showModal }) {
  return (
    <Marker coordinate={coordinate} onPress={() => showModal(details)}>
      <View>
        <Ionicons name="car-outline" size={40} color="yellow" />
      </View>
      <Callout>
        <Text>Rider</Text>
      </Callout>
    </Marker>
  );
}
