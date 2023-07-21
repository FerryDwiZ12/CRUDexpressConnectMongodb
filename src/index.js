const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const app = express();
const userRoutes = require('./routes/user.routes')


const PORT = process.env.PORT || 3001;

dotenv.config();

connectDB();

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended : true,
}))

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());

app.post('/addUser', userRoutes )
app.get('/user', userRoutes)
app.get('/user/:id', userRoutes)
app.delete('/delete/:id', userRoutes)
app.put('/update/:id', userRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
