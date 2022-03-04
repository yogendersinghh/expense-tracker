import React, { useEffect, useRef } from "react";
import { Grid } from "@material-ui/core";
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
  ErrorPanel,
} from "@speechly/react-ui";

import Details from "./components/Details/Details";
import useStyles from "./styles";
import Main from "./components/Main/Main";
import { SpeechState, useSpeechContext } from "@speechly/react-client";

const App = () => {
  const { speechState } = useSpeechContext();
  const classes = useStyles();
  const main = useRef();
  const executeScrolling = () => {
    return main.current.scrollIntoView();
  };
  useEffect(() => {
    console.log(speechState); //it have either idle or recording state
    console.log(SpeechState);
    console.log(useSpeechContext);
    if (speechState === SpeechState.Recording) {
      executeScrolling();
    }
  }, [speechState]);
  return (
    <div>
      <Grid
        className={classes.grid}
        container
        spacing={0}
        alignItems="center"
        justifyContent="center"
        style={{ height: "100vh" }}
      >
        <Grid item className={classes.mobile} xs={12} sm={4}>
          <Details title="Income" />
        </Grid>
        <Grid ref={main} className={classes.main} item xs={12} sm={3}>
          <Main />
        </Grid>
        <Grid className={classes.desktop} item xs={12} sm={4}>
          <Details title="Income" />
        </Grid>
        <Grid className={classes.last} item xs={12} sm={4}>
          <Details title="Expense" />
        </Grid>
      </Grid>
      <PushToTalkButtonContainer>
        <PushToTalkButton />
        <ErrorPanel />
      </PushToTalkButtonContainer>
    </div>
  );
};

export default App;
