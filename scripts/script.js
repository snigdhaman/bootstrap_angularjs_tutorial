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
	$scope.message = "Yo! Yo!";
	$scope.ninjas = [
		{name: 'Ryu Hayabusa', belt: 'black', rate: 27000, available: true},
		{name: 'Naruto Uzumaki', belt: 'orange', rate: 25000, available: true},
		{name: 'Sasuke Uchiha', belt: 'blue', rate: 23000, available: false},
		{name: 'Kakashi Hatake', belt: 'green', rate: 30000, available: true},
	];
}]);

var user = [];
