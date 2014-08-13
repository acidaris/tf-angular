angular.module("myApp", []).controller("madlibs", function ( $scope ) {

	$scope.invalidHugeNumber=false;

	$scope.startOver = function () {
		$scope.generated = false;
		$scope.clearFields();
	};


	$scope.clearFields = function () {
		$scope.femaleName = '';
		$scope.jobTitle = '';
		$scope.tediousTask = '';
		$scope.dirtyTask = '';
		$scope.celebrity = '';
		$scope.uselessSkill = '';
		$scope.obnoxiousCelebrity = '';
		$scope.hugeNumber = '';
		$scope.adjective = '';
		$scope.gender='';
	};

	$scope.clearErrors = function () {

	};

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

