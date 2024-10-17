import { Tabs } from "expo-router";
import { useSelector } from "react-redux";

export default function AuthLayout() {
  const rideStatus = useSelector((state: any) => state.global); // Assuming 'global' contains rideStatus

  return (
    <Tabs>
      {/* Rider Map tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Rider Map",
          tabBarButton: rideStatus ? () => null : undefined, // Hide this tab if rideStatus is true
        }}
      />

      {/* User Booking tab */}
      <Tabs.Screen
        name="user"
        options={{
          title: "User Booking",
          tabBarButton: rideStatus ? () => null : undefined, // Hide this tab if rideStatus is true
        }}
      />

      {/* Ride Progress tab */}
      <Tabs.Screen
        name="ride"
        options={{
          title: "Ride Progress",
          tabBarButton: !rideStatus ? () => null : undefined, // Hide this tab if rideStatus is false
        }}
      />
    </Tabs>
  );
}
