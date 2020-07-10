const config = require('./config');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const dbURI = config.connectHost;
try {
    mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useFindAndModify : false,
        useUnifiedTopology: true
    })
} catch (error) { }

// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

mongoose.Promise = global.Promise;

module.exports = {
    User: require('../containers/User/model'),
    Round : require('../containers/Round/model'),
    Chatting : require('../containers/Chat/model'),
    Match : require('../containers/Matchs/model')
};
