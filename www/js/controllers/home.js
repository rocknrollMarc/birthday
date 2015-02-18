dashboard.controller('home', function ($scope, $rootScope, $firebase) {
	var ref = new Firebase("https://maxou.firebaseio.com/notifications");	
	var sync = $firebase(ref);
	sync.$push({ message: "Maxou est arrivé sur la home !", date: new Date().getTime() });
});