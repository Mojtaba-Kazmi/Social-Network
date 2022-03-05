"use strict";

var fs = require('fs');

var queryDbb = require('../queryBdd'); //Création d'une discussion


exports.createDiscussion = function _callee(req, res, next) {
  var userId, title, insert, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userId = req.user;
          title = req.body.title;
          insert = [userId, title];
          _context.next = 5;
          return regeneratorRuntime.awrap(queryDbb.discussionCreate(insert));

        case 5:
          result = _context.sent;
          _context.prev = 6;
          return _context.abrupt("return", res.status(200).json(result));

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](6);
          return _context.abrupt("return", res.status(500).json({
            error: "mysql"
          }));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 10]]);
}; //récupération de toutes les discussion


exports.getAllDiscussion = function _callee2(req, res, next) {
  var result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(queryDbb.discussionSelectAll());

        case 2:
          result = _context2.sent;
          _context2.prev = 3;
          return _context2.abrupt("return", res.status(200).json(result));

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](3);
          return _context2.abrupt("return", res.status(500).json({
            error: "mysql"
          }));

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 7]]);
}; //récupération d'une discussion par son id


exports.getOneDiscussion = function _callee3(req, res, next) {
  var id, insert, result;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          insert = [id];
          _context3.next = 4;
          return regeneratorRuntime.awrap(queryDbb.discussionSelectOne(insert));

        case 4:
          result = _context3.sent;
          _context3.prev = 5;
          return _context3.abrupt("return", res.status(200).json(result));

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](5);
          return _context3.abrupt("return", res.status(500).json({
            error: "mysql"
          }));

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[5, 9]]);
}; //suppression d'une discussion 


exports.deleteDiscussion = function _callee4(req, res, next) {
  var id, isAdmin, insertId, messageIds, i, insert, queryStringFindFile, filename;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          isAdmin = req.userIsAdmin;
          insertId = [id];

          if (!(isAdmin == 1)) {
            _context4.next = 34;
            break;
          }

          _context4.next = 6;
          return regeneratorRuntime.awrap(queryDbb.selectMessageForDiscussionDelete(insertId));

        case 6:
          messageIds = _context4.sent;
          i = 0;

        case 8:
          if (!(i < messageIds.length)) {
            _context4.next = 31;
            break;
          }

          insert = [messageIds[i].id];
          _context4.next = 12;
          return regeneratorRuntime.awrap(queryDbb.fileFind(insert));

        case 12:
          queryStringFindFile = _context4.sent;

          if (queryStringFindFile[0].file !== null) {
            filename = queryStringFindFile[0].file.split('/images/')[1];
            fs.unlinkSync("./images/".concat(filename));
          }

          _context4.prev = 14;
          _context4.next = 17;
          return regeneratorRuntime.awrap(queryDbb.commentDeleteMessageId(insert));

        case 17:
          _context4.next = 19;
          return regeneratorRuntime.awrap(queryDbb.discussionDeleteLikeMessage(insert));

        case 19:
          _context4.next = 21;
          return regeneratorRuntime.awrap(queryDbb.discussionDeleteMessage(insertId));

        case 21:
          _context4.next = 23;
          return regeneratorRuntime.awrap(queryDbb.discussionDelete(insertId));

        case 23:
          _context4.next = 28;
          break;

        case 25:
          _context4.prev = 25;
          _context4.t0 = _context4["catch"](14);
          return _context4.abrupt("return", res.status(500).json({
            error: "mysql"
          }));

        case 28:
          i++;
          _context4.next = 8;
          break;

        case 31:
          return _context4.abrupt("return", res.status(200).json("Discussion supprimée"));

        case 34:
          return _context4.abrupt("return", res.status(400).json({
            error: "Vous n'êtes pas autorisé à supprimer cette discussion"
          }));

        case 35:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[14, 25]]);
}; //création d'un message


