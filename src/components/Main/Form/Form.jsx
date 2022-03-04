import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  InputField,
  Select,
  MenuItem,
} from "@material-ui/core";
import useStyles from "./styles";
import { v4 as uuidv4 } from "uuid";

import { useSpeechContext } from "@speechly/react-client";

import { ExpenseTrackerContext } from "../../../context/Context";
import {
  incomeCategories,
  expenseCategories,
} from "../../../constants/Category";

import FormatDate from "../../../FormatDate/FormatDate";
import CustomizedSnackBar from "../../snackbar/SnackBar";

const initialState = {
  amount: "",
  category: "",
  type: "Income",
  date: FormatDate(new Date()),
};

const Form = () => {
  const [formData, setFormData] = useState(initialState);
  const classes = useStyles();
  const { addTransaction } = useContext(ExpenseTrackerContext);
  const { segment } = useSpeechContext();
  const [open, setOpen] = useState(false);

  console.log(segment);
  useEffect(() => {
    if (segment) {
      // console.log(segment);
      if (segment.intent.intent === "add_expense") {
        console.log(segment.intent.intent);
        setFormData({ ...formData, type: "Expense" });
      } else if (segment.intent.intent === "add_income") {
        setFormData({ ...formData, type: "Income" });
      } else if (
        segment.isFinal &&
        segment.intent.intent === "create_transaction"
      ) {
        return createTransactions();
      } else if (
        segment.isFinal &&
        segment.intent.intent === "cancel_transaction"
      ) {
        return setFormData(initialState);
      }
      segment.entities.forEach((e) => {
        const category = `${e.value.charAt(0)}${e.value
          .slice(1)
          .toLowerCase()}`;

        switch (e.type) {
          case "amount":
            setFormData({ ...formData, amount: e.value });
            break;
          case "category":
            if (incomeCategories.map((iC) => iC.type).includes(category)) {
              setFormData({
                ...formData,
                type: "Income",
                category,
              });
            } else if (
              expenseCategories.map((eC) => eC.type).includes(category)
            ) {
              setFormData({
                ...formData,
                type: "Expense",
                category,
              });
            }
            break;
          case "date":
            setFormData({ ...formData, date: e.value });
            break;
          default:
            break;
        }
      });

      if (
        segment.isFinal &&
        formData.amount &&
        formData.category &&
        formData.type &&
        formData.date
      ) {
        createTransactions();
      }
    }
  }, [segment]);

  const createTransactions = () => {
    const transaction = {
      ...formData,
      amount: Number(formData.amount),
      id: uuidv4(),
    };
    addTransaction(transaction);
    setFormData(initialState);
    setOpen(true);
  };

  const selectedCategories =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  return (
    <Grid container spacing={2}>
      <CustomizedSnackBar open={open} setOpen={setOpen} />
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
          {segment ? <>{segment.words.map((w) => w.value).join(" ")}</> : null}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>type</InputLabel>
          <Select
            value={formData.type}
            onChange={(e) => {
              console.log(e);
              setFormData({ ...formData, type: e.target.value });
            }}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) => {
              console.log(e);
              setFormData({ ...formData, category: e.target.value });
            }}
          >
            {selectedCategories.map((c) => (
              <MenuItem key={c.type} value={c.type}>
                {c.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="number"
          label="Amount"
          fullWidth
          value={formData.amount}
          onChange={(e) => {
            setFormData({ ...formData, amount: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="date"
          label="Date"
          fullWidth
          value={formData.date}
          onChange={(e) => {
            setFormData({ ...formData, date: FormatDate(e.target.value) });
          }}
        />
      </Grid>
      <Button
        className={classes.button}
        variant="outlined"
        color="secondary"
        fullWidth
        onClick={createTransactions}
      >
        Create
      </Button>
    </Grid>
  );
};

export default Form;
