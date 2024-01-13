const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const Product = require("./models/product.model");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const Admin = require("./models/admin.model");

mongoose.connect("mongodb+srv://consumer:consumer09@cluster0.ingz2z4.mongodb.net/?retryWrites=true&w=majority")
.then(function(){
    console.log("database connected sucessfully!");
})
.catch(function(error){
    console.log("Error connecting to database", error.message);
});
app.use(session({secret: "GeegstackAcademy", resave: true, saveUninitialized: false}));
app.use(flash());
app.use(methodOverride('_method'));
app.use(bodyparser.urlencoded({extended: false}));

app.set("view engine", "ejs");
app.set("views",__dirname + "/views");
app.use(express.static(__dirname + "/puplic"));

app.use(function(req, res, next) {
    res.locals.errorMsg = req.flash("error")
    res.locals.admin = req.session.adminId;
    next();
})

const productController = require("./controllers/product.controller");
const adminController = require ("./controllers/admin.controller");
const adminMiddleware = require("./middleware/admin.middleware");

app.get("/products", productController.productsPage);
app.use(express.static(__dirname + "/puplic-folder"))
app.get("/products/new", adminMiddleware, productController.createProductPage)
app.get("/products/:productId", productController.singleProductPage)
app.get("/products/:productid/edit", adminMiddleware, productController.editProductPage)
app.post("/products", adminMiddleware, productController.createProduct)
app.put("/products/:id", adminMiddleware, productController.updateProduct)
app.delete("/products/:id", adminMiddleware, productController.deleteProduct)


app.get("/admin/register", adminController.registerPage);
app.get("/admin/login", adminController.loginPage);
app.get("/admin/profile", adminMiddleware, adminController.adminProfile);

app.get("/", function(req, res){
    res.render("index.ejs");
})
app.get("/products", function(req, res){
    res.render("product.ejs", {products: products});
})

app.post("/admin/register", adminController.creatAccount); 
app.post("/admin/login", adminController.adminLogin);
app.post("/admin/logout", adminController.logout);




app.listen(5000);
