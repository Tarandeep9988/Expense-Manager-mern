const express = require('express'); 
const morgan = require('morgan');
require('dotenv').config();

const app = express();

app.use(morgan('dev'));


app.get('/', (req, res) => {
  return res.status(200).send('Hello world');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  
});
