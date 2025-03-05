const Route = require('express').Router;
const authRouter = require('./auth.route');

const routes = Route();

routes.use('/auth', authRouter);

module.exports = routes;

