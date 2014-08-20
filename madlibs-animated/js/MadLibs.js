angular.module("myApp", ['ngAnimate']).controller("madlibs", function ( $scope ) {

	$scope.invalidHugeNumber=false;

	$scope.startOver = function () {
		$scope.generated = false;
//		$scope.clearFields();
	};


	$scope.clearFields = function () {
		$scope.femaleName = 'a';
		$scope.jobTitle = 'b';
		$scope.tediousTask = 'c';
		$scope.dirtyTask = 'd';
		$scope.celebrity = 'e';
		$scope.uselessSkill = 'f';
		$scope.obnoxiousCelebrity = 'g';
		$scope.hugeNumber = '2';
		$scope.adjective = 'e';
		$scope.gender='male';
	};

	$scope.clearFields();


	$scope.generateMadLib = function () {

		$scope.invalidHugeNumber = false;

		if ($scope.madlibFields.$valid) {
			$scope.generated = true;
		} else {
			$scope.setPatternErrors($scope.madlibFields.hugeNumber.$error);
		}
	};

	$scope.setPatternErrors = function ( errors ) {
		var patternErrors = errors.pattern;
		if (patternErrors) {
			$scope.invalidHugeNumber=true;
		}
	};

	$scope.generated = false;
});

