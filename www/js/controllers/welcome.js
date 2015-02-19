dashboard.controller('welcome', function ($scope, $rootScope, $firebase, $ionicPopup, $ionicSlideBoxDelegate) {
	var ref = new Firebase("https://maxou.firebaseio.com/notifications");	
	var sync = $firebase(ref);
	sync.$push({ message: "Maxou a ouvert l'appli !", date: new Date().getTime() });
	
	$scope.showPrev = false;
	$scope.showNext = true;
	
	$scope.slidestop = function(index) {
		$ionicSlideBoxDelegate.enableSlide(false);
	}
	
	$scope.checkWise = function(test){
		if(test == 'Oui'){			
			var alertPopup = $ionicPopup.alert({
				title: 'Coquinou!',
				template: 'Voyons, ne me mens pas, je te connais petit troufion.'
			});
			alertPopup.then(function(res) {
				$scope.wiseValid = true;
			});
		}		
		else if(test == 'Non'){			
			var alertPopup = $ionicPopup.alert({
				title: 'Coquinou!',
				template: 'Ton honnêteté saura être récompensée.'
			});
			alertPopup.then(function(res) {
				console.log('Thank you for not eating my delicious ice cream cone');
			});
		}
	};
		
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