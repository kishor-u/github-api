'use strict'
const express = require('express');
const request = require('request');
const router = express.Router();
var cache = require('../controller/cache_controller');
const GetStarRepositoryController = require('../controller/get_repository_controller')

router.get('/repos', function (req, res, next) {
  res.status(405).json({error: 'Invalid API. Please use POST /repos method'});
});

/* Resolving the success request */
router.post('/repos', cache(20), function (req, res, next) {
  GetStarRepositoryController.getTopStarRepoCount(req, res);
});

module.exports = router;
