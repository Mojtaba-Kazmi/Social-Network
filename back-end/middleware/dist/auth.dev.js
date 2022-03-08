"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var jwt = require('jsonwebtoken');

var queryDbb = require('../queryBdd'); //middleware qui vérifie le token de l'utilisateur


module.exports = function _callee(req, res, next) {
  var headers, _headers$authorizatio, _headers$authorizatio2, scheme, token, jwtToken, userId, userIsAdmin, insert, result;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // On vérifie que le header Authorization est présent dans la requete
          headers = req.headers;

          if (!(!headers || !headers.authorization)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: 'Missing Authorization header'
          }));

        case 4:
          //on vérifie que le header Authorization contient bien le token
          _headers$authorizatio = headers.authorization.split(' '), _headers$authorizatio2 = _slicedToArray(_headers$authorizatio, 2), scheme = _headers$authorizatio2[0], token = _headers$authorizatio2[1];

          if (!(!scheme || scheme.toLowerCase() !== 'bearer' || !token)) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: 'Header format is Authorization: Bearer token'
          }));

        case 7:
          //on vérifie et décode le token à l'aide du secret 
          jwtToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //on vérifie que l'utilisateur existe dans la base de donnée

          userId = jwtToken.userId;
          userIsAdmin = jwtToken.isAdmin;
          insert = [userId];
          _context.next = 13;
          return regeneratorRuntime.awrap(queryDbb.selectIdFromUser(insert));

        case 13:
          result = _context.sent;
          _context.prev = 14;

          if (result[0]) {
            _context.next = 17;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            error: 'l\'utilisateur n\'existe pas.'
          }));

        case 17:
          _context.next = 22;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](14);
          return _context.abrupt("return", res.status(500).json({
            error: "mysql2"
          }));

        case 22:
          //On passe l'utilisateur dans notre requete afin que celui-ci soit disponible pour les prochains middlewares
          req.user = userId;
          req.userIsAdmin = userIsAdmin; //On appelle le prochain middleware

          return _context.abrupt("return", next());

        case 27:
          _context.prev = 27;
          _context.t1 = _context["catch"](0);
          return _context.abrupt("return", res.status(401).json({
            message: 'Invalid token'
          }));

        case 30:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 27], [14, 19]]);
};
//# sourceMappingURL=auth.dev.js.map
