dashboard.controller('home', function ($scope, $rootScope, $firebase) {
	var ref = new Firebase("https://ghiltoniel.firebaseio.com/maxou/messages").orderByChild("date").limitToLast(10);	
    var sync = $firebase(ref);
	
	ref.on("child_added", function(snap) {
	  $rootScope.$broadcast('new_message');
	});
	
	// create a synchronized array for use in our HTML code
	$scope.messages = sync.$asArray();
});