angular.module("myApp", ['ngAnimate']).controller("madlibs", function ($scope) {

    $scope.invalidHugeNumber = false;

    $scope.startOver = function () {
        $scope.clearFields();
    };

    $scope.loadFields = function () {
        $scope.name = 'Adam';
        $scope.jobTitle = 'lifeguard';
        $scope.tediousTask = 'teaching swim lessons';
        $scope.dirtyTask = 'cleaning gutters';
        $scope.celebrity = 'Michael Phelps';
        $scope.uselessSkill = 'wiggle his ears';
        $scope.obnoxiousCelebrity = 'Justin Beiber';
        $scope.hugeNumber = '15000';
        $scope.adjective = 'crusty';
        $scope.gender = 'male';
    };

    $scope.clearFields = function () {
        $scope.name = '';
        $scope.jobTitle = '';
        $scope.tediousTask = '';
        $scope.dirtyTask = '';
        $scope.celebrity = '';
        $scope.uselessSkill = '';
        $scope.obnoxiousCelebrity = '';
        $scope.hugeNumber = '';
        $scope.adjective = '';
        $scope.gender = '';

        $scope.generated = false;
        $scope.submitted = false;
    };

    $scope.clearFields();


    $scope.generateMadLib = function () {

        $scope.submitted = true;
        $scope.invalidHugeNumber = false;

        if ($scope.madlibFields.$valid) {
            $scope.generated = true;
        } else {
            $scope.setPatternErrors($scope.madlibFields.hugeNumber.$error);
        }
    };

    $scope.setPatternErrors = function (errors) {
        var patternErrors = errors.pattern;
        if (patternErrors) {
            $scope.invalidHugeNumber = true;
        }
    };

    $scope.clearFields();

});

