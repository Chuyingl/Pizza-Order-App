const app = require("express")();
const http = require("http").Server(app);
const io =require("socket.io")(http)
const mongo = require("mongodb").MongoClient;
const port = process.env.PORT|| 9090;

io.of("/pizza").on("connection", socket=>{
  mongo.connect("mongodb://localhost:27017",{
      useUnifiedTopology:true
  }).then(
      client =>{
        const db =client.db("pizza-order-db");
        const pizzaCollection =db.collection("pizzas");
      }
  )
})

http.listen(port, ()=> console.log(`Pizza service is listening on port ${port}`))