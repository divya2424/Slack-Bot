/**
 * Created by Suraj on 30/12/18.
 */
const express = require('express');
var router = express.Router();

const todoController = require('../controllers/TodoController');
router
    .get('/list', todoController.getTodo)
    .post('/add', todoController.postTodo)
    .post('/mark',todoController.removeTodo)
  

module.exports = router;



