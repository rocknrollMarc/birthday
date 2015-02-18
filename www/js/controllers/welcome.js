dashboard.controller('welcome', function ($scope, $rootScope, $firebase, $ionicSlideBoxDelegate) {
	var ref = new Firebase("https://maxou.firebaseio.com/notifications");	
	var sync = $firebase(ref);
	sync.$push({ message: "Maxou a ouvert l'appli !", date: new Date().getTime() });
	
	$scope.showPrev = false;
	$scope.showNext = true;
		
	$scope.next = function() {
		$ionicSlideBoxDelegate.next();
    };
	
	$scope.prev = function() {
		$ionicSlideBoxDelegate.previous();
    };
	
	$scope.slideHasChanged = function(index){
		$scope.showPrev = !(index == 0);
		$scope.showNext = !(index == $ionicSlideBoxDelegate.slidesCount() - 1);
		sync.$push({ message: "Maxou est sur le slideshow " + $ionicSlideBoxDelegate.currentIndex() + " !", date: new Date().getTime() });
	}
});