import express from "express";
import mongoose from "mongoose";

const app = express();

//Conexión DB
mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost:27017/products",
  { useNewUrlParser: true }
);
mongoose.connection.on("error", function (e) {
  console.error(e);
});

//schema
const schema = {
  name: String,
  price: Number,
};

//Model
const Product = mongoose.model("products", schema);

//Controller
app.get("/products", (req, res) =>{
    Product.find((err, data) =>{
        res.setHeader('content-type', 'application/json');
        res.status(200).send(data)
    })
})

app.listen(3000, () => console.log("Listening on port 3000"));
