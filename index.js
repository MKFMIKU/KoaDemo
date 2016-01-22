var koa = require('koa.io');
var favicon = require('koa-favi');
var serve = require('koa-static');
var gzip = require('koa-gzip');
var fs = require('fs');
var app = koa();

app.use(gzip());
app.use(favicon());
app.use(serve(__dirname + '/public'));

var user = 0;
var direc = '/public/Ra.html'

app.use(function*() {
  this.body = fs.createReadStream(__dirname+ direc );
  this.type = 'html';
});


app.io.use(function* (next) {
  user++;
  console.log(user);
  if(user==2){
      direc = '/public/Rb.html';
  }
  yield* next;
  user--;
  console.log(user);
});

app.io.route('move', function* (next, step) {
    console.log("RC"+step);
     this.broadcast.emit('step', step);
});


app.listen(3000);