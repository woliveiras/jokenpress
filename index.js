/* eslint-disable consistent-return */
/* eslint-disable no-console */
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3000;

// Configuration

app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'default',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
  })
);

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('static'));
app.use(express.urlencoded());

// Application

let data = {
  userName: null,
  scores: {
    user: 0,
    computer: 0
  }
};

app.get('/', (request, response) => {
  data.scores.user = 0;
  data.scores.computer = 0;

  response.render('index');
});

app.post('/jokenpo', (request, response) => {
  const userName = request.body.userName;
  data.userName = userName;

  response.render('game', {
    userName: data.userName
  });
});

app.get('/jokenpo', (request, response) => {
  response.render('game', {
    userName: data.userName
  });
});

app.post('/endgame', (request, response) => {
  const options = {
    pedra: 1,
    papel: 2,
    tesoura: 3
  };
  const userChoice = options[request.body.userChoice];
  const computerChoice = Math.round(Math.random() * 2) + 1;
  let result = null;

  if (userChoice === 1 && computerChoice === 3) {
    result = 'Você ganhou';
    data.scores.user += 1;
  } else if (userChoice === 1 && computerChoice === 2) {
    result = 'Você perdeu!';
    data.scores.computer += 1;
  } else if (userChoice === 1 && computerChoice === 1) {
    result = 'Empatou!';
  }

  if (userChoice === 2 && computerChoice === 1) {
    result = 'Você ganhou';
    data.scores.user += 1;
  } else if (userChoice === 2 && computerChoice === 3) {
    result = 'Você perdeu!';
    data.scores.computer += 1;
  } else if (userChoice === 2 && computerChoice === 2) {
    result = 'Empatou!';
  }

  if (userChoice === 3 && computerChoice === 2) {
    result = 'Você ganhou';
    data.scores.user += 1;
  } else if (userChoice === 3 && computerChoice === 1) {
    result = 'Você perdeu!';
    console.log('Travei aqui');
    data.scores.computer += 1;
  } else if (userChoice === 3 && computerChoice === 3) {
    result = 'Empatou!';
  }

  console.log(userChoice);
  response.render('end-game', {
    result: result
  });
});

app.get('/scores', (request, response) => {
  response.render('scores', {
    userName: data.userName,
    scores: data.scores
  });
});

app.listen(port, err => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});
