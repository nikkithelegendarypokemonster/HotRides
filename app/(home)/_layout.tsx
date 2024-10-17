import { Tabs } from "expo-router";

export default function AuthLayout() {

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
    </Tabs>
  );
}
