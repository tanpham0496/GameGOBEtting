const express = require('express');
const router = express.Router();
const service = require('./service');

// router.post('/getDataOnRound', getDataOnRound);
router.post('/createData', createData);
module.exports = router;

// function getDataOnRound(req, res, next) {
//     service.getDataOnRound(req.body)
//         .then(result => res.json({result}))
//         .catch(err => next(err));
// }

function createData(req, res, next) {
    service.createData()
        .then(result => res.json({result}))
        .catch(err => next(err));
}