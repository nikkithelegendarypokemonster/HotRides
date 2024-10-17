import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  generic: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  btnContainer: {
    alignItems: "center", // Center all buttons horizontally
    marginTop: 20, // Add margin at the top of the buttons
    width: "100%", // Ensure full width for proper spacing
  },
  topBtnContainer: {
    flexDirection: "row", // Row layout for "Book" and "Reject" buttons
    justifyContent: "center", // Space "Book" and "Reject" buttons apart
    width: "100%", // Full width
    marginBottom: 10, // Space between "Book/Reject" and "Cancel"
  },
  cancelBtnContainer: {
    alignItems: "center", // Center the "Cancel" button
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  rideItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  rideText: {
    fontSize: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
