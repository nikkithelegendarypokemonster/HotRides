import { Tabs } from "expo-router";
import { useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AuthLayout() {
  const rideStatus = useSelector((state: any) => state.global);

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Rider Map",
          tabBarButton: rideStatus ? () => null : undefined,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="user"
        options={{
          title: "User Booking",
          tabBarButton: rideStatus ? () => null : undefined,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="ride"
        options={{
          title: "Ride Progress",
          tabBarButton: !rideStatus ? () => null : undefined,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="car-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
