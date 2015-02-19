dashboard.controller('welcome', function ($scope, $rootScope, $location, $firebase, $ionicPopup, $ionicSlideBoxDelegate) {
	var ref = new Firebase("https://maxou.firebaseio.com/notifications");	
	var sync = $firebase(ref);
	sync.$push({ message: "Maxou a ouvert l'appli !", date: new Date().getTime() });
	
	$scope.showPrev = false;
	$scope.showNext = true;
	
	$scope.slidestop = function(index) {
		$ionicSlideBoxDelegate.enableSlide(false);
	}
	
	$scope.checkWise = function(test){
		$scope.wiseImgShow = true;
		if(test == 'Oui'){	
			$scope.wiseImg = 'img/coquinou.jpg';
			var alertPopup = $ionicPopup.alert({
				title: 'Coquinou!',
				template: 'Voyons, ne me mens pas, je te connais petit troufion.'
			});
			alertPopup.then(function(res) {
			});
		}		
		else if(test == 'Non'){			
			$scope.wiseImg = 'img/fesses.jpg';
			var alertPopup = $ionicPopup.alert({
				title: 'Coquinou!',
				template: 'Ton honnêteté saura être récompensée.'
			});
			alertPopup.then(function(res) {
				$scope.wiseValid = true;
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
	
	var ref = new Firebase("https://maxou.firebaseio.com");
	
	$scope.login = function(){
		
		var test = ref.getAuth();
		if(test && test.facebook.email == 'guillaume.jacquart@live.fr'){
			$location.path('app/home');
			return;
		}
		
		ref.authWithOAuthPopup("facebook", function(error, authData) {
		  if (error) {
			console.log("Login Failed!", error);
		  } else {
			$location.path('app/home');
			return;
		  }
		}, {
		  scope: "email"
		});
	};
});