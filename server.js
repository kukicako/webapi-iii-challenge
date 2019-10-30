const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');


const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//global middleware

server.use(helmet());
server.use(express.json());
server.use(morgan('dev'));

server.use("/users", logger('logger for user'), userRouter);
server.use("/posts", logger('logger for posts'), postRouter);

//custom middleware

function logger(req, res, next) {
  return (req, res, next) => {
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url}`
    );

    next();
  };
  
};

module.exports = server;
