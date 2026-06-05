const express = require('express');
const app = express();
const dotenv = require('dotenv');
const workoutRoutes = require('./Routes/workouts')
const mongoose = require('mongoose')

dotenv.config();
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next();
})

app.get('/', (req, res) => {
  res.json('Welcome to our appln');
});


app.use('/api/workouts/', workoutRoutes)

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
     app.listen(PORT, () => {
      console.log(`App is running on http://localhost:${PORT} and connect to db`)
  })
  })
  .catch((error) => { console.log(error) })




