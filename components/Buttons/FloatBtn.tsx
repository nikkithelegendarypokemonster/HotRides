import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

export default function FloatBtn({ children, onPress }) {
  return (
    <>
      <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
        {children}
      </TouchableOpacity>
    </>
  );
}
const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});
