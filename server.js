const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const Datastore = require('nedb');
const database = new Datastore({ filename: 'testimonials', autoload: true });
const rateLimit = require("express-rate-limit");
require('dotenv').config();
const port = process.env.PORT;

database.loadDatabase();
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(port || 3000, () => console.log('Running on 3000'));

const postLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 1,
    message:
        "bruh"
});

app.post('/postTestimonial', postLimiter, (req, res) => {
    const name = req.body.name,
        country = req.body.country,
        testimonial = req.body.testimonial;
    if (testimonial.length <= 91) {
        try {
            var entry = {
                name: name,
                country: country,
                testimonial: testimonial,
                postedAt: new Date()
            }
            database.insert(entry, (err, doc) => {
                res.json({
                    status: 'success',
                    id: doc._id
                })
                if (err) {
                    res.json({ status: 'failed', message: 'An internal error has occured, please contact us ASAP!' })
                }
            });
        } catch {
            res.json({ status: 'failed', message: 'Failed to post to server.' })
        }
    } else {
        res.json({
            status: 'failed!',
            message: 'The length of your testimonial is too long!'
        })
    }
})

app.post('/checkID', (req, res) => {
    const id = req.body.id;
    database.find({ _id: id }, (err, data) => {
        if (data) {
            res.json({ status: 'success', data: data });
        } else {
            res.json({ status: 'error', message: 'We couldn\'t find that ID!' })
        }
    })
})
// Also works
app.get('/getTestimonial', (req, res) => {
    database.find({}).sort({ postedAt: -1 }).limit(5).exec((err, data) => {
        for (var i = 0, len = data.length; i < len; i++)
            delete data[i]._id;
        res.json(data.slice(Math.max(data.length - 5, 0)))
    })
})

app.post('/changeTestimonial', (req, res) => {
    const name = req.body.nameVal,
        country = req.body.countryVal,
        testimonial = req.body.testimonialVal,
        _id = req.body.id;
    database.find({ _id: _id }, err => {
        database.update({ _id: _id }, { $set: { 'name': name, 'country': country, 'testimonial': testimonial } }, (err, data) => {
            res.json({ status: 'success' })
            if (err) console.log(err);
        })
        if (err) { res.json({ status: 'Incorrect ID! Please set the correct one!' }) }
    })
})

app.post('/deleteTestimonial', (req, res) => {
    const _id = req.body.id;
    database.find({ _id: _id }, err => {
        database.remove({ _id: _id }, err => {
            res.json({ status: 'success' })
            if (err) console.log(err);
        })
    })
})