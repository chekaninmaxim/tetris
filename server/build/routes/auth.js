"use strict";

var _express = _interopRequireDefault(require("express"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/', function (req, res) {
  var _req$body$credentials = req.body.credentials,
      email = _req$body$credentials.email,
      password = _req$body$credentials.password;
  var db = req.app.get('db');
  db.collection('users').findOne({
    email: email
  }, function (err, doc) {
    if (err) {
      res.status(500).json({
        errors: {
          global: err
        }
      });
      return;
    }

    if (doc) {
      if (_bcrypt["default"].compareSync(password, doc.password)) {
        var token = _jsonwebtoken["default"].sign({
          user: {
            _id: doc._id,
            email: doc.email,
            role: doc.role
          }
        }, process.env.JWT_SECRET);

        res.json({
          token: token
        });
      } else {
        res.status(401).json({
          errors: {
            global: 'Invalid credentials '
          }
        });
      }
    } else {
      res.status(401).json({
        errors: {
          global: 'Invalid credentials '
        }
      });
    }
  });
});
module.exports = router;