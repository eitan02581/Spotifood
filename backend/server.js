const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express()
const addUserRoutes = require('./routes/user-routes')
const addGroupRoutes = require('./routes/group-routes')
const addRecipeRoutes = require('./routes/recipe-routes')
const addUploadRoutes = require('./routes/upload-routes')
var http = require('http').Server(app);
var io = require('socket.io')(http);
const addSocketRoutes = require('./routes/socket-routes')

app.use(express.static('public'))
app.use(cors({
  origin: ['http://localhost:8080'],
  credentials: true // enable set cookie
}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'puki muki',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

addUserRoutes(app)
addGroupRoutes(app, io)
addRecipeRoutes(app)
addUploadRoutes(app)
addSocketRoutes(io)


const PORT = process.env.PORT || 3007;
http.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))


// ////////////////////////////////////////////////

// http.listen(3007, () => {
//   console.log('listening on *:3007');
// });





