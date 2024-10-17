import { View, Text, StyleSheet } from "react-native";
import { Marker, Callout } from "react-native-maps";

export default function CustomerMarkers({ rides, onPress }) {
  console.log(rides);

  return (
    <>
      {rides.map((ride: any, index: number) => (
        <Marker
          key={index}
          coordinate={ride.location} // Use pickup location for the marker
          onPress={() =>
            onPress({
              name: ride.name,
              location: ride.location,
              destination: ride.destination,
              status: ride.status,
              ...ride,
            })
          }
        >
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
