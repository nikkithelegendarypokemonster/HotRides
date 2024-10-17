import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function CancelBtn({ onPress, text }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 10,
    backgroundColor: "#dc3545", // Red color for cancel button
    paddingVertical: 12, // Vertical padding inside the button
    paddingHorizontal: 25, // Horizontal padding inside the button
    borderRadius: 8, // Rounded corners
    alignItems: "center", // Center the text
    justifyContent: "center", // Center the text vertically
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 2, // Shadow radius
    elevation: 2, // Elevation for Android shadow effect
  },
  buttonText: {
    color: "white", // White text color
    fontSize: 18, // Font size
    fontWeight: "bold", // Bold text
  },
});
