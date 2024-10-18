import { haversineDistance } from "@utils/common/haversineFormula";
export const getNearbyRides = (riderLocation = {}, rides = [], radius = 0) => {
  return rides.filter((ride) => {
    const distance = haversineDistance(riderLocation, ride.pickupLocation);
    return distance <= radius;
  });
};
