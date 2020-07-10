const express = require('express');
const router = express.Router();
const service = require('./service');

// router.post('/getAllBetting',getAllBetting);
router.post('/addEveryRoundOnMatch',addEveryRoundOnMatch);
// router.post('/getBattingAmountEachRound', getBattingAmountEachRound);
router.post('/getResultBetting', getResultBetting);

module.exports = router;

// function getAllBetting(req, res, next) {
//     service.getAllBetting(req.body)
//         .then(result => res.json({result}))
//         .catch(err => next(err))
// }
function addEveryRoundOnMatch(req, res, next) {
    service.addEveryRoundOnMatch(req.body)
        .then(result => res.json({result}))
        .catch(err => next(err))
}
// function getBattingAmountEachRound(req, res, next) {
//     service.getBattingAmountEachRound(req.body)
//         .then(result => res.json({result}))
//         .catch(err => next(err))
// }
function getResultBetting( req, res, next ){
    service.getResultBetting(req.body)
        .then(result => res.json({result}))
        .catch(err => next(err))
}