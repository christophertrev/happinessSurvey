var express = require('express')
var passport = require('./passport');
var authRoutes = require('./auth');
var userRoutes = require('./user');


function ensureAuthenticated(req, res, next) {
  console.log('is authenticated ?',req.isAuthenticated())
  if (req.isAuthenticated()) { 
    return next(); 
  }
  console.log('failed authentication')
  res.redirect('/')
}

module.exports = function (app) {
  app.use('/auth', authRoutes);
  app.use('/u', ensureAuthenticated, userRoutes);
}




