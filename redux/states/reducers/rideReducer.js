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
    default:
      return state;
  }
};

export default rideReducer;
