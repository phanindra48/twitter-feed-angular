var twitterFeedApp = angular.module('twitterFeedApp', []);

twitterFeedApp.controller('mainController', ['$scope', function($scope) {


    //getLocation();

}]);
twitterFeedApp.controller('feedController', ['$scope', '$http', function($scope, $http) {
    // $scope.latitude = '';
    // $scope.longitude = '';
    // var getLocation = function() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(showPosition);
    //     } else {
    //         x.innerHTML = "Geolocation is not supported by this browser.";
    //     }
    // };

    // var showPosition = function(position) {
    //     //alert('show position');
    //     $scope.latitude = position.coords.latitude;
    //     $scope.longitude = position.coords.longitude;
    //     console.log('sp latitude: ', $scope.latitude);
    //     console.log('sp longitude: ', $scope.longitude);
    // };
    // $scope.init = function() {
    //     //alert('sfsdfsdfg');
    //     getLocation();
    //     //console.log('latitude: ', $scope.latitude);
    //     //console.log('longitude: ', $scope.longitude);
    //     //$scope.getfeed();
    // };




    $scope.latitude = "0";
    $scope.longitude = "0";
    $scope.accuracy = "0";
    $scope.error = "";

    $scope.showPosition = function(position) {
        $scope.latitude = position.coords.latitude;
        $scope.longitude = position.coords.longitude;
        $scope.accuracy = position.coords.accuracy;
        $scope.$apply();
    }

    $scope.showError = function(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                $scope.error = "User denied the request for Geolocation."
                break;
            case error.POSITION_UNAVAILABLE:
                $scope.error = "Location information is unavailable."
                break;
            case error.TIMEOUT:
                $scope.error = "The request to get user location timed out."
                break;
            case error.UNKNOWN_ERROR:
                $scope.error = "An unknown error occurred."
                break;
        }
        $scope.$apply();
    }

    $scope.getLocation = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
        } else {
            $scope.error = "Geolocation is not supported by this browser.";
        }
    }

    $scope.getLocation();

    $scope.formData = {
        latitude: $scope.latitude,
        longitude: $scope.longitude
    };
    console.log($scope.formData);
    $http.post('/api/feed', $scope.formData)
        .success(function(data) {
            console.log(data);
            $scope.tweets = data.statuses;
        })
        .error(function(err) {
            console.log('Error: ' + err);
        });
    $scope.getfeed = function() {

        //console.log($scope.formData);
        $http.post('/api/feed', $scope.formData)
            .success(function(data) {
                console.log(data);
                $scope.tweets = data.statuses;
            })
            .error(function(err) {
                console.log('Error: ' + err);
            });
    };

}]);

twitterFeedApp.directive('keypress', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.keypress);
                });

                event.preventDefault();
            }
        });
    };
});

/*
// Declared route 
twitterFeedApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/drivers', {
        templateUrl: 'views/feed.html',
        controller: 'feedController'
    });
}])
*/
