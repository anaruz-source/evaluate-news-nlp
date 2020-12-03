var https = require('follow-redirects').https

var fs = require('fs');


const dotenv = require('dotenv')

dotenv.config()

keyEndPt = {

    key: process.env.API_KEY

}


const stripHtml = require("string-strip-html"); // https://www.npmjs.com/package/string-strip-html

const formData = require('formdata-node');

function makeServerRequest ( clientReq, clientResp, opts1, opts2){
   
   
 var req = https.request(opts1, function (res) {
        var chunks = [];

    
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

     res.on("end", function (res) {
         
           compose(sendFormData, getData)(clientReq, clientResp, opts2, chunks)
     }
            
         
         );

        res.on("error", function (error) {
            clientResp.json(JSON.stringify({ error: error.message}))
        });


    });


   req.end()

}

function getData(chunks){


     var body = Buffer.concat(chunks);

    return stripHtml(body.toString(), {   // https://www.npmjs.com/package/string-strip-html to remove html tags and other unecessary tags

        stripTogetherWithTheirContents: [
            "script", // default
            "style", // default
            "xml", // default
            "pre", // <-- custom-added
            "code", // <-- custom-added
        ],
    }).result  
}
function sendFormData(clientReq, clientResp, data, opts2){ // to simulate a formData using formdata-node

      var form = new formData();
     
    // var reducedData = data.split(/\t+|\r+|\n+|\x20+/).slice(0, 300).join(' ') // used for tests only, to reduce consuming meaningcloud credits every 500 word consumes 1, 501 consumes two....

    // console.log('length', reducedData.split(/\t+|\r+|\n+|\x20+/).length)

      form.append('key', process.env.API_KEY) //append form fields
      form.append('lang', clientReq.body.lang )
      form.append('of', 'json')
      form.append('verbose', clientReq.body.isVerbose)
      form.append('txt', data)
      form.append('txtf', 'plain')
      form.append('model', clientReq.body.model)
    
      opts2.headers = form.headers

    var req = https.request(opts2, function (res) {
        var chunks = [];


        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function (res) {
            var body = Buffer.concat(chunks)
            
            clientResp.json(body.toString());

        }

        );

        res.on("error", function (error) {
            clientResp.json(JSON.stringify({error: error.message}))
        });


    });
   //https://nodejs.org/en/knowledge/advanced/streams/how-to-use-stream-pipe/
    form.stream.pipe(req, function () { req.end() }) //  the method used to take a readable stream and connect it to a writeable steam
    
    
  
      
}


function compose(func1, func2) { // compose functions, used to compose function instead of writing down all the code inside the request 
                                // first level we pass functions to compose as params
                                // second level we pass params data
                                // for 3 funcs and more we can use array.prototype.reduce method for composing
   
        return function(clientReq, clientResp, opts2, chunks){ 

           
            
        return    func1(clientReq, clientResp, func2(chunks), opts2)
        
        }
    
}

module.exports = makeServerRequest
