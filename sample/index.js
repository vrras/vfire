const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  multer = require('multer'),
  bodyParser = require('body-parser');
const authController = require('./controllers/auth.controller');
const firestoreController = require('./controllers/firestore.controller');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    server: 'Sample Vfire Server',
    uptime: process.uptime()
  });
});

authController(app);
firestoreController(app);

app.listen(port, () => {
  console.log('Mock server started on: ' + port);
});