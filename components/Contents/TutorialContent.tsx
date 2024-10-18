import { StyleSheet, Text } from "react-native";

export default function TutorialContent() {
  return (
    <>
      <Text style={styles.modalTitle}>Tutorial: How to Use the App</Text>

      <Text style={styles.modalText}>1. Booking a Customer</Text>
      <Text style={styles.modalDescription}>
        To book a customer, tap on any available marker on the map representing
        a customer. After selecting the marker, a modal will appear with details
        about the customer and their location. Tap the Accept button to confirm
        the booking and start the ride.
      </Text>

      <Text style={styles.modalText}>2. Search Radius</Text>
      <Text style={styles.modalDescription}>
        By default, there is no search radius set, so you can see all available
        customers on the map. You can set a custom search radius by tapping on
        the Rider Marker on the map. In the modal that appears, adjust the
        search radius using the slider or toggle the "No Search Radius" switch.
        Once you've set the desired radius, click Apply to filter customers
        within that distance.
      </Text>

      <Text style={styles.modalText}>3. Ride Progress</Text>
      <Text style={styles.modalDescription}>
        After accepting a customer, you will be taken to the Ride Progress
        screen. Here, you can see the simulation of the rider picking up the
        customer and dropping them off at the destination.
      </Text>

      <Text style={styles.modalText}>4. Cancelling a Ride</Text>
      <Text style={styles.modalDescription}>
        During the ride, you can cancel the procedure at any time by tapping the
        floating button on the Ride Progress screen. In the modal that appears,
        press Decline to cancel the ride. This will mark the ride as declined,
        and you'll be returned to the Rider Map screen.
      </Text>

      <Text style={styles.modalText}>5. Checking Ride Status</Text>
      <Text style={styles.modalDescription}>
        You can also check the current status and progress of the ongoing ride
        by clicking the floating button on the Ride Progress screen. This will
        display useful information about the current ride, including the current
        status and other relevant details.
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
    marginBottom: 20,
  },
});
