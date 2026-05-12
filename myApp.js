require('dotenv').config();
let express = require('express');
let app = express();

app.use(function(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})

/* app.get("/", 
   function(req, res) {
       res.send("Hello Express")
   } */

const absolutePath = __dirname + "/views/index.html";
app.get("/",
    function (req, res) {
        res.sendFile(absolutePath)
    }
)

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", function (req, res) {
    if (process.env.MESSAGE_STYLE === "uppercase") {
        res.json({ "message": "Hello json".toUpperCase() })
    } else {
        res.json({ "message": "Hello json" })
    }

})
console.log("Hello World")




































module.exports = app;
