
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const propertyRoutes = require('./src/routes/propertyRoutes');
const userRoutes = require('./src/routes/userRoutes');
const auth = require('./src/middleware/auth');

const app = express();
const PORT = 3001;
const MONGODB_URI = 'mongodb+srv://admin:WZ78OlkbcEPd6Cwi@cluster0.1nvhidr.mongodb.net/cluster0?retryWrites=true&w=majority';

app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/properties', auth, propertyRoutes);
app.get("/", (req,res)=>{
  res.json("hello");
})
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => console.error(error));

