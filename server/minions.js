const express = require('express');
const db = require('./db.js');
const minionRouter = express.Router();

const modelName  = 'minions';
minionRouter.param('minionId', (req, res, next, id) => {
    const minion = db.getFromDatabaseById(modelName,id);
    if (minion === null) {
      res.status(404).send('Minion not found!');
    } else {
      req.minion = minion;
      next();
    }
  });
minionRouter.get('/', (req, res, next) => {
    const minionsArray = db.getAllFromDatabase(modelName);
    console.log(minionsArray);
    res.send(minionsArray);
});
minionRouter.get('/:minionId', (req, res, next)=>{
    res.send(req.minion);

});
minionRouter.put('/:minionId', (req, res, next) => {
    const name = req.body.name;
    const title = req.body.title;
    const salary = req.body.salary;
    const weaknesses = req.body.weaknesses;
    
    if (name === "" || title === "" || salary === "" || weaknesses === "") {
        res.status(400).send();
    }
    req.body.salary = Number(salary);
    const updatedMinion = db.updateInstanceInDatabase(modelName,req.body);
    res.send(updatedMinion);
  });
  minionRouter.delete('/:minionId', (req, res, next) => {
    const response = db.deleteFromDatabasebyId(modelName,req.minion.id);  
    res.status(204).send(response);
  });
  minionRouter.post('/', (req, res, next) => {
   /* req.salary = Number(req.salary);
    const createdMinion = db.addToDatabase('minions',{name: req.name, title: req.title,weaknesses : req.weaknesses,salary : (req.salary)});
    console.log(createdMinion);
    res.send(createdMinion);*/
    const name = req.body.name;
    const title = req.body.title;
    const salary = req.body.salary;
    const weaknesses = req.body.weaknesses;
    
    if (name === "" || title === "" || salary === "" || weaknesses === "") {
        res.status(400).send();
    }
    else {
        req.body.salary = Number(salary);
        const createdMinion = db.addToDatabase(modelName, req.body);
        res.status(201).send(createdMinion);
    }

  });



module.exports = minionRouter;