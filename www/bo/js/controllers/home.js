dashboard.controller('home', function ($scope, $firebase) {

	var fileInput = document.getElementById('picture');
	var imageB64;
	$scope.valid = false;

    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
		var imageType = /image.*/;

		if (file.type.match(imageType)) {
		  var reader = new FileReader();

		  reader.onload = function(e) {
			imageB64 = reader.result;
		  }

		  reader.readAsDataURL(file); 
		} else {
		  fileDisplayArea.innerHTML = "File not supported!";
		}
    });

	var ref = new Firebase("https://ghiltoniel.firebaseio.com/maxou/messages");
	ref = ref.orderByChild("date").limitToLast(10);
	
    var sync = $firebase(ref);
	// create a synchronized array for use in our HTML code
	$scope.messages = sync.$asArray();
	
	$scope.user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {};	
	if(localStorage.getItem("user")){
		$scope.valid = true;
	}
	
	$scope.save = function(){
		if(!$scope.user.name){
			$scope.error = "Name required !";
			return;
		}
		if(!imageB64){
			$scope.error = "Image required !";
			return;
		}
		
		$scope.user.image = imageB64;
		localStorage.setItem("user", JSON.stringify($scope.user));
		$scope.valid = true;
	}
	
	$scope.send = function(){			
		$scope.messages.$add({
			from: $scope.user.name,
			text: $scope.text,
			date: new Date().getTime(),
			avatar: $scope.user.image
		});
		$scope.text = '';
	}
});