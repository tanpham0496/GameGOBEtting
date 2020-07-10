const router = require('express').Router();
const chatService = require('./service');

router.get('/getAll', getAll);
router.post('/getMessagePagination', getMessagePagination);

module.exports = router;

function getAll(req, res, next) {
    chatService.getAll()
        .then((result) => res.json({result}))
        .catch(err => next(err));
}

function getMessagePagination(req, res, next) {
    chatService.getMessagePagination(req.body)
        .then((result) => res.json(result))
        .catch(err => next(err));
}