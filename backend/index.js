const express = require('express')
const mongoose = require('mongoose');
const adminRouter = require('./routes/admin.js')
const userRouter = require('./routes/user.js')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 3000


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(bodyParser.json());
app.use(cors());
app.use('/admin',adminRouter);
app.use('/users',userRouter);

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("App connected")).catch(e => console.log(error.message));