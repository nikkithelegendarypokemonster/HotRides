import { View, Text, StyleSheet } from "react-native";
import { Marker, Callout } from "react-native-maps";

export default function CustomerMarkers({ rides, onPress }) {
  return (
    <>
      {rides.map((ride: any, index: number) =>
        ride.status !== "dropped-off" && ride.status !== "declined" ? (
          <Marker
            key={index}
            coordinate={ride.location}
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
        ) : null
      )}
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
    minWidth: 100,
    maxWidth: 250,
  },
  calloutText: {
    color: "black",
    fontSize: 14,
  },
});
