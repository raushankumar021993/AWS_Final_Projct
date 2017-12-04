var Product = require('../model/products')
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/shopping1');

var products = [new Product({
    _id: '1',
    imgPath : 'http://www.gaadicdn.com/usedcar_image/original/usedcar_20171020_171030_1383575_1509093858.jpg',
    model :'Volkswagen Vento2010-2013PetrolTrendline',
    kms:'75,070',
    price:'$6000'
}),
    new Product({
        _id: '1',
        imgPath : 'http://www.gaadicdn.com/usedcar_image/original/usedcar_20171020_171030_1383575_1509093858.jpg',
        model :'Volkswagen Vento2010-2013PetrolTrendline',
        kms:'75,070',
        price:'$6000'
    }),
    new Product({
        _id: '2',
        imgPath : 'http://www.gaadicdn.com/usedcar_image/original/usedcar_20171020_171030_1383575_1509093858.jpg',
        model :'Volkswagen Vento2010-2013PetrolTrendline',
        kms:'75,070',
        price:'$6000'
    }),
    new Product({
        _id: '1',
        imgPath : 'http://www.gaadicdn.com/usedcar_image/original/usedcar_20171020_171030_1383575_1509093858.jpg',
        model :'Volkswagen Vento2010-2013PetrolTrendline',
        kms:'75,070',
        price:'$6000'
    }),
    new Product({
        _id: '1',
        imgPath : 'http://www.gaadicdn.com/usedcar_image/original/usedcar_20171020_171030_1383575_1509093858.jpg',
        model :'Volkswagen Vento2010-2013PetrolTrendline',
        kms:'75,070',
        price:'$6000'
    }),
    new Product({
        _id: '1',
        imgPath : 'http://www.gaadicdn.com/usedcar_image/original/usedcar_20171020_171030_1383575_1509093858.jpg',
        model :'Volkswagen Vento2010-2013PetrolTrendline',
        kms:'75,070',
        price:'$6000'
    }),
    new Product({
        _id: '1',
        imgPath : 'http://www.gaadicdn.com/usedcar_image/original/usedcar_20171020_171030_1383575_1509093858.jpg',
        model :'Volkswagen Vento2010-2013PetrolTrendline',
        kms:'75,070',
        price:'$6000'
    })];

var done = 0;
for(var i = 0; i<products.length;i++){
    products[i].save(function(err,result){
        done++;
        if(done==products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}