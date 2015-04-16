dashboard.controller('carte', function ($scope, $rootScope, $firebase, $ionicModal) {
	var ref = new Firebase("https://maxou.firebaseio.com/cartes");	
    var sync = $firebase(ref);
	
	$scope.loading = true;
		
	ref.on("child_added", function(snap) {
	  $rootScope.$broadcast('new_carte');
	});
	
	// create a synchronized array for use in our HTML code
	$scope.messages = sync.$asArray();
	
	$scope.messages.$loaded()
	.then(function(data) {
		$scope.loading = false;
	})
	.catch(function(error) {
		$scope.loading = false;
	});

	$ionicModal.fromTemplateUrl('carte-modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});
	
	$scope.open = function(message){
		$scope.message = message;
		$scope.modal.show();
	};
	
	$scope.close = function() {
		$scope.modal.hide();
	};	
	
	var refNotif = new Firebase("https://maxou.firebaseio.com/notifications");	
	var syncNotif = $firebase(refNotif);
	syncNotif.$push({ message: "Maxou est arrivé sur la page des cartes !", date: new Date().getTime() });
});