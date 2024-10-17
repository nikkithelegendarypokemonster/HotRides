import MapView from "react-native-maps";
import { styles } from "@styles/generic";

export default function CustomMapView({ location, children }) {
  return (
    <>
      {location && location.latitude && location.longitude ? (
        <MapView initialRegion={location} style={styles.map}>
          {children}
        </MapView>
      ) : null}
    </>
  );
}
