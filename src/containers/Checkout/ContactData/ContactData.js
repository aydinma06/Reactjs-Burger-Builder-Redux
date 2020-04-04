import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
    state = {
        orderFrom: {
            name: {
                elementType: "input",
                elementConfig: { type: "text", placeholder: "Your Name" },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: "input",
                elementConfig: { type: "text", placeholder: "Street" },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: "input",
                elementConfig: { type: "text", placeholder: "ZIP Code" },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: "input",
                elementConfig: { type: "text", placeholder: "Country" },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: "input",
                elementConfig: { type: "email", placeholder: "E-Mail" },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },

            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: "fastest", displayValue: "Fastest" },
                        { value: "cheapest", displayValue: "Cheapest" }
                    ],

                    type: "text",
                    placeholder: "Street"
                },
                validation: {},
                value: "fastest",
                valid: true,
                touched: false
            }
        },
        formIsValid: false,
        loading: false
    };

    getCurrentDate() {
        const today = new Date();
        const date =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate();
        const time =
            today.getHours() -
            1 +
            ":" +
            today.getMinutes() +
            ":" +
            today.getSeconds();
        return date + " " + time;
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    orderHandler = event => {
        const dateTime = this.getCurrentDate();
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.orderFrom) {
            formData[formElementIdentifier] = this.state.orderFrom[
                formElementIdentifier
            ].value;
        }
        const order = {
            date: dateTime,
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        };
        axios
            .post("/orders.json", order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push("/");
            })
            .catch(error => {
                this.setState({ loading: false });
            });
        event.preventDefault();
    };

    inputChangedHandler = (event, inputIndentifier) => {
        const updatedOrderForm = { ...this.state.orderFrom };
        const updatedFormElement = { ...updatedOrderForm[inputIndentifier] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidity(
            updatedFormElement.value,
            updatedFormElement.validation
        );
        updatedOrderForm[inputIndentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIndentifier in updatedOrderForm) {
            formIsValid =
                updatedOrderForm[inputIndentifier].valid && formIsValid;
        }

        this.setState({
            orderFrom: updatedOrderForm,
            formIsValid: formIsValid
        });
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderFrom) {
            formElementsArray.push({
                id: key,
                config: this.state.orderFrom[key]
            });
        }
        let createdFrom = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={event =>
                            this.inputChangedHandler(event, formElement.id)
                        }
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                    />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>
                    Order
                </Button>
            </form>
        );
        if (this.state.loading) {
            createdFrom = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {createdFrom}
            </div>
        );
    }
}

export default ContactData;
