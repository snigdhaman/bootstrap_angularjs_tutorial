var app = angular.module ("demo", []);

app.controller ("inputCtrl", function($scope){
	$scope.submitClick = function (object) {
		$scope.user.push(object);
		object = {};
	};
});

app.controller ("scrollCtrl", function($location, $anchorScroll){
	this.scrollTo = function (scrollElement) {
		$location.hash(scrollElement);
		$anchorScroll();
	}
});

app.controller ("NinjaController", ['$scope', function($scope){

	$scope.removeNinja = function (ninja){
		$scope.ninjas.splice($scope.ninjas.indexOf(ninja),1);
	};

	$scope.ninjas = [
		{name: 'Ryu Hayabusa', belt: 'Black', rate: 27000, available: true},
		{name: 'Naruto Uzumaki', belt: 'Orange', rate: 25000, available: true},
		{name: 'Sasuke Uchiha', belt: 'Blue', rate: 23000, available: true},
		{name: 'Kakashi Hatake', belt: 'Green', rate: 30000, available: true},
	];
}]);

var user = [];
