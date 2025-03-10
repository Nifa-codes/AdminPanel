require('dotenv').config();
const express= require('express');
const app = require('./app');
const http=require('http');
const server=http.createServer(app);
const PORT=process.env.PORT||5000;

server.on('error', (error) => {
    console.error('Server error:', error);
  });
server.listen(PORT, function () {
    console.log('UP');

});
