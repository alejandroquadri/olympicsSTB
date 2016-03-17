'use strict';

let mongo = require('mongodb');
let client = mongo.MongoClient;
let _db; //ponele guion bajo es una convencion para decir, esta variable solo se usa en esta utilidad

module.exports = {
  /*
  en js comun seria
  connect: function() {}
  */
  connect() {
    client.connect('mongodb://localhost:27017/olympics-dev', (err,db) =>{
      if (err){
        console.log("Error conectando a Mongo - chequea si ejecutaste mongodb en terminal");
        process.exit(1); //esto es para que Node no se ejectue sin base de datos
      }
      _db = db
      console.log("Conectado a Mongo");
    });
  },
  sports(){
    return _db.collection('sports');
  }
}


/*
esto seria el ejemplo sacado de la pagina usando
JS comun

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});
*/
