import angular from 'angular'
import 'angular-ui-router'

angular.module('olympics',["ui.router"])
.config(($stateProvider,$urlRouterProvider)=>{
  $urlRouterProvider.otherwise('/sports')

  $stateProvider
  .state('sports', {
    url:'/sports',
    templateUrl:'sports/sports-nav.html'
  })
})

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

seria asi:
.controller('sportsController', function($http){
  var that = this
  $http.get('/sports').then(function(response){
    that.sports = response.data;
  })
})
*/
