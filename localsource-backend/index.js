const express = require('express');
const app = express();
//const repoContect = require("./repository/repository-wrapper.js")
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.listen(3000, function(){
    console.log("Server started. Listening on port 3000");
});

app.get("/api/products", (req,res) => {
    //mongoDB - get all products
    /*
    let products = repoContext.products.findAllProducts();
    res.send(products);
    */
});

app.get("/api/products/:id", (req,res) => {
    //mongoDB - get product by id
    /*
    let id = req.params.id;
    let products = repoContext.products.findAllProducts();
    */
});

app.post("/api/products", (req,res) => {
    //mongoDB - post
    /*
    let newProduct = req.body;
    let addedProduct = repoContext.products.createProduct(newProduct);
    res.send(addedProduct);
    */
});

app.put("/api/products", (req, res) => {
    //mongoDB - put
    /*
    let productToUpdate = req.body;
    let updatedProduct = repoContext.products.updateProduct(productToUpdate);
    res.send(updatedProduct);
    */
});

app.delete("/api/products/:id", (req, res) => {
    //mongoDB - delete by id
    /*
    let id = req.params.id;
    let updatedDataSet = repoContext.products.deleteProduct(id);
    res.send(updatedDataSet);
    */
});