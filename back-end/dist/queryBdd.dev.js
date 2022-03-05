"use strict";

var connection2 = require('./connexionDatabase2');

module.exports = {
  //création d'un user
  userCreate: function userCreate(insert) {
    return connection2.query('INSERT INTO User(name, firstName, email, password, photo) VALUES (?,?,?,?,?)', insert);
  },
  //vérification email unique
  userEmailUnique: function userEmailUnique(insertEMail) {
    return connection2.query('SELECT email FROM User WHERE email = ?', insertEMail);
  },
  //récupération d'un utilisateur pour le login
  userLogin: function userLogin(insert) {
    return connection2.query('SELECT * FROM User WHERE email = ? ', insert);
  },
  //récupération d'un utilisateur pour le profil
  userProfil: function userProfil(insert) {
    return connection2.query('SELECT name, firstName, photo FROM User WHERE id=?', insert);
  },
  //mise à jour de la photo de profil
  userProfilUpdate: function userProfilUpdate(insert) {
    return connection2.query('UPDATE User SET photo=? WHERE id=?', insert);
  },
  //récupération de la photo de profil
  userProfilPhoto: function userProfilPhoto(insert) {
    return connection2.query('SELECT photo FROM User WHERE id = ?', insert);
  },
  //supprime les commentaires liés à un utilisateur
  userCommentDelete: function userCommentDelete() {
    return 'DELETE FROM Comment WHERE user_id = ?';
  },
  //supprime les messages liés à un utilisateur
  userMessageDelete: function userMessageDelete() {
    return 'DELETE FROM Message WHERE user_id = ?';
  },
  //supprime l'utilisateur
  userDelete: function userDelete(insert) {
    return connection2.query('DELETE FROM User WHERE id=?', insert);
  },
  //creation de la discussion
  discussionCreate: function discussionCreate(insert) {
    return connection2.query('INSERT INTO Discussion(user_id,title) VALUES (?,?)', insert);
  },
  // récupération de toutes les discussions
  discussionSelectAll: function discussionSelectAll() {
    return connection2.query('SELECT title,id FROM Discussion');
  },
  // récupération d'une discussion
  discussionSelectOne: function discussionSelectOne(insert) {
    return connection2.query('SELECT title FROM Discussion WHERE id=?', insert);
  },
  // supression d'une discussion
  discussionDelete: function discussionDelete(insertId) {
    return connection2.query('DELETE FROM Discussion WHERE id=?', insertId);
  },
  //création d'un message
  messageCreate: function messageCreate(insert) {
    return connection2.query('INSERT INTO Message(user_id,discussion_id,text_message,date,file) VALUES (?,?,?,?,?)', insert);
  },
  //récupération de tous les messages
  messageSelectAll: function messageSelectAll(insert) {
    return connection2.query('SELECT Message.text_message, User.name, User.firstName, User.photo, Discussion.title, Discussion.id, Message.date, Message.id, Message.file FROM Message INNER JOIN Discussion ON Message.discussion_id = Discussion.id INNER JOIN User ON Message.user_id = User.id WHERE Discussion.id = ? ORDER BY Message.date DESC', insert);
  },
  //supression d'un fichier à partir de l'id du message
  fileDelete: function fileDelete(insert) {
    return connection2.query('SELECT file FROM Message WHERE id=?', insert);
  },
  //supression d'un fichier à partir de l'id du message
  UserDeleteFile: function UserDeleteFile() {
    return 'SELECT file FROM Message WHERE user_id=?';
  },
  //Vérification du userId avant de supprimer un message
  messageUserIdBeforeDelete: function messageUserIdBeforeDelete(insertMessageId) {
    return connection2.query('SELECT user_id FROM Message WHERE id=?', insertMessageId);
  },
  //Supression d'un message
  messageDelete: function messageDelete(insertMessageId) {
    return connection2.query('DELETE FROM Message WHERE id=?', insertMessageId);
  },
  //suppression d'un commentaire a partir du message_id
  commentDeleteMessageId: function commentDeleteMessageId(insert) {
    return connection2.query('DELETE FROM Comment WHERE message_id=?', insert);
  },
  //suppression d'un commentaire à partir de l'id du commentaire
  commentDeleteCommentId: function commentDeleteCommentId(insertCommentId) {
    return connection2.query('DELETE FROM Comment WHERE id=?', insertCommentId);
  },
  //récupération d'un fichier
  fileFind: function fileFind(insert) {
    return connection2.query('SELECT file FROM Message WHERE id = ?', insert);
  },
  //création d'un commentaire sur un message
  messageCommentCreate: function messageCommentCreate(insert) {
    return connection2.query('INSERT INTO Comment(user_id,message_id,text_comment,date_comment) VALUES (?,?,?,?)', insert);
  },
  //récupération des commentaires pour un message
  commentSelectAll: function commentSelectAll(insert) {
    return connection2.query('SELECT Comment.text_comment, User.name, User.firstName, Comment.date_comment, Comment.message_id, Comment.id, User.photo FROM Comment INNER JOIN Message ON Comment.message_id = Message.id INNER JOIN User ON Comment.user_id = User.id WHERE Message.id = ? ORDER BY Comment.date_comment ASC', insert);
  },
  //Vérification de l'utilisateur avant la suppression d'un message
  commentSelectUserIdBeforeDelete: function commentSelectUserIdBeforeDelete(insertCommentId) {
    return connection2.query('SELECT user_id FROM Comment WHERE id=?', insertCommentId);
  },
  //insertion d'un utilisateur qui aime un message
  messageLike: function messageLike(insertFirst) {
    return connection2.query('INSERT INTO Liked(user_id, message_id, liked_date) VALUES(?, ?, ?)', insertFirst);
  },
  //Compte le nombre d elike pour un message
  messageNbLike: function messageNbLike(insert2) {
    return connection2.query('SELECT COUNT(*) AS nb_like FROM Liked WHERE message_id = ?', insert2);
  },
  //Selectionne l'id de l'utilisateur qui aime un message
  messageUserLike: function messageUserLike(insertMessageId) {
    return connection2.query('SELECT user_id FROM Liked WHERE message_id = ?', insertMessageId);
  },
  messageUserDislike: function messageUserDislike(insertForDelete) {
    return connection2.query('DELETE FROM Liked WHERE user_id=? AND message_id= ?', insertForDelete);
  },
  //Supression des likes pour un message_id
  messageDeleteLike: function messageDeleteLike(insertMessageId) {
    return connection2.query('DELETE FROM Liked WHERE message_id=?', insertMessageId);
  },
  //Suppression des likes lors de la supression du profil
  messageLikeDeleteProfil: function messageLikeDeleteProfil() {
    return 'DELETE FROM Liked WHERE  user_id = ?';
  },
  //Sélection des id de messages en fonction de la discussion
  selectMessageForDiscussionDelete: function selectMessageForDiscussionDelete(insertId) {
    return connection2.query('SELECT id FROM Message WHERE discussion_id = ?', insertId);
  },
  discussionDeleteMessage: function discussionDeleteMessage(insertId) {
    return connection2.query('DELETE FROM Message WHERE discussion_id = ?', insertId);
  },
  discussionDeleteLikeMessage: function discussionDeleteLikeMessage(insert) {
    return connection2.query('DELETE FROM Liked WHERE message_id= ?', insert);
  },
  fileMessageDeleteUser: function fileMessageDeleteUser(insert) {
    return connection2.query('SELECT file FROM Message WHERE user_id = ?', insert);
  },
  selectIdFromUser: function selectIdFromUser(insert) {
    return connection2.query('SELECT id FROM User WHERE id=?', insert);
  },
  getUserById: function getUserById(userId) {
    return connection2.query('SELECT * FROM User WHERE id=?', userId);
  }
};
//# sourceMappingURL=queryBdd.dev.js.map
