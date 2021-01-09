const express = require('express');
const app = express(); 

const data = require('./data.json');
const { projects } = data;


app.use('/static', express.static('public'));
app.set( 'view engine', 'Pug');

app.get('/', (req, res) => {
    res.render('index', { project: data.projects });
});

app.get('/about', (req, res) => {
    res.render('about', { projects: projects });
});

app.get('/project/:id', (req, res) => {
        
        const { id } = req.params;
        const title = projects[id].project_Name;
        const description = projects[id].description;
        const technologies = projects[id].technologies;
        const img = projects[id].image_urls;
        const gitRepoPath = projects[id].github_link;
        const gitLinkDemo = projects[id].live_link;

        const templateData = { id, title, description, technologies, img, gitRepoPath, gitLinkDemo };

    
    res.render('project', templateData);
});


// ** Handling Errors 

//404 Error

app.use((req, res, next) => {
    const err = new Error();
    err.status = 404; 
    err.message = 'Looks like this page does not exist.'
    res.status(404).render('page-not-found');
});


// Globabl Error

app.use((err, req, res, next) => {

    if (err.status === 404) {
        res.status(404).render('page-not-found', { err });
    } else {
        res.status(err.status || 500).render('error', { err });
        
}

});


// Local Sever Host
app.listen(3000);