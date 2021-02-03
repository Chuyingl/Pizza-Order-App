import React, { Component } from 'react'
import pizzaServiceObject from '../services/pizza-service'

export default class PizzaOrder extends Component {
    constructor(props){
        super(props);
        this.state ={
            pizzas:[]
        }
    }

    componentDidMount(){
       pizzaServiceObject.getPizzaList().subscribe(pizzaList =>{
           this.setState({
               pizzas: pizzaList
           })
       }) 
    }
    render() {
        let title = "Order Your Pizza!";
        return (
            <div>
              <h1>{title}</h1>  
              <br/>
              <table className="table table-hover table-striped">
                  <thead>
                      <tr>
                          <th>Image</th>
                          <th>Pizza Name</th>
                          <th>Ingredients</th>
                          <th>Price</th>
                          <th>Order Now</th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                          this.state.pizzas.map((pizza,idx)=><tr key={idx}>
                          <td><img src={pizza.imageUrl} alt={pizza.pizzaName}/></td>
                          <td><span>{pizza.pizzaName}</span></td>
                          <td><span>{pizza.ingredients}</span></td>
                          <td><span>{pizza.price}</span></td>
                          <td><button className="btn btn-primary">Order Now</button></td>
                      </tr>) 
                      }
                      
                  </tbody>
              </table>
            </div>
        )
    }
}
