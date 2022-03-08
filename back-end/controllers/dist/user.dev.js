"use strict";

//Imports
var fs = require('fs');

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var queryDbb = require('../queryBdd'); //Constant


var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/; //Controlers
//sauvegarde un nouvel utilisateur, hash le mot de passe

exports.signup = function _callee2(req, res, next) {
  var name, firstName, email, password, photo, insertEMail, resultUser;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          name = req.body.name;
          firstName = req.body.firstName;
          email = req.body.email;
          password = req.body.password;
          photo = null; //On vérifie si un fichier a été envoyé

          if (req.file) {
            photo = "".concat(req.protocol, "://").concat(req.get('host'), "/images/").concat(req.file.filename);
          } //on vérifie si l'email est correct


          if (emailRegex.test(email)) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            'error': 'l\'email n\'est pas valide'
          }));

        case 8:
          if (passwordRegex.test(password)) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            'error': 'mot de passe non valide : il doit contenir entre 4 et 8 caractères, 1 majuscule, 1 minuscule et 1 chiffre'
          }));

        case 10:
          if (!(name == null || firstName == null || email == null || password == null)) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            'error': 'items manquants'
          }));

        case 12:
          insertEMail = [email];
          _context2.next = 15;
          return regeneratorRuntime.awrap(queryDbb.userEmailUnique(insertEMail));

        case 15:
          resultUser = _context2.sent;
          _context2.prev = 16;

          if (!(resultUser.length > 0)) {
            _context2.next = 22;
            break;
          }

          if (!(resultUser[0].email == email)) {
            _context2.next = 20;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            'error': 'l\'email est déjà utilisé !'
          }));

        case 20:
          _context2.next = 23;
          break;

        case 22:
          // hachage du mot de passe, salage par 10
          bcrypt.hash(password, 10).then(function _callee(hash) {
            var insert, resultInsert;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    password = hash;
                    insert = [name, firstName, email, password, photo];
                    _context.next = 4;
                    return regeneratorRuntime.awrap(queryDbb.userCreate(insert));

                  case 4:
                    resultInsert = _context.sent;
                    return _context.abrupt("return", res.status(200).json(resultInsert));

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            });
          })["catch"](function (error) {
            return res.status(500).json({
              error: error
            });
          });

        case 23:
          _context2.next = 28;
          break;

        case 25:
          _context2.prev = 25;
          _context2.t0 = _context2["catch"](16);
          return _context2.abrupt("return", res.status(500).json({
            error: "mysql2"
          }));

        case 28:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[16, 25]]);
}; //vérifie si l'utilisateur existe, si oui, on vérifie le mot de passe. Si celui ci est correct, on renvoie un tokenn contenant l'ID de l'utilisateur
//sinon on renvoie une erreur


exports.login = function _callee3(req, res, next) {
  var email, password, insert, result, passwordBase;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          email = req.body.email;
          password = req.body.password;
          insert = [email];
          _context3.next = 5;
          return regeneratorRuntime.awrap(queryDbb.userLogin(insert));

        case 5:
          result = _context3.sent;
          _context3.prev = 6;

          if (!result[0]) {
            _context3.next = 12;
            break;
          }

          passwordBase = result[0].password.toString('utf-8');
          bcrypt.compare(password, passwordBase).then(function (resultTest) {
            if (resultTest == false) {
              return res.status(401).json({
                error: 'Mot de passe incorrect !'
              });
            } else {
              return res.status(200).json({
                userId: result[0].id,
                token: jwt.sign({
                  userId: result[0].id,
                  isAdmin: result[0].isAdmin
                }, 'RANDOM_TOKEN_SECRET', {
                  expiresIn: '1h'
                })
              });
            }
          })["catch"](function (err) {
            console.log(err);
          });
          _context3.next = 13;
          break;

        case 12:
          return _context3.abrupt("return", res.status(401).json({
            error: 'Utilisateur non trouvé !'
          }));

        case 13:
          _context3.next = 18;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](6);
          return _context3.abrupt("return", res.status(500).json({
            error: "mysql2"
          }));

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[6, 15]]);
}; //récupération du profil


