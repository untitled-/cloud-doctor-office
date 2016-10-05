// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform, $rootScope, $location, $state, AuthenticationService) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on( '$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {

    if(toState.name === "login"){
      return; // no need to redirect
    }
    // now, redirect only not authenticated

    AuthenticationService.getAuthenticatedUser().then(function(data){
      userInfo = data;
      if(!userInfo) {
        e.preventDefault(); // stop current execution
        $state.go('login'); // go to login
      }
    });


  });

  $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
    //save the previous state in a rootScope variable so that it's accessible from everywhere
    $rootScope.previousState = from;
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('patients', {
      url: "/patients",
      controller: "PatientsCtrl",
      controllerAs: "ctrl",
      templateUrl: "templates/patients.html"
    })
    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: "LoginCtrl",
      controllerAs: "ctrl"
    })
    .state('new', {
      url: "/new",
      templateUrl: "templates/new_patient.html",
      controller: "NewUserCtrl",
      controllerAs: "ctrl"
    })
  $urlRouterProvider.otherwise('/patients');
})
