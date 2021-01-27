"use strict";

var _express = _interopRequireDefault(require("express"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _isEmail = _interopRequireDefault(require("validator/lib/isEmail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

function validate(user, db, cb) {
  var errors = {};
  db.collection('users').findOne({
    email: user.email
  }, function (err, doc) {
    if (err) return {
      isValid: false,
      errors: {
        global: "Database error ".concat(err)
      }
    };
    if (doc) errors.email = 'User with such email already exists';
    if (!user.email) errors.email = "Can't be blank";
    if (!(0, _isEmail["default"])(user.email)) errors.email = 'Invalid email address';
    if (!user.password) errors.password = "Can't be blank";

    if (user.password !== user.passwordConfirmation) {
      errors.passwordConfirmation = 'Passwords must match';
    }

    return cb({
      isValid: Object.keys(errors).length === 0,
      errors: errors
    });
  });
}

router.post('/', function (req, res) {
  var user = {
    email: req.body.user.email,
    password: _bcrypt["default"].hashSync(req.body.user.password, 10)
  };
  var db = req.app.get('db');
  validate(req.body.user, db, function (_ref) {
    var isValid = _ref.isValid,
        errors = _ref.errors;

    if (!isValid) {
      res.status(400).json({
        errors: errors
      });
    } else {
      db.collection('users').insertOne(user, function (err) {
        if (err) {
          res.status(500).json({
            errors: {
              global: err
            }
          });
          return;
        }

        res.json({});
      });
    }
  });
});
module.exports = router;