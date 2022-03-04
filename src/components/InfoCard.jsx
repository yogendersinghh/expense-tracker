import React from "react";

const isIncome = Math.round(Math.random());
console.log(isIncome);
const InfoCard = () => {
  return (
    <div style={{ textAlign: "center", padding: "0 10px" }}>
      Try Saying <br />
      Add {isIncome ? "income " : "expense "}
      for {isIncome ? "$100 " : "$200 "}
      in Category {isIncome ? "Business " : "House "}
      For {isIncome ? "next Monday " : "Tuesday "}
    </div>
  );
};

export default InfoCard;
