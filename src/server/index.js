const makeServerRequest = require('./server-requests-handler')

var path = require('path')

const express = require('express')

const app = express()

app.use(express.static('dist'))

/* Middleware*/

bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require('cors');


app.use(cors());

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('dist/index.html'))
})


// designates what port the app will listen to for incoming requests
app.listen(process.env.PORT || 3030, function () {
    console.log('Example app listening on port 3030!')
})


app.post('/sentiment-analysis', function (req, resp) {

    const opts1 = {
        'method': 'GET',
        'hostname': req.body.url.hostname,
        'path': req.body.url.path,
        'headers': {},
        'maxRedirects': 20
    }


    const opts2 = {
        'method': 'POST',
        'hostname': 'api.meaningcloud.com',
        'path': '/sentiment-2.1',
        'headers': {},
        'maxRedirects': 20
    };


    //resp.json(JSON.stringify({model: "general_en", score_tag: "N+", agreement: "DISAGREEMENT", subjectivity: "SUBJECTIVE", agreement: "DISAGREEMENT", confidence: "60", irony: "IRONIC"}))

    makeServerRequest(req, resp, opts1, opts2)


})