const express = require('express');
const db = require('./db.js');
const apiRouter = express.Router();


const minionRouter = require('./minions.js');
apiRouter.use('/minions',minionRouter);
const ideasRouter = require('./ideas.js');
apiRouter.use('/ideas',ideasRouter);
const meetingsRouter = require('./meetings.js');
apiRouter.use('/meetings',meetingsRouter);

module.exports = apiRouter;  