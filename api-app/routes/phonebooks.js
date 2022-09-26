var express = require('express');
var router = express.Router();
const fs = require('fs')
var data = JSON.parse(fs.readFileSync('data.json', 'utf-8'))

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.json(data)
});

router.post('/', function (req, res, next) {
    data.push({
        id: req.body.id,
        name: req.body.name,
        phone: req.body.phone
    })
    fs.writeFileSync('data.json', JSON.stringify(data, null, 3), 'utf-8')
    res.json(data[data.length - 1])
});

router.put('/:id', function (req, res, next) {
    data[req.params.id] = {
        name: req.body.name,
        phone: req.body.phone
    }
    fs.writeFileSync('data.json', JSON.stringify(data, null, 3), 'utf-8')
    res.json(data[req.params.id])
});
router.delete('/:id', function (req, res, next) {
    data = data.filter(item => item.id != req.params.id)
    fs.writeFileSync('data.json', JSON.stringify(data, null, 3), 'utf-8')
    res.json(data)
});
module.exports = router;
