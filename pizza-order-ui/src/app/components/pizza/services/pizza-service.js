import * as io from "socket.io-client";
import {Observable }from "rxjs";

class PizzaService {
    constructor(){
        this._socketUrl = "http://localhost:9090/pizza";
        this._socket = io(this._socketUrl);
    }

    getPizzaList(){
        return new Observable(observer => {
            this._socket.on("pizzaList", pizzas =>{
                observer.next(pizzas)
            })
        })
    }

    getPizzaOrderCountByPizzaName() {
        return new Observable(observer =>{
            this._socket.on("pizzaOrdersCount", pizzaCount=>{
                console.log('current count', pizzaCount)
                observer.next(pizzaCount);
            });
        })
    }
    newCustomerOrder(order){
        this._socket.emit("newPizzaOrders", order);
    }
}

export default new PizzaService()