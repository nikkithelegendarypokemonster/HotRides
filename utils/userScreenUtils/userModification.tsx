import { toRadians, toDegrees } from "@utils/common/haversineFormula";

// Function to generate a random destination within a certain distance from an origin location
const generateRandomDestination = (
  originLocation: any,
  minDistance: number,
  maxDistance: number
) => {
  const earthRadiusKm = 6371; // Earth radius in kilometers

  // Convert latitude and longitude from degrees to radians
  const lat1 = toRadians(originLocation.latitude);
  const lon1 = toRadians(originLocation.longitude);

  // Generate random distance in km
  const randomDistanceKm =
    Math.random() * (maxDistance - minDistance) + minDistance;

  // Angular distance in radians
  const angularDistance = randomDistanceKm / earthRadiusKm;

  // Generate random bearing (direction) in radians
  const bearing = Math.random() * 2 * Math.PI;

  // Compute the destination point using the haversine formula
  const sinLat1 = Math.sin(lat1);
  const cosLat1 = Math.cos(lat1);
  const sinAngularDistance = Math.sin(angularDistance);
  const cosAngularDistance = Math.cos(angularDistance);
  const sinBearing = Math.sin(bearing);
  const cosBearing = Math.cos(bearing);

  const sinLat2 =
    sinLat1 * cosAngularDistance + cosLat1 * sinAngularDistance * cosBearing;
  const lat2 = Math.asin(sinLat2);

  const y = sinBearing * sinAngularDistance * cosLat1;
  const x = cosAngularDistance - sinLat1 * sinLat2;
  const lon2 = lon1 + Math.atan2(y, x);

  // Normalize the longitude to be between -180 and +180 degrees
  const lon2Normalized = ((toDegrees(lon2) + 540) % 360) - 180;

  // Convert lat2 from radians to degrees
  const newLat = toDegrees(lat2);

  return {
    latitude: newLat,
    longitude: lon2Normalized,
  };
};

const isPickupLocationUnique = (pickupLocation: any, rides: any) => {
  return !rides.some((ride: any) => {
    return (
      ride.pickupLocation.latitude === pickupLocation.latitude &&
      ride.pickupLocation.longitude === pickupLocation.longitude
    );
  });
};

export const addNewRide = (rides: any, riderLocation: any) => {
  let pickupLocation;

  do {
    pickupLocation = generateRandomDestination(riderLocation, 1, 50);
  } while (!isPickupLocationUnique(pickupLocation, rides));

  const destination = generateRandomDestination(pickupLocation, 1, 50);

  const newRide = {
    id: Date.now(),
    driver_id: null,
    rider_name: "",
    name: `Customer - ${(rides ? rides.length : 0) + 1}`,
    type: "user",
    status: "pending",
    location: pickupLocation,
    pickupLocation: pickupLocation,
    destination: destination,
    declineReason: "",
    pickupTime: null,
    timestamp: new Date().toISOString(),
  };
  return newRide;
};
