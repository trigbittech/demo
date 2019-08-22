import React from "react";
import DirectionsBikeRounded from "@material-ui/icons/DirectionsBikeRounded";
import DirectionsBusRounded from "@material-ui/icons/DirectionsBusRounded";
import DirectionsCarRounded from "@material-ui/icons/DirectionsCarRounded";
import WifiRounded from "@material-ui/icons/WifiRounded";
import LocalParkingRounded from "@material-ui/icons/LocalParkingRounded";
// const useStyles = makeStyles({
//     //
// });

export default function StationIcons(props) {
  let stationData = props.data;
  // const classes = useStyles();
  return (
    <div>
      <LocalParkingRounded
        fontSize="large"
        color={stationData.hasParking ? "primary" : "error"}
      />

      <WifiRounded
        fontSize="large"
        color={stationData.hasWiFi ? "primary" : "error"}
      />

      <DirectionsCarRounded
        fontSize="large"
        color={stationData.hasCarRental ? "primary" : "error"}
      />

      <DirectionsBusRounded
        fontSize="large"
        color={stationData.hasLocalPublicTransport ? "primary" : "error"}
      />

      <DirectionsBikeRounded
        fontSize="large"
        color={stationData.hasBicycleParking ? "primary" : "error"}
      />
    </div>
  );
}
