import angular from 'angular'

angular.module('olympics',[])
.controller('sportsController', function($http){
  $http.get('/sports').then((response)=>{
    this.sports = response.data;
  });
})

/*
antes habia que declarar una variable afuera
del http, para poder acceder a ella despues
con el ES2015, usando la arrow function esto
ya no es necesario. Tengo que estudiar mejor eso

seria asi
var that = this
$http.get('/sports').then((response)=>{
  that.sports = response.data;
})
*/