exports.createMessage = function _callee5(req, res, next) {
  var userId, message, discussionId, date, file, insert, result;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          userId = req.user;
          message = req.body.text_message;
          discussionId = req.body.discussionId;
          date = new Date();
          file = null;

          if (req.file) {
            file = "".concat(req.protocol, "://").concat(req.get('host'), "/images/").concat(req.file.filename);
          }

          insert = [userId, discussionId, message, date, file];
          _context5.next = 9;
          return regeneratorRuntime.awrap(queryDbb.messageCreate(insert));

        case 9:
          result = _context5.sent;
          _context5.prev = 10;
          return _context5.abrupt("return", res.status(200).json(result));

        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](10);
          return _context5.abrupt("return", res.status(500).json({
            error: "mysql"
          }));

        case 17:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[10, 14]]);
}; //récupération de tous les messages


exports.getAllMessage = function _callee6(req, res, next) {
  var discussionId, insert, result, i, insert2, nb_like;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          discussionId = req.params.id;
          insert = [discussionId];
          _context6.next = 4;
          return regeneratorRuntime.awrap(queryDbb.messageSelectAll(insert));

        case 4:
          result = _context6.sent;
          i = 0;

        case 6:
          if (!(i < result.length)) {
            _context6.next = 21;
            break;
          }

          insert2 = [result[i].id];
          _context6.next = 10;
          return regeneratorRuntime.awrap(queryDbb.messageNbLike(insert2));

        case 10:
          nb_like = _context6.sent;
          _context6.prev = 11;
          result[i].nbLike = nb_like[0].nb_like;
          _context6.next = 18;
          break;

        case 15:
          _context6.prev = 15;
          _context6.t0 = _context6["catch"](11);
          return _context6.abrupt("return", res.status(500).json({
            error: error
          }));

        case 18:
          i++;
          _context6.next = 6;
          break;

        case 21:
          return _context6.abrupt("return", res.status(200).json(result));

        case 22:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[11, 15]]);
}; //suppression d'un message 


exports.deleteMessage = function _callee7(req, res, next) {
  var userId, messageId, isAdmin, insertMessageId, result, queryStringFile, filename;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          userId = req.user;
          messageId = req.body.id;
          isAdmin = req.userIsAdmin;
          insertMessageId = [messageId]; //1 On vérifie que l'utilisateur correspond à l'utilisateur qui a posté le message ou qu'il est admin

          _context7.next = 6;
          return regeneratorRuntime.awrap(queryDbb.messageUserIdBeforeDelete(insertMessageId));

        case 6:
          result = _context7.sent;
          _context7.prev = 7;

          if (!(result[0].user_id != userId && isAdmin == 0)) {
            _context7.next = 10;
            break;
          }

          return _context7.abrupt("return", res.status(400).json({
            message: "Vous ne pouvez pas supprimer ce message !"
          }));

        case 10:
          _context7.next = 12;
          return regeneratorRuntime.awrap(queryDbb.commentDeleteMessageId(insertMessageId));

        case 12:
          _context7.next = 14;
          return regeneratorRuntime.awrap(queryDbb.messageDeleteLike(insertMessageId));

        case 14:
          _context7.next = 16;
          return regeneratorRuntime.awrap(queryDbb.fileFind(insertMessageId));

        case 16:
          queryStringFile = _context7.sent;

          if (queryStringFile[0].file !== null) {
            filename = queryStringFile[0].file.split('/images/')[1];
            fs.unlinkSync("./images/".concat(filename));
          }

          _context7.next = 20;
          return regeneratorRuntime.awrap(queryDbb.messageDelete(insertMessageId));

        case 20:
          return _context7.abrupt("return", res.status(200).json({
            "message": "Message supprimé"
          }));

        case 23:
          _context7.prev = 23;
          _context7.t0 = _context7["catch"](7);
          return _context7.abrupt("return", res.status(500).json({
            error: "mysql"
          }));

        case 26:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[7, 23]]);
}; //Insertion d'un like


