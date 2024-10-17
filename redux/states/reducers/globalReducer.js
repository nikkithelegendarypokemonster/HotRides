const globalReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_RIDE_STATUS":
      return action.payload;
    default:
      return state;
  }
};

export default globalReducer;
