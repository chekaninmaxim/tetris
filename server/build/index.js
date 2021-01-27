"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _mongodb = _interopRequireDefault(require("mongodb"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _users = _interopRequireDefault(require("./routes/users"));

var _auth = _interopRequireDefault(require("./routes/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

reguire("");
var app = (0, _express["default"])();

_dotenv["default"].config({
  path: _path["default"].join(__dirname, ".env")
}); // const isDev = app.get("env") === "development";


console.log(process.env);
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
})); // Routes

app.use("/api/users", _users["default"]);
app.use("/api/auth", _auth["default"]);
var port = process.env.PORT || 4000;
var mongoUrl = "".concat(process.env.DB_CONNECTION);

_mongodb["default"].MongoClient.connect(mongoUrl, {
  useNewUrlParser: true
}).then(function (client) {
  var db = client.db(process.env.DB_NAME);
  console.log('connected to db');
  app.set("db", db);
  app.listen(port, function () {
    return console.log("Running on localhost:".concat(port));
  });
})["catch"](function (err) {
  return console.log("Error connect");
});