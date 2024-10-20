import { useState, useEffect } from "react";
import * as Location from "expo-location";

const useReverseGeocode = (modalDetails: any) => {
  const [addresses, setAddresses] = useState({
    pickupAddress: null,
    destinationAddress: null,
    currentLocationAddress: null,
  });

  useEffect(() => {
    const reverseGeocodeLocations = async () => {
      if (!modalDetails || !modalDetails.location) return;

      let newAddresses = {};

      try {
        // Reverse geocode for pickup location
        if (modalDetails.pickupLocation) {
          const pickupAddressResult = await Location.reverseGeocodeAsync({
            latitude: modalDetails.pickupLocation.latitude,
            longitude: modalDetails.pickupLocation.longitude,
          });
          if (pickupAddressResult.length > 0) {
            const pickupAddress = pickupAddressResult[0];
            newAddresses.pickupAddress = `${pickupAddress.name}, ${pickupAddress.city}, ${pickupAddress.region}, ${pickupAddress.country}`;
          }
        }

        // Reverse geocode for destination location
        if (modalDetails.destination) {
          const destinationAddressResult = await Location.reverseGeocodeAsync({
            latitude: modalDetails.destination.latitude,
            longitude: modalDetails.destination.longitude,
          });
          if (destinationAddressResult.length > 0) {
            const destinationAddress = destinationAddressResult[0];
            newAddresses.destinationAddress = `${destinationAddress.name}, ${destinationAddress.city}, ${destinationAddress.region}, ${destinationAddress.country}`;
          }
        }

        // Reverse geocode for current location
        if (modalDetails.location) {
          const currentLocationAddressResult =
            await Location.reverseGeocodeAsync({
              latitude: modalDetails.location.latitude,
              longitude: modalDetails.location.longitude,
            });
          if (currentLocationAddressResult.length > 0) {
            const currentLocationAddress = currentLocationAddressResult[0];
            newAddresses.currentLocationAddress = `${currentLocationAddress.name}, ${currentLocationAddress.city}, ${currentLocationAddress.region}, ${currentLocationAddress.country}`;
          }
        }
        setAddresses(newAddresses);
      } catch (error) {
        console.error("Error during reverse geocoding: ", error);
      }
    };

    reverseGeocodeLocations();
  }, [modalDetails]);

  return addresses;
};

export default useReverseGeocode;
