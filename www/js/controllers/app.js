dashboard.controller('app', function ($rootScope, $scope, $ionicLoading, $ionicModal, $timeout, $location, $state) {
    
	$scope.newMessages = 0;
	$scope.$on('new_message', function(event) { 
		$scope.newMessages++;
	});
});
