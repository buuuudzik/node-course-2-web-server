var express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use('/assets', express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  
  console.log(log)
  
  next();
});

//app.use((req, res, next) => {
//  res.render('maintenance.hbs');
//});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
      pageTitle: 'Home',
      welcomeMessage: 'Witaj Użytkowniku;) W czym możemy pomóc?'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
      pageTitle: 'About Page'
    });
});

app.get('/json', (req, res) => {
    res.send(req);
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request.',
        status: 'BAD_REQUEST'
    });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});