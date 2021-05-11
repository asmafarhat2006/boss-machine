const express = require('express');
const db = require('./db.js');
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');
const ideasRouter = express.Router();

const modelName = 'ideas';
ideasRouter.param('id', (req, res, next, id) => {
    const idea = db.getFromDatabaseById('ideas',id);

    if (idea) {
      req.idea = idea;
      next();
   
    }else{
      res.status(404).send('Idea not found!');
   
    } 
     
  });
ideasRouter.get('/', (req, res, next) => {
    const ideasArray = db.getAllFromDatabase(modelName);
    console.log(ideasArray);
    res.send(ideasArray);
  });
  ideasRouter.get('/:id', (req, res, next)=>{
   // const idea = db.getFromDatabaseById(modelName,req.params.ideaId);
    res.send(req.idea);

});
ideasRouter.put('/:id',checkMillionDollarIdea, (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    const numWeeks = req.body.numWeeks;
    const weeklyRevenue = req.body.weeklyRevenue;
    
    if (name === "" || description === "" || numWeeks === "" || weeklyRevenue === "") {
        res.status(400).send();
    }
    req.body.weeklyRevenue = Number(weeklyRevenue);
    req.body.numWeeks = Number(numWeeks);
    const updateIdea = db.updateInstanceInDatabase(modelName,req.body);
    res.send(updateIdea);
  });
  ideasRouter.delete('/:id', (req, res, next) => {
    const response = db.deleteFromDatabasebyId(modelName,req.minion.id);  
    res.status(204).send(response);
  });
ideasRouter.post('/', checkMillionDollarIdea,(req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    const numWeeks = req.body.numWeeks;
    const weeklyRevenue = req.body.weeklyRevenue;
    
    if (name === "" || description === "" || numWeeks === "" || weeklyRevenue === "") {
        res.status(400).send();
    }
    else {
        req.body.weeklyRevenue = Number(weeklyRevenue);
        req.body.numWeeks = Number(numWeeks);
        const createdIdea = db.addToDatabase(modelName, req.body);
        res.status(201).send(createdIdea);
    }
   

  });



module.exports = ideasRouter;