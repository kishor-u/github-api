'use strict'
const express = require('express');
const request = require('request');
const router = express.Router();
const GetStarRepositoryController = require('../controller/get_repository_controller')

router.get('/repos/', function(req, res, next) {
  res.send('Please specify the org name like /repos/{orgName}');
});

/* Resolving the success request */
router.get('/repos/:repoName', function(req, res, next) {
  GetStarRepositoryController.function(req, res);
});

module.exports = router;
