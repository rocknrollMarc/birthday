dashboard.controller('cadeau', function ($scope, $rootScope, $firebase) {
	var ref = new Firebase("https://maxou.firebaseio.com/notifications");	
	var sync = $firebase(ref);
	sync.$push({ message: "You have arrived on your present page!", date: new Date().getTime() });
});