require('dotenv').config();
let express = require('express');
let app = express();
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});



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

});

app.get("/now", function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.json({time: req.time})
}
);

app.get("/:word/echo", function(req, res) {
    res.json({echo: req.params.word});
});

app.route("/name").get(function(req, res) {
    const first = req.query.first;
    const last = req.query.last;
    res.json({name: `${first} ${last}`});
}).post(function(req, res) {
    const first = req.body.first;
    const last = req.body.last;
    res.json({name: `${first} ${last}`});
})

console.log("Hello World")




































module.exports = app;
