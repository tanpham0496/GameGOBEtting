
module.exports = (app) => {
	app.use('/user', require('./containers/User/controller'));
	app.use('/match', require('./containers/Matchs/controller'));
	app.use('/round', require('./containers/Round/controller'));
	app.use('/chat', require('./containers/Chat/controller'));
}