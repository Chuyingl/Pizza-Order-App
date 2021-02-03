import React, { Component } from "react";
import PizzaOrder from "./components/pizza/container/PizzaOrder"


export default class RootComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
         <PizzaOrder/>
        );
    }
}