var twitterFeedApp = angular.module('twitterFeedApp', []);

twitterFeedApp.controller('mainController', ['$scope', function($scope) {


    //getLocation();

}]);
twitterFeedApp.controller('feedController', ['$scope', '$http', function($scope, $http) {
    $scope.latitude = '0';
    $scope.longitude = '0';
    $scope.accuracy = "0";
    $scope.formData = {};
    $scope.error = "";
    var getLocation = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    };
    var showResult = function() {
        return $scope.error == "";
    };
    var showError = function(error) {
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
    };
    var showPosition = function(position) {
        //alert('show position');
        $scope.latitude = position.coords.latitude;
        $scope.longitude = position.coords.longitude;
        $scope.accuracy = position.coords.accuracy;
        //console.log('sp latitude: ', $scope.latitude);
        //console.log('sp longitude: ', $scope.longitude);
        $scope.$apply();
        $scope.formData = {
            latitude: $scope.latitude,
            longitude: $scope.longitude
        };
        $scope.getfeed();
    };
    $scope.init = function() {
        getLocation();
    };

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

    $scope.search = function(query){
        var params = {
            q : query
        }
        $http.get('/api/feed/' + query)
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
