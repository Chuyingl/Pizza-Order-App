const app = require("express")();
const http = require("http").Server(app);
const io =require("socket.io")(http, {
    cors:{
        origin : "http://localhost:3000",
        methods: ["GET", "POST"]
    }
}) 
const mongo = require("mongodb").MongoClient;
const port = process.env.PORT|| 9090;

io.of("/pizza").on("connection", socket=>{
  mongo.connect("mongodb://localhost:27017",{
      useUnifiedTopology:true
  }).then(
      client =>{
        const db =client.db("pizza-order-db");
        const pizzasCollection =db.collection("pizzas");
        pizzasCollection.find({}).toArray((err,documents) =>{
            socket.emit('pizzaList', documents);
        });
        const pizzaOrdersCollection = db.collection("pizzaOrders");
        pizzaOrdersCollection.aggregate([
            {
                $group:{
                    _id: "$pizzaName",
                    count:{
                        $sum:1
                    }
                }
            }
        ]).toArray((err,documents) => {
            console.log('get count')
            socket.join("orders");
            socket.emit("pizzaOrdersCount", documents);
        })
        socket.on("newPizzaOrders", order =>{
            socket.join("orders");
            console.log('new order')
            pizzaOrdersCollection.insertOne(order).then(
                refreshedOrder =>{
                    pizzaOrdersCollection.aggregate([
                        {
                            $group:{
                                _id: "$pizzaName",
                                count:{
                                    $sum:1
                                }
                            }
                        }
                    ]).toArray((err,documents) => {
                        io.of("/pizza").to("orders").emit("pizzaOrdersCount", documents);
                    })
                }
            )
        })
      }
  )
})

http.listen(port, ()=> console.log(`Pizza service is listening on port ${port}`))