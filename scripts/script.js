var app = angular.module ("demo", ['ngRoute', 'ngAnimate']);

app.config (['$routeProvider', function($routeProvider){
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
