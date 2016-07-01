var webpackDevMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var express = require('express');
var app = express();
var compiler = webpack(webpackConfig);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// express will run webpack when a js file is changed
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/public/js',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app
    .get('/', function(request, response) {
      response.render('pages/home');
    })
    .get('/360', function(request, response) {
      response.render('pages/360');
    })


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


