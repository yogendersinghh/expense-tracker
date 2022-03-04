import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import useStyles from "./styles";

const CustomizedSnackBar = ({ open, setOpen }) => {
  // IntersectionObserver()
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          elevation={6}
          variant="filled"
        >
          Transaction successfully created
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomizedSnackBar;
