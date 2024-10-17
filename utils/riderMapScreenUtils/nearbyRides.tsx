const toRadians = (degrees: number) => {
  return degrees * (Math.PI / 180);
};

const haversineDistance = (coord1: any, coord2: any) => {
  const Radius = 6371; // Radius of Earth in kilometers
  const lat1 = toRadians(coord1.latitude);
  const lon1 = toRadians(coord1.longitude);
  const lat2 = toRadians(coord2.latitude);
  const lon2 = toRadians(coord2.longitude);

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = Radius * c; // Distance in kilometers
  return distance;
};

export const getNearbyRides = (riderLocation = {}, rides = [], radius = 0) => {
  return rides.filter((ride) => {
    const distance = haversineDistance(riderLocation, ride.pickupLocation);
    return distance <= radius;
  });
};
