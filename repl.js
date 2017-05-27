var mongoose = require('mongoose');
var repl = require('repl').start({});
var models = require('./models');


require('./mongo')().then(() => {
  repl.context.models = models;


  Object.keys(models).forEach((modelName) => {
    repl.context[modelName] = mongoose.model(modelName);
  });


  repl.context.lg = (data) => console.log(data);
});








