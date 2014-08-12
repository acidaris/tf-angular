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
	};

	$scope.clearErrors = function () {

	};

	$scope.generateMadLib = function ( form ) {

		$scope.invalidHugeNumber = false;

		$scope.madlibFields = form;

		if (form.$valid) {
			$scope.copyFromForm(form);
			$scope.generated = true;
		} else {

			console.log("invalid, throw errors");
			$scope.setPatternErrors(form.$error);
		}
	};

	$scope.setPatternErrors = function ( errors ) {
		var patternErrors = errors.pattern;

		if (patternErrors) {
			$scope.invalidHugeNumber=true;
		}
	};


	$scope.copyFromForm = function ( form ) {
		$scope.femaleName = form.femaleName.$viewValue;
		$scope.jobTitle = form.jobTitle.$viewValue;
		$scope.tediousTask = form.tediousTask.$viewValue;
		$scope.dirtyTask = form.dirtyTask.$viewValue;
		$scope.celebrity = form.celebrity.$viewValue;
		$scope.uselessSkill = form.uselessSkill.$viewValue;
		$scope.obnoxiousCelebrity = form.obnoxiousCelebrity.$viewValue;
		$scope.hugeNumber = form.hugeNumber.$viewValue;
		$scope.adjective = form.adjective.$viewValue;
	};


	$scope.generated = false;
});

