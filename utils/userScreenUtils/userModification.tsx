import { Alert } from "react-native";
export const addNewRide = (rides: any, customerCoord: any) => {
  const existingPickupLocations = rides.map((ride: any) => ride.pickupLocation);

  const availableLocations = customerCoord.filter((coord: any) => {
    return !existingPickupLocations.some(
      (pickup: any) =>
        pickup.latitude === coord.pickupLocation.latitude &&
        pickup.longitude === coord.pickupLocation.longitude
    );
  });

  if (availableLocations.length === 0) {
    Alert.alert("No more unique locations available.");
    return;
  }

  const randomLocation =
    availableLocations[Math.floor(Math.random() * availableLocations.length)];

  const newRide = {
    id: Date.now(),
    driver_id: null,
    name: `Customer - ${(rides ? rides.length : 0) + 1}`,
    type: "user",
    status: "pending",
    location: randomLocation.pickupLocation,
    pickupLocation: randomLocation.pickupLocation,
    destination: randomLocation.destination,
    pickupTime: null,
    timestamp: new Date().toISOString(),
  };
  return newRide;
};
