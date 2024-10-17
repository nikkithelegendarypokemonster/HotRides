import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomMapView from "@/components/MapView";
export default function Index() {
  const { location: riderLocation, ...rider } = useSelector(
    (state: any) => state.rider
  );
  const dispatch = useDispatch();
  return (
    <View style={styles.generic}>
      <CustomMapView location={riderLocation}>
      </CustomMapView>
    </View>
  );
}
