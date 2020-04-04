import React from "react";
import classes from "./Order.css";

const order = props => {
    const { ingredients } = props.order;

    const ingredientsArray = [];
    for (let key in ingredients) {
        const ingredient =
            key[0].toUpperCase() +
            key.slice(1) +
            ": (" +
            ingredients[key] +
            ")";
        ingredientsArray.push(ingredient);
    }

    const fetchedIngredients = ingredientsArray.join(" ");
    console.log(fetchedIngredients);
    return (
        <div className={classes.Order}>
            <p>Date: {props.order.date}</p>
            <p>{props.order.orderData.name}</p>
            <p>Ingredients: {fetchedIngredients}</p>
            <p>
                Price:{" "}
                <strong>USD {parseFloat(props.order.price).toFixed(2)}</strong>
            </p>
        </div>
    );
};

export default order;
