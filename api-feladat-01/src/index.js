const express = require('express');
const app = express();

const port = 3000;

app.use('/person',require('./controllers/routes'));

// swagger docs
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');

app.use('/person/docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));


app.listen(port, () =>{
    console.log(`App is listening at http://localhost:${port}`);
});