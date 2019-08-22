import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Home from "./Components/Home/"; // Will be changing this to an Index.js file later
import Details from "./Components/Details/";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  container: {
    marginTop: "20px"
  }
});

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Demo App
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Container maxWidth="md" className={classes.container}>
        <Route path="/" exact component={Home} />
        {/* <Route path="/home" component={Home} /> */}
        <Route path="/details/:id" component={Details} />
      </Container>
    </Router>
  );
}

export default App;
