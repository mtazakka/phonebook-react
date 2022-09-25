var express = require('express');
var router = express.Router();
var data = [
    {
        id: 1,
        name: 'Tazakka',
        phone: '08122230170'
    },
    {
        id: 2,
        name: 'Emir',
        phone: "081231231231"
    }
]

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.status(200).json(data)
});

router.post('/', function (req, res, next) {
    data.push({
        id: req.body.id,
        name: req.body.name,
        phone: req.body.phone
    })
    res.json(data[data.length - 1])
});

router.put('/:id', function (req, res, next) {
    data[req.params.id] = {
        name: req.body.name,
        phone: req.body.phone
    }
    res.json(data[req.params.id])
});
router.delete('/:id', function (req, res, next) {
    const dataDeleted = data[req.params.id]
    data.splice(req.params.id, 1)
    res.json(dataDeleted)
});
module.exports = router;
