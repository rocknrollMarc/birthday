dashboard.controller('messages', function ($scope, $rootScope, $firebase) {
	var ref = new Firebase("https://celina.firebaseio.com/messages").orderByChild("date").limitToLast(10);	
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
	
	
	var refNotif = new Firebase("https://celina.firebaseio.com/notifications");	
	var syncNotif = $firebase(refNotif);
	syncNotif.$push({ message: "You have arrived on your Birthday messeges page!", date: new Date().getTime() });
});