const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const proj_routes = require('./routes/routes');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/', proj_routes);

app.listen(5000, () => {
    console.log("Server started on port 5000")
})

