const { join } = require('path')
const express = require('express')
const favicon = require('serve-favicon')
const app = express()
const PORT = 80


app.use(favicon(join(__dirname, 'public', 'favicon.ico')))
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Enable the public directory for resource files
app.use('/public', express.static(
  join(__dirname, 'public')
))

// reply to request with the hello world html file
app.get('/', function (req, res) {
  res.render('index')
})

// start a server on port 80 and log its start to our console
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

app.get('/hi', function (req, res) {
  res.json('hello-world')
})

var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var Door1Relay = new Gpio(4, 'out'); //use GPIO pin 4 as output
var Door2Relay = new Gpio(5, 'out'); //use GPIO pin 5 as output

app.all('/on', function (req, res) {
  Door1Relay.writeSync(1);
  res.json('ok -it should be working')
})

app.all('/off', function (req, res) {
  Door1Relay.writeSync(0);
  res.json('ok -it should stop')
})

app.all('/open-door',function(req, res){
  // Open the door
  Door1Relay.writeSync(1);
  // Lock the door in 5 secs
  setTimeout(()=>Door1Relay.writeSync(0), 5000);
  res.json('ok -I opened the door for a little bit')
});

app.all('/open-door2',function(req, res){
  // Open the door
  Door2Relay.writeSync(1);
  // Lock the door in 5 secs
  setTimeout(()=>Door2Relay.writeSync(0), 5000);
  res.json('ok -I opened the door2 for a little bit')
});

