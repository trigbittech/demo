import { makeStyles } from "@material-ui/core";
import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid
} from "@material-ui/core";
import stationDetails from "../../Data/stationDetails";
// import Timetable from './Timetable'
import StationIcons from "./StationIcons";

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  detailsHeader: {
    alignItems: "center"
  }
});

let stationData = stationDetails.stationWithEvaId;

export default function Details({ match }) {
  const classes = useStyles();
  const QUERY = gql`
    query search($id: Int!) {
      stationWithEvaId(evaId: $id) {
        name
        location {
          latitude
          longitude
        }
        hasWiFi
        hasParking
        primaryEvaId
        hasCarRental
        hasBicycleParking
        hasLocalPublicTransport
        mailingAddress {
          city
          zipcode
          street
        }
        stationManagement {
          name
          email
          phoneNumber
        }

        picture {
          url
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      id: Number(match.params.id)
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  stationData = data.stationWithEvaId;
  if (stationData.picture == null) {
    stationData.picture = { url: "https://via.placeholder.com/900" };
  }
  let lastVisted = localStorage.getItem("lastVisited");
  lastVisted = JSON.parse(lastVisted);
  if (lastVisted != null) {
    if (lastVisted.length === 5) {
      lastVisted.splice(0, 1);
    }
  } else {
    lastVisted = [];
  }

  lastVisted.push(stationData);

  localStorage.setItem("lastVisited", JSON.stringify(lastVisted));

  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        alt={stationData.name}
        height="240"
        image={stationData.picture.url}
        title={stationData.name}
      />
      <CardContent>
        <Grid container className={classes.detailsHeader}>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom variant="h5" component="h2">
              {stationData.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {stationData.mailingAddress.street},
              {" " + stationData.mailingAddress.city + " "}( Zipcode -{" "}
              {stationData.mailingAddress.zipcode})
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            {
              // Sending complete object for now..
            }
          </Grid>
        </Grid>
        <br />
        {/* <Timetable /> */}
      </CardContent>
      <CardActions>
        <StationIcons data={stationData} />
      </CardActions>
    </Card>
  );
}
