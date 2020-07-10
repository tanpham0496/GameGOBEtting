
//Game
export const START_GAME = 'START_GAME';
export const RESPONSE_BETTING = 'RESPONSE_BETTING';
export const START_ROUND_ONE = 'START_ROUND_ONE';
export const START_ROUND_TWO = 'START_ROUND_TWO';
export const START_ROUND_THREE = 'START_ROUND_THREE';
export const RESPONSE_RESULT_ON_MATCH = 'RESPONSE_RESULT_ON_MATCH';

export const roundActions = {
    // pushTemporarilyListPlayer,
    //Game
    startGame,
    responseBetting,
    startRoundOne,
    startRoundTwo,
    startRoundThree,
    responseResultOnMatch
};

// function pushTemporarilyListPlayer(data) {
//     return ({type : PUSH_TEMPORARILY_LIST_PLAYER, data});
// }

// GAME

function startGame(data) {
    return ({type :START_GAME, data })
}
function responseBetting(data) {
    return ({type : RESPONSE_BETTING, data })
}
function startRoundOne(data) {
    return ({type : START_ROUND_ONE , data })
}
function startRoundTwo(data) {
    return ({type : START_ROUND_TWO , data })
}
function startRoundThree(data) {
    return ({type : START_ROUND_THREE , data })
}
function responseResultOnMatch(data) {
    return ({type : RESPONSE_RESULT_ON_MATCH , data })
}