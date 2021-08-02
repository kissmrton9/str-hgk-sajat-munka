require('dotenv').config();
const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);
mongoose.set('useNewUrlParser',true);
mongoose.set('useUnifiedTopology',true);
const app = express();

const port = process.env.PORT || 3000;

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

// Authenctication.
const authenticateJwt = require('./auth/authenticate');
const adminOnly = require('./auth/adminOnly');
const authHandler = require('./auth/authHandler');

app.use(express.urlencoded({extended: true}), express.json());

// Router
app.post('/login', authHandler.login);
app.post('/refresh', authHandler.refresh);
app.post('/logout', authHandler.logout);

app.use('/person', authenticateJwt, require('./controllers/person.routes'));
app.use('/vaccines', require('./controllers/vaccine.routes'));

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