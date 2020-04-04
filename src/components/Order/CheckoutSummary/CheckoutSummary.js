import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1 style={{ marginTop: "auto" }}>We hope it tastes well!</h1>
      <div
        style={{
          width: "100%",
          height: "500px",
          margin: "0px auto",
          display: "inline-flex"
        }}
      >
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.dangerButtonClicked}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.successButtonClicked}>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
