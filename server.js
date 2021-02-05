const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const express = require('express');
const path = require('path');
const app = express();

//Bodyparser Middleware
app.use(express.json());

app.use('/api/sites', require('./routes/api/sites.js'));
app.use('/api/users', require('./routes/api/users.js'));
app.use('/api/auth', require('./routes/api/auth.js'));

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//Set up port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
