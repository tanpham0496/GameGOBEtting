const serviceChat = require('../../containers/Chat/service');
const serviceMatch = require('../../containers/Matchs/service');
const serviceRound = require('../../containers/Round/service');
const cron = require('node-cron');

//construction
let client = 0;
let roomNo = 1;
let listPlayerBetting = [];
let userJoinMatch = true;

let timeBetting = 15 * 1000; //seconds

let timeWaiting = 5 * 1 * 1000;

let startRound1 = 10 * 1000;     // 1con/1s => 30con = 30s       =======>>> TESTING
// let startRound2 = startRound1 + 15 * 1000 + timeBetting ;   // 1con/0.5s => 30con = 15s
// let startRound3 = startRound2 + 6 * 1000 + timeBetting;   // 1con/0.2s => 30con = 6s
// let timeResult =  startRound3 + 9 * 1000 + timeBetting;   //1con/0.1s => 90con = 9s

let startRound2 = startRound1 + 30 * 1000 + timeBetting ;   // 1con/0.5s => 30con = 15s
let startRound3 = startRound2 + 15 * 1000 + timeBetting;   // 1con/0.2s => 30con = 6s
let timeResult =  startRound3 + 6 * 1000 + timeBetting;   //1con/0.1s => 90con = 9s


let round1 ;
let round2 ;
let round3 ;
let round4 ;
let result ;
let dataOnMatch;
let betting ;



module.exports = (io) => {
	// Total time of Match = (15m +30s + 15s)round1 + (15s+15s)round2 +(6s+15s)round3 + (9s+15s)final = 17th minute
	// Start new Game every 20th minute
	cron.schedule('*/3 * * * *', async () => {
		//initial and reset data on round after every match
		round1 = {};
		round2 = {};
		round3 = {};
		round4 = {};
		result = {};
		userJoinMatch = true;
		betting = false;

		//step create data or get data follow http/https, socket
		dataOnMatch = await serviceMatch.createData();
		dataOnMatch.match.data.map((round) => {
			if(round.roundNumber === 1) round1 =round;
			else if(round.roundNumber === 2) round2 = round;
			else if(round.roundNumber === 3) round3 = round;
			else result = round;
		});
		// Waiting for 15 minutes
		console.log('START_GAME_GO ===>');
		io.sockets.emit('START_GAME_GO' ,{timeWaiting});

		//finished 15 minutes => show round 1
		setTimeout(() => {
			userJoinMatch = false; //prevent user join room or betting while the match is progress
			console.log('======= >>>>>> START_ROUND_1111111 <<<<============');
			io.sockets.emit('RESPONSE_START_ROUND_1',{idMatch : dataOnMatch.match.id, round1 , timeWaiting : 30 * 1000} )
		},startRound1);

		//After 30s => begin betting (15s)
		setTimeout(() => {
			betting = true;
			console.log('===== >>> BEGIN_BETTING <<=====');
			io.sockets.emit('RESPONSE_BETTING' ,{betting, timeWaiting : 15 * 1000});
		},startRound1 + 30 * 1000);

		// show round 2
		setTimeout( async () => {
			betting = false;
			const param ={
				_idMatch : dataOnMatch.match.id,
				roundNumber : 1,
				listPlayerBetting : listPlayerBetting.length !==0 ? listPlayerBetting : []
			};
			const addRound = await serviceRound.addEveryRoundOnMatch(param);
			if(!addRound)
				return {  message : 'ADD ROUND NOT SUCCESS'};
			else {
				//reset list playerBetting on round one
				listPlayerBetting= []
			};

			console.log('======= >>>>>> START_ROUND_22222222 <<<<============');
			io.sockets.emit('RESPONSE_START_ROUND_2',{idMatch : dataOnMatch.match.id ,round2, addRound , betting ,timeWaiting : 15 * 1000} )
		},startRound2);

		//FOR 15S BET ON MATCH
		setTimeout(() => {
			betting = true;
			console.log('======= >>>>>> BETTING 222222<<<<============');
			io.sockets.emit('RESPONSE_BETTING' ,{betting,timeWaiting : 15 * 1000})
		},startRound2 + timeBetting);

		setTimeout( async () => {
			betting = false;
			const param ={
				_idMatch : dataOnMatch.match.id,
				roundNumber : 2,
				listPlayerBetting : listPlayerBetting.length !==0 ? listPlayerBetting : []
			};
			const addRound = await serviceRound.addEveryRoundOnMatch(param);
			if(!addRound)
				return { message : 'ADD ROUND NOT SUCCESS'};
			else {
				//reset list playerBetting on round one
				listPlayerBetting= []
			};
			console.log('======= >>>>>> START_ROUND_33333333 <<<<============');
			io.sockets.emit('RESPONSE_START_ROUND_3',{idMatch : dataOnMatch.match.id, round3 , addRound ,betting ,timeWaiting : 6 * 1000 } )
		},startRound3);

		//FOR 15S BET ON MATCH
		setTimeout(() => {
			betting = true;
			console.log('======= >>>>>> BETTING 333333<<<<============');
			io.sockets.emit('RESPONSE_BETTING' ,{ betting, timeWaiting : 15 * 1000})
		},startRound3 + timeBetting);

		setTimeout( async () => {
			betting = false;
			const param ={
				_idMatch : dataOnMatch.match.id,
				roundNumber : 3,
				listPlayerBetting : listPlayerBetting.length !==0 ? listPlayerBetting : []
			};
			const addRound = await serviceRound.addEveryRoundOnMatch(param);
			if(!addRound)
				return {  message : 'ADD ROUND NOT SUCCESS'};
			else {
				//reset list playerBetting on round one
				listPlayerBetting= []
			};
			console.log('=======> result <=========');
			io.sockets.emit('RESPONSE_RESULT',{idMatch : dataOnMatch.match.id, round4, addRound ,betting , timeWaiting : 9 * 1000})
		},timeResult);

	});

	// listen socket event
	io.on('connection', function(socket) {
		client ++;
		console.log(client  + ' ====> user connect Game' + socket.id);

		socket.on('USER_CONNECT', async (data) => {
			console.log(client + ' =====>client connected!');
			if(userJoinMatch) {
				//Increase roomNo limit 1000(user) clients are present in a room.
				if(io.nsps['/'].adapter.rooms["room-" + roomNo ] && io.nsps['/'].adapter.rooms["room-" + roomNo ].length > 999) roomNo++;
				socket.join("room-" + roomNo );

				//Send this event to everyone in the room.
				io.sockets.in("room-"+ roomNo).emit('connectToRoom', "You are in room no. " + roomNo);

				console.log("You are in room no. " +roomNo);
			}
			else {
				io.sockets.emit('WAITING_MATCH_FINISHED', {...data})
			}

		});

		socket.on( 'PUT_MONEY_ON_BET', async ({param}) => {
			//betting === true  => user bet for match
			betting && listPlayerBetting.push( param );
			console.log( 'Push ===> temporarily', listPlayerBetting )
		} );

		socket.on('SEND_MESSAGE',async ({param}) => {
			const addMessage = await serviceChat.addMessage(param);
			io.sockets.emit('RESPONSE_SEND_MESSAGE', {...addMessage});
		});

	   // connect failed
	   socket.on('connect_failed', function() {
		   console.log('==============> CONNECT USER FAILED <============== ')
		});

	   socket.on('disconnect', function() {
	   		client--;
	   		console.log(client  + ' ====> user connect Game');
		   	socket.leave("room-" + roomNo );
		})

	});


};

