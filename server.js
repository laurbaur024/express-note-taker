

//requiring in dependency
const express = require('express');

//variable for express to be used
const app = express();

//ports for local and hosting
const PORT = process.env.PORT || 3000;


//public folder routes
app.use(express.static('public'));

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//requiring in the routes page
require('./routes/routes')(app);


//404 page
app.use((req, res) => {
  res.status(404).end();
});

//opens up the server
app.listen(PORT, () => {
  console.log(`Server running on localhost${PORT}`);
});