exports.getProfil = function _callee4(req, res, next) {
  var userId, insert, result;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          userId = req.user;
          insert = [userId];
          _context4.next = 4;
          return regeneratorRuntime.awrap(queryDbb.userProfil(insert));

        case 4:
          result = _context4.sent;
          _context4.prev = 5;

          if (result[0]) {
            _context4.next = 10;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            error: 'l\'id ne correspond pas'
          }));

        case 10:
          return _context4.abrupt("return", res.status(200).json(result[0]));

        case 11:
          _context4.next = 16;
          break;

        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](5);
          return _context4.abrupt("return", res.status(500).json({
            error: "mysql2"
          }));

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[5, 13]]);
}; //mise à jour de la photo de profil


exports.updateProfil = function _callee5(req, res, next) {
  var userId, imageUrl, insert, insertId, resultPhoto, filename;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          userId = req.user;
          imageUrl = "".concat(req.protocol, "://").concat(req.get('host'), "/images/").concat(req.file.filename);
          insert = [imageUrl, userId];
          insertId = [userId];
          _context5.next = 6;
          return regeneratorRuntime.awrap(queryDbb.userProfilPhoto(insertId));

        case 6:
          resultPhoto = _context5.sent;

          if (resultPhoto[0].photo !== null) {
            //si il y a une photo de profil
            //on récupère le nom du filename
            filename = resultPhoto[0].photo.split('/images/')[1]; //on supprime le fichier du dossier images

            fs.unlinkSync("./images/".concat(filename));
          }

          _context5.next = 10;
          return regeneratorRuntime.awrap(queryDbb.userProfilUpdate(insert));

        case 10:
          _context5.prev = 10;
          return _context5.abrupt("return", res.status(200).json({
            message: 'photo mise à jour'
          }));

        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](10);
          return _context5.abrupt("return", res.status(500).json({
            error: "mysql2"
          }));

        case 17:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[10, 14]]);
}; //suppression du profil


exports.deleteProfil = function _callee6(req, res, next) {
  var userId, insert, resultPhoto, filename, resultFile, _filename;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          userId = req.user;
          insert = [userId]; //on vérifie si il y a une photo de profil

          _context6.next = 4;
          return regeneratorRuntime.awrap(queryDbb.userProfilPhoto(insert));

        case 4:
          resultPhoto = _context6.sent;

          if (resultPhoto[0].photo !== null) {
            //si il y a une photo de profil
            //on récupère le nom du filename
            filename = resultPhoto[0].photo.split('/images/')[1]; //on supprime le fichier du dossier images

            fs.unlinkSync("./images/".concat(filename));
          } //on vérifie si il y a des photos dans les messages de l'utilisateur


          _context6.next = 8;
          return regeneratorRuntime.awrap(queryDbb.fileMessageDeleteUser(insert));

        case 8:
          resultFile = _context6.sent;
          console.log(resultFile);
          console.log(resultFile.length);

          if (resultFile.length > 0) {
            //si il y a des fichiers on les supprime
            //on récupère le nom du filename
            _filename = resultFile[0].file.split('/images/')[1]; //on supprime le fichier du dossier images

            fs.unlinkSync("./images/".concat(_filename));
          }

          _context6.prev = 12;
          _context6.next = 15;
          return regeneratorRuntime.awrap(queryDbb.userDelete(insert));

        case 15:
          return _context6.abrupt("return", res.status(200).json('Profil supprimé'));

        case 18:
          _context6.prev = 18;
          _context6.t0 = _context6["catch"](12);
          return _context6.abrupt("return", res.status(500).json({
            error: "mysql2"
          }));

        case 21:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[12, 18]]);
};
//# sourceMappingURL=user.dev.js.map
