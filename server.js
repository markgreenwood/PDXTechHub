var express = require('express'),
  // TODO: require in our request proxy module
  requestProxy = require('express-request-proxy'),
  port = process.env.PORT || 3000,
  app = express();

// TODO: now use our proxy within a function to request
//        our github data on the server.

function proxyIndeed(request, response) {
  console.log('Routing Indeed request for', request.params[0]);
  (requestProxy({
    url: 'https://api.indeed.com/' + request.params[0],
    headers: { Authorization: 'token ' + process.env.GITHUB_TOKEN }
  }))(request, response);
};

app.get('/indeed/*', proxyIndeed);

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
