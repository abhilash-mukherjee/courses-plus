
const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config();
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
mongoose.connect(process.env.MONGODB_URI).then(()=>console.log("App connected")).catch(e => console.log(error.message));
app.get('/', (req, res) => {
    res.send('Hello World!')
})
