import React from "react";
import { View, Text } from "react-native";
import { Marker, Callout } from "react-native-maps";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function RiderMarker({
  coordinate,
  details,
  onPress = () => {},
}) {
  return (
    <Marker coordinate={coordinate} onPress={() => onPress(details)}>
      <View>
        <Ionicons name="car-outline" size={40} color="yellow" />
      </View>
      <Callout>
        <Text>Rider</Text>
      </Callout>
    </Marker>
  );
}
