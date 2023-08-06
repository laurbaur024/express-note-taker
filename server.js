


const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


require('./routes/routes')(app);



app.use((req, res) => {
  res.status(404).end();
});

app.all('*', (req, res) => {
  res.status(404).send('<h1>404! Page not found</h1>');
});

app.listen(PORT, () => {
  console.log(`Server running on localhost${PORT}`);
});