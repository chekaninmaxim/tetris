"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _mongodb = _interopRequireDefault(require("mongodb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(req, res, next) {
  var authorizationHeader = req.headers.authorization;
  var token;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if (token) {
    _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        res.status(401).json({
          errors: {
            global: 'You must be authenticated to do that'
          }
        });
      } else {
        req.userId = new _mongodb["default"].ObjectId(decoded.user._id);
        next();
      }
    });
  } else {
    res.status(403).json({
      errors: {
        global: 'You must be authenticated to do that'
      }
    });
  }
};

exports["default"] = _default;