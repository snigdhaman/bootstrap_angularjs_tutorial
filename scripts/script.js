var app = angular.module ("demo", ['ngRoute', 'ngAnimate']);

var myDataRef = new Firebase('https://potf3df73i4.firebaseio-demo.com/');

app.factory('Contact', function(){
	var contactInfo = {};
 	function set(data) {
   contactInfo = data;
 }
 	function get() {
  	return contactInfo;
 }
 return {
 set: set,
 get: get
}
});

app.config (['$routeProvider', function($routeProvider){

	//$locationProvider.html5Mode(true);

	$routeProvider
		.when('/home', {
			templateUrl: 'views/intro.html',
			controller: 'NinjaController'
		})
		.when('/section1', {
			redirectTo: '/home'
		})
		.when('/section2', {
			templateUrl: 'views/ninjaList.html',
			controller: 'NinjaController'
		})
		.when('/section3', {
			templateUrl: 'views/help.html',
			controller: 'ContactController'
		})
		.when('/contact-success', {
			templateUrl: 'views/contact-success.html',
			controller: 'ContactController'
		})
		.otherwise({
			redirectTo: '/home'
		});
}]);

app.directive ('randomNinja', [function(){
	return {
		restrict: 'E',
		scope: {
			ninjas: "=",
			title: "="
		},
		templateUrl: 'views/randomNinja.html',
		controller: function($scope){
			var watcher = $scope.$watch('ninjas', function() {
    		if($scope.ninjas === undefined) return;
				$scope.random = Math.floor(Math.random() * $scope.ninjas.length);
    		watcher();
			})
		},
		transclude: true,
		replace: true
	};
}]);

app.controller ("NinjaController", ['$scope','$http', function($scope, $http){

	$scope.removeNinja = function (ninja){
		$scope.ninjas.splice($scope.ninjas.indexOf(ninja), 1);
	};

	$scope.addNewNinja = function () {
		$scope.ninjas.push({
			name: $scope.newNinja.name,
			rate: parseInt($scope.newNinja.rate),
			belt: $scope.newNinja.belt,
			available: true
		});
		$scope.newNinja = {};
	};

	$http.get('data/ninjas.json').success(function(data){
		$scope.ninjas = data;
	});

	$scope.removeAll = function () {
		$scope.ninjas = [];
	};
}]);

app.controller ('ContactController', ['$scope','$location','Contact', function($scope, $location, Contact){

	$scope.sendMessage = function (contact) {
		//myDataRef.set({name: contact.name, email: contact.email, comment: contact.message});
		Contact.set(contact);
		$location.path('contact-success');
	};
}]);

app.controller ('ContactSuccessController', ['$scope','Contact', function($scope, Contact){

	$scope.contact = Contact.get();

}]);
