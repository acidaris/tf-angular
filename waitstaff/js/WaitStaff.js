angular.module("waitStaff", [])
		.controller("mealDetails", function ( $scope, $rootScope ) {

			$scope.init = function () {
				$scope.clearFields();
			};

			$scope.recordDetails = function () {
				if ($scope.details.$valid) {

					var subtotal = $scope.mealBase + ($scope.mealBase * $scope.taxRate / 100);

					var data = {
						subtotal: subtotal,
						tipPercent : $scope.tipPercent
					};
					$rootScope.$broadcast('mealSubmitted', data);
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

		}).controller("customerCharges", function ( $scope ) {

			$scope.init = function () {
				$scope.clearFields();
			};

			$scope.clearFields = function () {
				$scope.subtotal = 0;
				$scope.tip = 0;
				$scope.total = 0;
			};


			$scope.$on('mealSubmitted', function ( event, data ) {

				var subTotal = data.subtotal;
				var tip = subTotal * data.tipPercent / 100;
				var total = subTotal + tip;

				$scope.subtotal += subTotal;
				$scope.tip += tip;
				$scope.total += total;
			});

			$scope.$on('reset', function ( event, data ) {
				$scope.clearFields();
			});

			$scope.init();


		}).controller("myEarningInfo", function ( $scope ) {

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

			$scope.$on('mealSubmitted', function ( event, data ) {


				$scope.tipTotal += data.subtotal * data.tipPercent / 100;
				$scope.mealCount++;

			});

			$scope.$on('reset', function ( event, data ) {
				$scope.clearFields();
			});

			$scope.init();
		}).controller("resetCtrl", function ( $scope, $rootScope ) {
			$scope.reset = function () {
				$rootScope.$broadcast('reset', {});
			};

		})
;

