var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const path = require('path')

mongoose.connect('mongodb://localhost/exam');
var PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        minlength: [3, 'name must be at least 3 characters']
    },
    type: {
        type: String,
        required: [true, 'type is required'],
        minlength: [3, 'type must be at least 3 characters']
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        minlength: [3, 'description must be at least 3 characters']
    },
    skill1: { type: String },
    skill2: { type: String },
    skill3: { type: String },
}, { timestamp: true });

mongoose.model('Pet', PetSchema);
var Pet = mongoose.model('Pet')
app.use(express.static(__dirname + '/public/dist/public'));

app.get('/', function (req, res) {
    Pet.find({}, function (err, pets) {
        if (err) {
            res.json({ message: "error", error: err })
        }
        else {
            res.json({ message: 'Success!', data: pets })
        }
    })
})

// GET: Retrieve all Pet
app.get('/pets', function (req, res) {
    Pet.find({}, function (err, pets) {
        if (err) {
            res.json({ message: "error", error: err })
        }
        else {
            res.json({ message: 'Success! All pets!', data: pets })
        }
    })
})

// GET: Retrieve a Pet by ID
app.get('/pet/:id', function (req, res) {
    Pet.findOne({ _id: req.params.id }, function (err, pet) {
        if (err) {
            res.json({ message: 'error', error: err })
        } else {
            console.log("nodemon pettt", pet)
            res.json({ message: 'Success! Pet by ID!', data: pet })
        }
    })
})

// POST: Create a Pet
app.post('/pets/new', function (req, res) {
    console.log('Harden');
    var pet = new Pet({
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        skill1: req.body.skill1,
        skill2: req.body.skill2,
        skill3: req.body.skill3
    })
    pet.save(function (err, pets) {
        if (err) {
            res.json({ message: 'error', error: err })
        } else {
            res.json({ message: 'Success! Created a Pet!', data: pets })
        }
    })
})

// PUT: Update a Pet by ID
app.put('/pets/:id/edit', function (req, res) {
    Pet.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            name: req.body.name,
            type: req.body.type,
            description: req.body.description,
            skill1: req.body.skill1,
            skill2: req.body.skill2,
            skill3: req.body.skill3,
        },
    }, { runValidators: true },
        function (err, pets) {
            if (err) {
                res.json({ message: 'error', error: err })
            } else {
                res.json({ message: 'Success! Update a Pet by ID', data: pets })
            }
        })
})

// DELETE: Delete a Pet by ID
app.delete('/pets/:id', function (req, res) {
    Pet.remove({ _id: req.params.id }, function (err) {
        if (err) {
            console.log('Returned Error:', err);
            res.json({ message: 'error' })
        }
        else {
            res.json({ message: "Success" })
        }
    })
})

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});

const server = app.listen(8000);