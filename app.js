const express = require('express');
const app = express();
const itemRoutes = require('./routes/items');
const ExpressError = require('./expressError');

/**404 handler */
app.use(function(req, res, next) {
    return new ExpressError('Not Found', 404);
});

/** general error handler */

app.use(function(err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;

    // set the status and alert the user
    return res.status(status).json({
        error: err.message,
    });
});

module.exports = app;





