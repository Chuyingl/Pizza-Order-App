import React, { Component } from 'react'
import pizzaServiceObject from '../services/pizza-service'

export default class PizzaOrder extends Component {
    constructor(props){
        super(props);
        this.state ={
            pizzas:[],
            pizzaCountByName: []
        }
    }

    componentDidMount(){
       pizzaServiceObject.getPizzaList().subscribe(pizzaList =>{
           this.setState({
               pizzas: pizzaList
           })
       });
       pizzaServiceObject.getPizzaOrderCountByPizzaName().subscribe(
           pizzaCount => {
               this.setState({
                   pizzaCountByName: pizzaCount
                }
               )
           }
       ) 
    }

    onOrderSubmit(order){
        let newOrder={
            pizzaId: order.pizzaId,
            pizzaName: order.pizzaName,
            orderDate:new Date()
        };
        pizzaServiceObject.newCustomerOrder(newOrder);
    }
    render() {
        let title = "Order Your Pizza!";
        let pizzaOrderCountTitle = "See How Many customers ordered your Pizza!";
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
                          <td><img src={pizza.imageUrl} alt={pizza.pizzaName} height={'100px'} width={'100px'
                          }/></td>
                          <td><span>{pizza.pizzaName}</span></td>
                          <td><span>{pizza.ingredients}</span></td>
                          <td><span>{
                          new Intl.NumberFormat( "en", {
                             style: "currency",
                             currency: "USD",
                             maximumFractionDigits: 2,
                             minimumFractionDigits: 2,
                          }
                          ).format(pizza.price)
                          }</span></td>
                          <td><button onClick={()=>{this.onOrderSubmit(pizza)}}className="btn btn-primary">Order Now</button></td>
                      </tr>) 
                      }
                      
                  </tbody>
              </table>
              <br/>
              <h3>{pizzaOrderCountTitle}</h3>
              <table className="table table_hover table-striped">
                  <thead>
                      <tr>
                          <th>Pizza Name</th>
                          <th>Total Orders Recieved</th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                          this.state.pizzaCountByName.map((pizzaCount, idx) => 
                          <tr key={idx}>
                          <td><span>{pizzaCount._id}</span></td>
                          <td><span>{pizzaCount.count}</span></td>
                      </tr>
                          )
                      }
                     
                  </tbody>
              </table>
            </div>
        )
    }
}
