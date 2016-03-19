import angular from 'angular'
import 'angular-ui-router'

angular.module('olympics',["ui.router"])
.config(($stateProvider,$urlRouterProvider)=>{
  $urlRouterProvider.otherwise('/sports')

  $stateProvider
  .state('sports', {
    url:'/sports',
    templateUrl:'sports/sports-nav.html',
    resolve:{
      sportsService: function($http){
        return $http.get('/sports');
      }
    // resolve le dice que antes de cargar la template, primero cargue la funcion en cuestion
    // se explica esto en el minuto 22 del 2do video STP MEAN
    },
    controller: function(sportsService){
        this.sports = sportsService.data;
    },
    controllerAs: 'sportsCtrl'
  })
  .state('sports.medals',{
    url:'/:sportName',
    //no es necesario decir /sports/sportsName, con el punto de sports.medals basta
    // el :sportsName va a ser ocupado en URL por el deporte en cuestion que se elija
    templateUrl:'sports/sports-medals.html',
    resolve: {
      sportService: function ($http, $stateParams){
        return $http.get(`/sports/${$stateParams.sportName}`);
        //el primer signo $ dentro del get, tiene que ver con la nueva sintaxis de ES2015
        // el segundo dolar tiene que ver con Angular, esta tomando el nombre del url.
        //Minuto 38.30 del 2do video lo explica.
        //min 37:27 2do vid hard coded vista
      }
    },
    controller:function(sportService){
      this.sport = sportService.data;
    },
    controllerAs:'sportCtrl'
  })
  .state('sports.new', {
    url:'/:sportName/medal/new',
    templateUrl:'sports/new-medal.html',
    controller: function($stateParams){
      this.sportName = $stateParams.sportName;
      //el sportName de arriba hace referencia al que se le de a traves de ui-router
    },
    controllerAs: 'newMedalCtrl'
  })
})



/*

.controller('sportsController', function($http){
  $http.get('/sports').then((response)=>{
    this.sports = response.data;
  });
})

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
