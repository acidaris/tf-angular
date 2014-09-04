angular.module("myApp", ['ngAnimate']).controller("instagram", function ($scope, $http,$timeout) {

    $scope.init = function () {
        $scope.results = {};
    };

    $scope.clear = function()
    {
        $scope.results.length=0;
        $scope.imageSelected = -1;
        $scope.showPreview = false;
        $scope.searchedFor = "";
        $scope.searchFinished = false;
    };

    $scope.init();

    $scope.search = function () {

        $scope.invalidTag = false;

        if ($scope.searchForm.$valid) {
            $scope.clear();

            $scope.searchedFor = $scope.tag;
            $scope.tag = "";

            $scope.getByTag($scope.searchedFor).success(function (response) {
                $timeout(function () {
                    $scope.results = response.data;
                    $scope.searchFinished = true;
                }, 200);
            });
        }
        else {
            $scope.invalidTag = true;
        }
    };

    $scope.getByTag = function (tag) {
        var data = {params: {client_id: 'db7c48f92828445aa085817f2a961ebe', callback: 'JSON_CALLBACK'}};

        return $http.jsonp("https://api.instagram.com/v1/tags/" + tag + "/media/recent", data);
    };

    $scope.selectImage = function (index) {
        $scope.showPreview = true;
        $scope.imageSelected = index;
    };

    $scope.getThumbnailStyle = function (index) {
        var style = {};

        if ($scope.showPreview) {
            style = {top: index * 150 + 'px', left: 0};
        }
        else {
            style = {top: Math.floor(index / 3) * 150 + 'px', left: index % 3 * 150};
        }

        return style;
    };
    $scope.thumbnailColumnClass = function (index)
    {
        if (!$scope.showPreview) {
            switch (index % 3) {
                case 0:
                    return 'col1';
                case 1:
                    return 'col2';
                case 2:
                    return 'col3';
            }
        }
        return '';
    };

})
    .directive('imageonload', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('load', function () {
                    element.addClass('loaded');
                });
                attrs.$observe('ngSrc', function (value) {
                    element.removeClass('loaded');
                });
            }
        };
    });
;

