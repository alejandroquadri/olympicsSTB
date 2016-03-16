"use strict";

let express = require("express");
let app = express();

app.use(express.static (__dirname+"/../client") );
//usa esa direccion porque como va a leer desde
//clientes todos los archivos estaticos, tiene que
//volver para atras y ahi aclarar que es client.

app.get("/sports", (request, response)=>{
  response.json(["Cycling","Wheightlifting"])
});

// lo siguiente seria sin usar el bendito ES2015
// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });


app.listen(8181, ()=>console.log("Listening on 8181"));
/*
esta usando el js nuevo ES2015, seria lo mismo que escribir

app.listen(8181, function () {
  console.log('Listening on 8181');
});

*/
