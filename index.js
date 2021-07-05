var express = require('express');
var session = require('express-session');
var cors = require('cors');
const CustomSearch = require('./Routes/customSearch');
const GetDetails = require('./Routes/getDetails');

var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use(express.static(path.join(__dirname, 'chatroom-app\\dist\\chatroom-app')));
app.use(session({
  secret: 'College Predictions',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: (1825 * 86400 * 1000),
    httpOnly: false
  }
}));

new CustomSearch(app);
new GetDetails(app);

app.listen(5000, () => console.log("Running on port 5000"))


