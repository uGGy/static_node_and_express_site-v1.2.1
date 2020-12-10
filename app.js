const express = require('express');
const app = express(); 

const data = require('./data.json');
const { projects } = data; 
console.log(projects);

app.use('/static', express.static('public'));
app.set( 'view engine', 'Pug');

app.get('/', (req, res) => {
    res.render('index', projects);
});

app.get('/about', (req, res) => {
    res.render('about', projects);
});

app.get('/project/:id', (req, res) => {
    res.render('project', projects);
});


// Handling Errors 

app.use((req, res, next) => {
    const err404 = new Error('It seems like this page does not exist');
    const err500 = new Error('Outch, error 500! There is a server problem');

   if  (err.status = 404) {
    next(err404);
   };

   if (err.stauts = 500) {
       next(err500);
   };

});

// Local Sever Host
app.listen(3000);