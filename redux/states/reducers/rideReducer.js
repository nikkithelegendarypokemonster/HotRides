const rideReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_RIDE_DETAILS":
      return [...state, action.payload];

    case "SET_RIDE_DECLINE_REASON":
      return state.map((ride, index) => {
        return index === action.payload.rideId
          ? { ...ride, declineReason: action.payload.reason }
          : ride;
      });

    case "UPDATE_RIDE_DETAILS":
      return state.map((ride) =>
        ride.id === action.payload.id ? { ...ride, ...action.payload } : ride
      );

    case "DELETE_RIDE_DETAILS":
      return state.filter((ride) => ride.id !== action.payload);

    case "UPDATE_RIDE_STATUS":
      return state.map((ride, index) => {
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

    case "UPDATE_RIDE_DRIVER_INFO":
      return state.map((ride, index) =>
        index === action.payload.rideId
          ? {
              ...ride,
              driver_id: action.payload.driverId,
              rider_name: action.payload.driverName,
            }
          : ride
      );

    default:
      return state;
  }
};

export default rideReducer;
