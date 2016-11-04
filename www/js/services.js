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


	.service('AppointmentService', ['$q', function ($q) {
		var appointments = [];

		function createRandomEvents() {
			var events = [];
			for (var i = 0; i < 50; i += 1) {
				var date = new Date();
				var eventType = Math.floor(Math.random() * 2);
				var startDay = Math.floor(Math.random() * 90) - 45;
				var endDay = Math.floor(Math.random() * 2) + startDay;
				var startTime;
				var endTime;
				if (eventType === 0) {
					startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
					if (endDay === startDay) {
						endDay += 1;
					}
					endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
					events.push({
						title: 'All Day - ' + i,
						startTime: startTime,
						endTime: endTime,
						allDay: true
					});
				} else {
					var startMinute = Math.floor(Math.random() * 24 * 60);
					var endMinute = Math.floor(Math.random() * 180) + startMinute;
					startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
					endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
					events.push({
						title: 'Event - ' + i,
						startTime: startTime,
						endTime: endTime,
						allDay: false
					});
				}
			}
			return events;
		}

		//appointments = createRandomEvents();

		return {
			getEvents: function () {
				return $q.when(appointments);
			},
			save: function (event) {
				appointments.push(event);
			}
		}
	}])


	.service('PatientService', ['$q', function ($q) {
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
			},
			save: function (patient) {
				patient.id = parseInt(new Date());
				console.log(patient)
				return $q.when(patient);
			}
		}
	}])
