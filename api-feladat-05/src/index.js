const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);
mongoose.set('useNewUrlParser',true);
mongoose.set('useUnifiedTopology',true);
const app = express();

const port = 3000;

// database connection
if(!config.has('database')){
    console.log('No database config found');
    process.exit();
}
const {userName, password, host} = config.get('database');
mongoose.connect(`mongodb+srv://${userName}:${password}@${host}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then( () => console.log('mongodb connection established') )
    .catch( (err) => {
        console.log(err);
        process.exit();
    });


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