exports.likeMessage = function _callee8(req, res, next) {
  var userId, messageId, date, insertFirst, insertMessageId, insertForDelete, resultUser, result;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          userId = req.user;
          messageId = req.body.message_id;
          date = new Date();
          insertFirst = [userId, messageId, date];
          insertMessageId = [userId, messageId];
          insertForDelete = [userId, messageId];
          _context8.next = 8;
          return regeneratorRuntime.awrap(queryDbb.messageUserLike(insertMessageId));

        case 8:
          resultUser = _context8.sent;
          _context8.prev = 9;

          if (!(resultUser.length > 0)) {
            _context8.next = 16;
            break;
          }

          _context8.next = 13;
          return regeneratorRuntime.awrap(queryDbb.messageUserDislike(insertForDelete));

        case 13:
          return _context8.abrupt("return", res.status(200).json({
            message: "Like supprimé de la base"
          }));

        case 16:
          _context8.next = 18;
          return regeneratorRuntime.awrap(queryDbb.messageLike(insertFirst));

        case 18:
          result = _context8.sent;
          return _context8.abrupt("return", res.status(200).json(result));

        case 20:
          _context8.next = 25;
          break;

        case 22:
          _context8.prev = 22;
          _context8.t0 = _context8["catch"](9);
          return _context8.abrupt("return", res.status(500).json({
            error: "mysql"
          }));

        case 25:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[9, 22]]);
}; //création d'un commentaire


exports.commentMessage = function _callee9(req, res, next) {
  var userId, messageId, comment, date, insert, result;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          userId = req.user;
          messageId = req.body.message_id;
          comment = req.body.text_comment;
          date = new Date();
          insert = [userId, messageId, comment, date];
          _context9.next = 7;
          return regeneratorRuntime.awrap(queryDbb.messageCommentCreate(insert));

        case 7:
          result = _context9.sent;
          _context9.prev = 8;
          return _context9.abrupt("return", res.status(200).json(result));

        case 12:
          _context9.prev = 12;
          _context9.t0 = _context9["catch"](8);
          return _context9.abrupt("return", res.status(500).json({
            error: "mysql"
          }));

        case 15:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[8, 12]]);
}; //récupérations des commentaires


exports.getComment = function _callee10(req, res, next) {
  var userId, messageId, insert, result;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          userId = req.user;
          messageId = req.params.id;
          insert = [messageId];
          _context10.next = 5;
          return regeneratorRuntime.awrap(queryDbb.commentSelectAll(insert));

        case 5:
          result = _context10.sent;
          _context10.prev = 6;
          return _context10.abrupt("return", res.status(200).json(result));

        case 10:
          _context10.prev = 10;
          _context10.t0 = _context10["catch"](6);
          return _context10.abrupt("return", res.status(500).json({
            error: "mysql"
          }));

        case 13:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[6, 10]]);
}; //suppression d'un commentaire 


exports.deleteComment = function _callee11(req, res, next) {
  var userId, commentId, isAdmin, insertCommentId, result;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          userId = req.user;
          commentId = req.body.id;
          isAdmin = req.userIsAdmin;
          insertCommentId = [commentId];
          _context11.next = 6;
          return regeneratorRuntime.awrap(queryDbb.commentSelectUserIdBeforeDelete(insertCommentId));

        case 6:
          result = _context11.sent;

          if (!(result[0].user_id != userId && isAdmin == 0)) {
            _context11.next = 9;
            break;
          }

          return _context11.abrupt("return", res.status(400).json({
            message: "Vous ne pouvez pas supprimer ce commentaire !"
          }));

        case 9:
          _context11.prev = 9;
          _context11.next = 12;
          return regeneratorRuntime.awrap(queryDbb.commentDeleteCommentId(insertCommentId));

        case 12:
          return _context11.abrupt("return", res.status(200).json({
            message: "Commentaire supprimé"
          }));

        case 15:
          _context11.prev = 15;
          _context11.t0 = _context11["catch"](9);
          return _context11.abrupt("return", res.status(500).json({
            error: "mysql"
          }));

        case 18:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[9, 15]]);
};
//# sourceMappingURL=discussion.dev.js.map
