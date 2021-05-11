const express = require('express');
const db = require('./db.js');
const meetingsRouter = express.Router();

const modelName = 'meetings';

meetingsRouter.get('/', (req, res, next) => {
    const meetingsArray = db.getAllFromDatabase(modelName);
    console.log(meetingsArray);
    res.send(meetingsArray);
  });

  meetingsRouter.post('/', (req, res, next) => {
  
        const createdMeeting = db.addToDatabase(modelName, db.createMeeting());
        res.status(201).send(createdMeeting);
    
   

  });
  meetingsRouter.delete('/',(req,res,next)=>{

    res.status(204).send(db.deleteAllFromDatabase(modelName));



  });



module.exports = meetingsRouter;