const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/rocketdb', { });
mongoose.connect('mongodb://rocketuser:a123456@ds121652.mlab.com:21652/rocketdb');

//Para apagar o banco:
/*mongoose.connection.on('open', function(){
    mongoose.connection.db.dropDatabase(function(err){
    console.log(err);
    });
});*/

mongoose.Promise = global.Promise;

module.exports = mongoose;