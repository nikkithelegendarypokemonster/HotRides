const rideReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_RIDE_DETAILS":
      return [...state, action.payload];

    case "UPDATE_RIDE_DETAILS":
      return state.map((ride) =>
        ride.id === action.payload.id ? { ...ride, ...action.payload } : ride
      );

    case "DELETE_RIDE_DETAILS":
      return state.filter((ride) => ride.id !== action.payload);

    case "UPDATE_RIDE_STATUS":
      console.log("Updating ride status:", action.payload); // Debugging log
      return state.map((ride, index) => {
        console.log("Ride ID:", index, "Payload ID:", action.payload.rideId);
        return index === action.payload.rideId
          ? { ...ride, status: action.payload.status }
          : ride;
      });

    case "UPDATE_RIDE_LOCATION":
      return state.map((ride, index) =>
        index === action.payload.rideId
          ? {
              ...ride,
              location: { ...ride.location, ...action.payload.location },
            }
          : ride
      );

    default:
      return state;
  }
};

export default rideReducer;
