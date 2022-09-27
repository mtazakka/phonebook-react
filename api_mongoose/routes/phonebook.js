var express = require('express');
var router = express.Router();
var models = require('../models/index');
const Phonebook = require('../models/phonebook')
const { Response } = require('../helpers/util')



/* GET contacts listing. */
router.get('/', isTokenValid, async function (req, res, next) {
    try {
        const data = await Phonebook.find({ user: req.user._id }).populate({ path: 'user', select: 'name' })
        res.json(new Response(data))
    } catch (e) {
        res.status(500).json(new Response(e, false))
    }
});

router.post('/', isTokenValid, async function (req, res, next) {
    try {
        console.log('yang login', req.user)
        const { title } = req.body
        const user = await User.findById(req.user._id)
        const phonebook = await Phonebook.create({ title, user })
        user.phonebooks.push(phonebook._id)
        await user.save()
        res.json(new Response(phonebook))
    } catch (e) {
        console.log('gagal', e)
        res.status(500).json(new Response(e, false))
    }
});

router.put('/:id', isTokenValid, async function (req, res, next) {
    try {
        const { title, complete } = req.body
        const data = await Phonebook.findByIdAndUpdate(
            req.params.id,
            {
                title,
                complete
            },
            {
                new: true
            }
        )
        res.json(new Response(data))
    } catch (e) {
        res.status(500).json(new Response(e, false))
    }
});

router.delete('/:id', isTokenValid, async function (req, res, next) {
    try {
        const data = await Phonebook.findByIdAndRemove(req.params.id)
        const user = await User.findById(data.user)

        user.phonebooks = user.phonebooks.filter(item => !item.equals(data._id))
        await user.save()
        res.json(new Response(data))
    } catch (e) {
        console.log(e)
        res.status(500).json(new Response(e, false))
    }
});

module.exports = router;
