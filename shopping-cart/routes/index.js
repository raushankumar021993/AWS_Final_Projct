/*Ceated by Raushan : 11/29/2017 */


var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
router.use(csrfProtection);
var elasticsearch = require('elasticsearch');
var Product = require('../models/product');
var redis = require('redis');
var redisclient = redis.createClient(6379, "redis.1jsaeo.0001.use1.cache.amazonaws.com");
redisclient.auth('password', function (err) {
    if (err) throw err;
});

redisclient.on('connect', function() {
    console.log('Connected to Redis');
});

/* For Redis : Start*/
var mongooseRedisCache = require("mongoose-redis-cache");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var redisSchema = new Schema({

    _id: {type : String,required:true},
    imgPath : {type : String,required:true},
    model:{type : String,required:true},
    kms : {type : String,required:true},
    price :{type : String,required:true}
});
module.exports = mongoose.model("RadisProduct",redisSchema);

   var client = new elasticsearch.Client({
        accessKeyId: 'AKIAJW3PGOZPG4F5HYSA',
        secretAccessKey: '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',
        service: 'es',
        region: 'US East (N. Virginia)',
        host: 'search-bigdata-hcq6bnbgrsciuk2ea5tp2akrla.us-east-1.es.amazonaws.com'
    });
client.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: 100000
}, function (error) {
    if (error) {
        console.trace('elasticsearch cluster is down!');
    } else {
        console.log('All is well');
    }
});

router.get('/user/signup',function(req,res,next){
    res.render('user/signup',{csrfToken:req.csrfToken()})
});

router.post('/user/signup', function(req, res, next) {
 res.redirect('/');
});



router.get('/', function(req, res, next) {
    console.log("1");
    redisclient.get("Cars",function(err,result){
        var c1 = [];
        var c2 = [];
        var chunkSize =3;
        console.log("result :"+result);
        var obj1 = JSON.parse(result.replace("null", '"'));

        for(var i=0;i<obj1.length;i+=chunkSize){
            if(i==0)
                c1.push(obj1.slice(i,i+chunkSize));
            else
                c2.push(obj1.slice(i,i+chunkSize));
            //console.log(productChunks);
        }
        res.render('shop/index', { title: 'CarDekho',products:c1,products:c2});
    });
});

/* ES Changes */
//^search?q=:query
router.get('/search',function(req,response,next){
    var pageNum = 1;
    var perPage = 6;
    console.log("Hello there");
    var userQuery = req.query['query'];
    console.log(userQuery);
    var searchParams = {
        index: 'bigdatacars',
        from: (pageNum - 1) * perPage,
        size: perPage,
        type: 'cars',
        body: {
            query: {
                multi_match: {
               //match: { "model": userQuery }
                    fields:  ["model"],
                    query:     userQuery,

                }
            }
        }
};


    client.search(searchParams, function (err, res) {
        if (err) {
            // handle error
            throw err;
        }
        //console.log(res);
       var results = res.hits.hits.map(function(i){
            return i['_source'];
        });
      //  console.log("****" +results);
        var productChunks = [];
        var chunkSize = 3;
        for(var i = 0;i<results.length;i+=chunkSize){
            productChunks.push(results.slice(i,i+chunkSize));
            //console.log(productChunks);
            //console.log("reached productchunks")
        }

        response.render('shop/index', {title: 'CarDekho',
            products: productChunks
        });
    });
});

router.get('/loadProduct', function (req, res) {
    console.log("Calling MongoDB to load product Details!");
    var productId = req.query._id;
    console.log(productId)
    Product.find({_id: productId}, function(err, product) {
        console.log("Connect to MongoDB");
        console.log("productName from MongoDb"+product);
        res.render('shop/product', {title: 'Shopping Cart', products: product});
    });
});


module.exports = router;
