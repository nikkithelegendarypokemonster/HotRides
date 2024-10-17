const riderReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_RIDER_DETAILS":
      return { ...state, ...action.payload };
    case "UPDATE_RIDER_LOCATION":
      return { ...state, location: { ...state.location, ...action.payload } };
    default:
      return state;
  }
};

export default riderReducer;
