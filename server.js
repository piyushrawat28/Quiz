const express = require("express");
const app = express(); 
const client = require("mongodb").MongoClient;
const cookieparser= require("cookie-parser");
const session = require("express-session");

app.use(cookieparser());
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(session({
    saveUninitialized:true,
    resave:false,
    secret:'ldshaljl43',
    cookie:{maxAge:3600000}
}))

let dbinstance;
client.connect("mongodb+srv://piyush1139be21:Piyush1139@cluster0.2xu4n9z.mongodb.net/?retryWrites=true&w=majority").then((data)=>{
    dbinstance = data.db("Login");
    console.log("DataBase Connect");
})

app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/");
})

app.get("/start",(req,res)=>{
    res.render("Quiz");p
})

app.get("/", (req, res) => {
    if(req.session.username){
        res.redirect("/dashboard");
    }
    else{
        res.render("home"); 
    }
});

app.get("/dashboard",(req,res)=>{
    if(req.session.username){
        res.render("DashBoard");
    }
    else{
        res.redirect("/")
    }
})

app.post('/login',(req,res)=>{
    dbinstance.collection("Users").findOne({"username":req.body.username , "password":req.body.password}).then((data)=>{
        if(data){
            req.session.username=req.body.username;
            res.redirect("/dashboard");
        }
        else{
            res.send("Invalid Id ans Password");
        }
    })
})

app.get("/sign",(req,res)=>{
    res.render("SignUp");
})

app.post("/signup",(req,res)=>{
    dbinstance.collection("Users").insertOne({"username" : req.body.username,"password":req.body.password}).then((data)=>{
        res.redirect("/");
    })
})


app.listen(3000, () => {
    console.log(`Server started on port `);
});
