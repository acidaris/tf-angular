angular.module("myApp", ['ngAnimate']).controller("instagram", function ($scope, $http) {

    $scope.init = function () {
        $scope.results = {};
        $scope.imageSelected = -1;
        $scope.showPreview = false;
        $scope.searchedFor="";
        $scope.searchFinished=false;
    };

    $scope.init();


    $scope.search = function () {

        $scope.invalidTag = false;

        if ($scope.searchForm.$valid) {
            $scope.init();

            $scope.searchedFor=$scope.tag;
            $scope.tag="";

            $scope.getByTag($scope.searchedFor).success(function (response) {
                $scope.results = response.data;
                $scope.searchFinished=true;
            });
        }
        else {
            $scope.invalidTag=true;
        }
    };

    $scope.getByTag = function (tag) {
        //TODO: replace static search
        var data = {params: {client_id: 'db7c48f92828445aa085817f2a961ebe', callback: 'JSON_CALLBACK'}};


        return $http.jsonp("https://api.instagram.com/v1/tags/" + tag + "/media/recent", data);
    };

    $scope.selectImage = function (index) {
        $scope.showPreview = true;
        $scope.imageSelected = index;
    };

    //TODO: validation
    //TODO: get images
    //TODO: Clear results and perform a new search


    //TODO: clear search field after request is made
    //TODO: valid submit, display search criteria

    //TODO: valid response, number of images found

});

