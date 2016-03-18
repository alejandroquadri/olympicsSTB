"use strict";

let express = require("express");
let app = express();

let mongoUtil = require("./mongoUtil");
//arriba se usa el punto por estar importando un modulo local, en el de express es un modulo de npm
mongoUtil.connect();

app.use(express.static (__dirname+"/../client") );
//usa esa direccion porque como va a leer desde
//clientes todos los archivos estaticos, tiene que
//volver para atras y ahi aclarar que es client.

app.get("/sports", (request, response)=>{
  let sports = mongoUtil.sports();
  sports.find().toArray((err,docs) => { //la funcion toArray convierte el resultado de la consulta en un array de objetos
    if (err){
      response.sendStatus(400);
    }
    console.log(JSON.stringify(docs));
    let sportNames = docs.map((sport)=>sport.name);
    // esta funcion de arriba es de javascript, pero la arrow acorta la sintaxis y hace que sea mas corto de escribir
    // lo que hace es agarrar para cada elemento de docs aplicarle sport.name. Con lo cual, va a traer los nombres de cada deporte.
    // el resultado de la funcion map es un array.
    // lo explica en el min 34 del 1er video
    response.json(sportNames);
  });
});

// lo siguiente seria sin usar el bendito ES2015
// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

app.get("/sports/:name", (request, response)=>{
  let sportName = request.params.name;
  //la linea de arriba lo que hace es agarrar el nombre del deporte de la url
  // eso queda especificado en el codigo request.params.name
  let sports = mongoUtil.sports();

  sports.find({name:sportName}).limit(1).next((err,doc)=>{
    if (err){
      response.sendStatus(400);
    }
    console.log("Sport name: ",doc);
    response.json(doc);
  });

})


app.listen(8181, ()=>console.log("Listening on 8181"));
/*
esta usando el js nuevo ES2015, seria lo mismo que escribir

app.listen(8181, function () {
  console.log('Listening on 8181');
});

*/
