
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const propertyRoutes = require('./routes/propertyRoutes');
const userRoutes = require('./routes/userRoutes');
const auth = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = 'mongodb+srv://admin:secret123@cluster0.1nvhidr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/properties', auth, propertyRoutes);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => console.error(error));
app.get("/", (req,res)=>{
  res.json("hello");
})
