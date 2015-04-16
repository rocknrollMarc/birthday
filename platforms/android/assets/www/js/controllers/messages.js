dashboard.controller('messages', function ($scope, $rootScope, $firebase) {
	var ref = new Firebase("https://maxou.firebaseio.com/messages").orderByChild("date").limitToLast(10);	
    var sync = $firebase(ref);
	
	$scope.loading = true;
		
	ref.on("child_added", function(snap) {
	  $rootScope.$broadcast('new_message');
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
	
	
	var refNotif = new Firebase("https://maxou.firebaseio.com/notifications");	
	var syncNotif = $firebase(refNotif);
	syncNotif.$push({ message: "Maxou est arrivé sur la page des messages !", date: new Date().getTime() });
});