/**
 * Created by Pedro on 10/4/2016.
 */
angular.module('starter')

	.controller('LoginCtrl', ['AuthenticationService', '$state', '$ionicHistory', '$rootScope', function (AuthenticationService, $state, $ionicHistory, $rootScope) {
		var ctrl = this;
		ctrl.login = function () {
			AuthenticationService.login(ctrl.username, ctrl.password);
			$ionicHistory.nextViewOptions({
				disableBack: true
			});
			$state.go('patients', {}, {location: "replace", reload: true});
		}
	}])

	.controller('NewPatientCtrl', ['$state', '$rootScope', 'PatientService', function ($state, $rootScope, PatientService) {
		var ctrl = this;
		ctrl.patient = {};
		ctrl.save = function () {
			PatientService.save(ctrl.patient);
		}

		ctrl.cancel = function () {
			$state.go($rootScope.previousState.name);
		}
	}])

	.controller('CalendarCtrl', ['$state', '$rootScope', 'PatientService', 'AppointmentService', function ($state, $rootScope, PatientService, AppointmentService) {
		var ctrl = this;

		AppointmentService.getEvents().then(function (events) {
			ctrl.eventSource = events;
			$rootScope.$broadcast('eventSourceChanged', ctrl.eventSource);
			ctrl.currentDate = new Date();
		});

		$rootScope.$on('$stateChangeSuccess',
			function (event, toState, toParams, fromState, fromParams) {
				AppointmentService.getEvents().then(function (events) {
					ctrl.eventSource = events;
					$rootScope.$broadcast('eventSourceChanged', ctrl.eventSource);
					ctrl.currentDate = new Date();
				});
			})


		ctrl.changeMode = function (mode) {
			ctrl.mode = mode;
		}

		ctrl.today = function () {
			ctrl.currentDate = new Date();
		};

		ctrl.isToday = function () {
			var today = new Date(),
				currentCalendarDate = new Date(ctrl.currentDate);

			today.setHours(0, 0, 0, 0);
			currentCalendarDate.setHours(0, 0, 0, 0);
			return today.getTime() === currentCalendarDate.getTime();
		};

		ctrl.onViewTitleChanged = function (title) {
			ctrl.viewTitle = title;
		};

		ctrl.onTimeSelected = function (selectedTime, events) {
			console.log('Selected time: ' + selectedTime + ', hasEvents: ' + (events !== undefined && events.length !== 0));
			ctrl.selectedTime = selectedTime;
		};

		ctrl.onEventSelected = function (event) {
			console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
		};

		/*
		 ctrl.eventSource = [
		 {
		 title:"test",
		 startTime: new Date(Date.UTC(2016, 11, 1)),
		 endTime: new Date(Date.UTC(2016, 11, 2))
		 }
		 ]
		 */

	}])


	.controller('NewAppointmentCtrl', ['$stateParams', '$state', '$ionicHistory', '$rootScope', 'AppointmentService', function ($stateParams, $state, $ionicHistory, $rootScope, AppointmentService) {
		var ctrl = this;
		console.log($stateParams);
		ctrl.app = {
			startTime: new Date(Date.parse($stateParams.selectedTime)),
			endTime: new Date(Date.parse($stateParams.selectedTime)),
			allDay: false
		};
		ctrl.cancel = function () {
			$state.go($rootScope.previousState.name);
		}

		ctrl.save = function () {
			AppointmentService.save(ctrl.app);
			$state.transitionTo($rootScope.previousState.name, $stateParams, {
				reload: true, inherit: false, notify: true
			});
		}
	}])

	.controller('PatientsCtrl', ['$scope', 'PatientService', function ($scope, PatientService) {
		var ctrl = this;
		ctrl.sortBy = "nextAppDate";
		ctrl.reverseSort = false;

		ctrl.doRefresh = function () {
			PatientService.getPatients().then(function (patients) {
				ctrl.patients = patients;
				$scope.$broadcast('scroll.refreshComplete');
			})
		};

		ctrl.sortByField = function (field) {
			if (field === ctrl.sortBy) {
				ctrl.reverseSort = !ctrl.reverseSort;
			}
			ctrl.sortBy = field;
		}

		PatientService.getPatients().then(function (patients) {
			ctrl.patients = patients;
		})
	}]);
