import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import useTransactions from "../../useTransactions";

import useStyles from "./styles";

Chart.register(ArcElement);

const Details = ({ title }) => {
  let { chartData, total } = useTransactions(title);
  const classes = useStyles();
  console.log(chartData);
  return (
    <Card className={title === "Income" ? classes.income : classes.expense}>
      <CardHeader title={title} />
      <CardContent>
        <Typography variant="h5">${total}</Typography>
        <Doughnut data={chartData} />
      </CardContent>
    </Card>
  );
};

export default Details;