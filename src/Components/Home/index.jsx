import {
  List,
  makeStyles,
  Card,
  CardContent,
  TextField,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from "@material-ui/core";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import ItemList from "./List";
const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

function Home() {
  let lastVisted = localStorage.getItem("lastVisited");
  if (lastVisted === "") {
    localStorage.setItem("lastVisited", JSON.stringify([]));
  }
  let stationList = [];
  if (lastVisted) {
    stationList = JSON.parse(lastVisted);
  }
  const [searchTerm, setSearchTerm] = useState("");
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <TextField
          id="standard-full-width"
          label="Search"
          style={{ margin: 8 }}
          placeholder="Station Name"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={event => {
            setTimeout(setSearchTerm(event.target.value), 250);
          }}
          InputLabelProps={{
            shrink: true
          }}
        />
        {searchTerm !== "" ? <ItemList searchTerm={searchTerm} /> : <div />}
        {stationList !== [] ? (
          <div>
            <div>Recent Searches</div>
            <List className={classes.root}>
              {stationList.map(item => (
                <Link
                  key={item.primaryEvaId}
                  to={"/details/" + item.primaryEvaId}
                >
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
                    <ListItemText
                      primary={item.name}
                      secondary={item.federalState}
                    />
                  </ListItem>
                </Link>
              ))}
            </List>
          </div>
        ) : (
          <div />
        )}
      </CardContent>
    </Card>
  );
}

export default Home;
