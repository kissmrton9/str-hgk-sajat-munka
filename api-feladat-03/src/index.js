const express = require('express');
const app = express();

const port = 3000;

app.use('/person', express.urlencoded({extended: true}), require('./controllers/routes'));

// swagger docs
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');

app.use('/person/docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));

app.use((err,req,res,next) => {
    console.error(`ERR ${err.statusCode || 500}: ${err.message}`);
    res.status(err.statusCode || 500);
    res.json({
        hasError: true,
        message: 'Invalid request'
    });
    console.log(err);
})

app.listen(port, () =>{
    console.log(`App is listening at http://localhost:${port}`);
});