var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({

    _id: {type : String,required:true},
    imgPath : {type : String,required:true},
    model:{type : String,required:true},
    kms : {type : String,required:true},
    price :{type : String,required:true}
});

module.exports = mongoose.model("Product",schema);