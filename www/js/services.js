/**
 * Created by Pedro on 10/4/2016.
 */


angular.module('starter')

  .service('AuthenticationService', ['$q', function ($q) {
    return {
      login: function (user, password) {
        this.user = {};
        this.user.username = user;
        this.user.password = password;
        this.user.authenticated = true;
        return $q.when(this.user);
      },
      getAuthenticatedUser: function () {
        return $q.when(this.user);
      },
      logout: function () {
        delete this.user;
        return $q.when(true);
      }

    }
  }])


  .service('PatientService',['$q', function ($q) {
    var patients = [{
      name: "Pedro Fernando Marquez Soto",
      preAppDate: "3/september/2016",
      nextAppDate: "1/october/2016",
      summary: "Alcoholic",
      thumb: "img/pacients/test_01.jpg"
    },
      {
        name: "Eduardo Herrera Merino",
        preAppDate: "2/september/2016",
        nextAppDate: "2/october/2016",
        summary: "Sociopath",
        thumb: "img/pacients/test_02.jpg"
      }];
    return {
      getPatients: function () {
        return $q.when(patients);
      }
    }
  }])
