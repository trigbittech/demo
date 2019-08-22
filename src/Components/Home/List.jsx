import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360
    // backgroundColor: theme.palette.background.paper, ://
  }
}));

// Bind to input field <<<<<<<<<
const QUERY = gql`
  query search($searchTerm: String!) {
    search(searchTerm: $searchTerm) {
      stations {
        name
        primaryEvaId
        federalState
        picture {
          url
        }
      }
    }
  }
`;

function ItemList(props) {
  const classes = useStyles();
  let stationList = [];
  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      searchTerm: props.searchTerm
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>No Reocrd Found</p>;
  stationList = data.search.stations;
  stationList.forEach(element => {
    if (element.picture == null) {
      element.picture = { url: "https://via.placeholder.com/150" };
    }
  });

  return (
    <List className={classes.root}>
      {stationList.map(item => (
        <Link key={item.primaryEvaId} to={"/details/" + item.primaryEvaId}>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src={item.picture.url}
                className={classes.bigAvatar}
              />
            </ListItemAvatar>
            {
              // Disable text decoration and pass item.primaryEvaId as prop
            }
            <ListItemText primary={item.name} secondary={item.federalState} />
          </ListItem>
        </Link>
      ))}
    </List>
  );
}

export default ItemList;
