angular.module("waitStaff", ['ngRoute','ngAnimate'])
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: './assets/views/home.html',
            controller: 'HomeCtrl'
        }).when('/newMeal', {
            templateUrl: './assets/views/new-meal.html',
            controller: 'newMeal'
        }).when('/myEarnings', {
            templateUrl: './assets/views/my-earnings.html',
            controller: 'myEarnings'
        }).when('/error', {
            template: '<p>Error Page Not Found</p>'
        }).otherwise({
            redirectTo: '/'
        });

    })
    .controller('HomeCtrl',function($scope){

    })
    .controller('newMeal',function($scope){

    })
    .factory('calc', function(){
        return {
            subtotal: function(mealBase, taxRate){
                return mealBase + (mealBase * taxRate / 100);
            },
            tip: function(subTotal, tipPercent)
            {
                return subTotal * tipPercent / 100;
            }
        };

    })
    .service('meals',function(){
        var meals = [];

        this.submitMeal = function(meal) {
            meals.push(meal);
        };
        this.getMeals = function(){
            return meals;
        };
        this.lastMeal = function(){
            if(meals.length > 0) {
                return meals[meals.length - 1];
            }
        };
        this.clearMeals = function()
        {
            meals.length = 0;
        };
    })
    .controller("mealDetails", function ( $scope, $rootScope, meals,calc) {

        $scope.init = function () {
            $scope.clearFields();
        };

        $scope.recordDetails = function () {
            if ($scope.details.$valid) {

                var subtotal = calc.subtotal($scope.mealBase, $scope.taxRate);

                var data = {
                    subtotal: subtotal,
                    tipPercent : $scope.tipPercent
                };
                meals.submitMeal(data);
            } else {
                console.log("invalid");
            }
        };

        $scope.clearFields = function () {
            $scope.mealBase = '';
            $scope.taxRate = 0;
            $scope.tipPercent = 0;
        };

        $scope.$on('reset', function ( event, data ) {
            $scope.clearFields();
        });

        $scope.init();

    })
    .controller("customerCharges", function ( $scope, meals, calc) {

        $scope.init = function () {
            $scope.clearFields();
        };

        $scope.clearFields = function () {
            $scope.subtotal = 0;
            $scope.tip = 0;
            $scope.total = 0;
        };

        $scope.$watchCollection(meals.getMeals, function () {

            var lastMeal = meals.lastMeal();

            if (lastMeal) {
                var subTotal = lastMeal.subtotal;
                var tip = calc.tip(subTotal,lastMeal.tipPercent);
                var total = subTotal + tip;

                $scope.subtotal = subTotal;
                $scope.tip = tip;
                $scope.total = total;
            }
        });

        $scope.$on('reset', function ( event, data ) {
            $scope.clearFields();
        });

        $scope.init();


    })
    .controller("myEarnings", function ( $scope, meals, calc) {

        $scope.init=function()
        {
            $scope.clearFields();
        };

        $scope.clearFields=function()
        {
            $scope.tipTotal = 0;
            $scope.mealCount = 0;
            $scope.averageTip = 0;
        };

        $scope.$watchCollection(meals.getMeals, function (meals) {

            var tipTotal = 0;

            angular.forEach(meals, function(meal){
                tipTotal += calc.tip(meal.subtotal, meal.tipPercent);
            });
            $scope.tipTotal = tipTotal;
            $scope.mealCount = meals.length;

        });

        $scope.$on('reset', function ( event, data ) {
            $scope.clearFields();
        });

        $scope.reset = function () {
            meals.clearMeals();
        };

        $scope.init();
    });


