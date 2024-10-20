import { useEffect, useState } from "react";
import { getNearbyRides } from "@utils/riderMapScreenUtils/nearbyRides";

const useFilteredRides = (riderLocation, rides, maxSearchRadius) => {
  const [filteredRides, setFilteredRides] = useState([]);

  useEffect(() => {
    if (riderLocation && rides.length > 0) {
      const filtered = getNearbyRides(riderLocation, rides, maxSearchRadius);
      setFilteredRides(filtered);
    }
  }, [riderLocation, rides, maxSearchRadius]);

  return filteredRides;
};

export default useFilteredRides;
