/**
 * Created by Pedro on 10/4/2016.
 */
angular.module('starter')

.controller('LoginCtrl',['AuthenticationService','$state','$ionicHistory','$rootScope',function(AuthenticationService, $state, $ionicHistory, $rootScope){
    var ctrl = this;
  ctrl.login = function(){
    AuthenticationService.login(ctrl.username,ctrl.password);
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $state.go('patients', {}, {location: "replace", reload: true});
  }
}])

.controller('NewUserCtrl',['$state','$rootScope',function($state, $rootScope){
  var ctrl = this;



  ctrl.cancel = function(){
    $state.go($rootScope.previousState.name);
  }
}])


.controller('PatientsCtrl',['$scope','PatientService',function($scope,PatientService){
  var ctrl = this;
  ctrl.sortBy = "nextAppDate";
  ctrl.reverseSort = false;

  ctrl.doRefresh = function() {
    PatientService.getPatients().then(function(patients){
      ctrl.patients = patients;
      $scope.$broadcast('scroll.refreshComplete');
    })
  };

  ctrl.sortByField = function(field){
    if(field === ctrl.sortBy){
      ctrl.reverseSort = !ctrl.reverseSort;
    }
    ctrl.sortBy = field;
  }

  PatientService.getPatients().then(function(patients){
    ctrl.patients = patients;
  })
}]);
